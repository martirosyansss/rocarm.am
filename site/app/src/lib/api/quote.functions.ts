import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

import { bindings } from "../bindings.server";
import { sendQuoteNotification } from "../quote-notify.server";

const MAX_PER_IP_PER_HOUR = 5;

const quoteSchema = z.object({
  company: z.string().min(1).max(200),
  contactName: z.string().min(1).max(200),
  country: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().max(4000).optional().default(""),
  privateLabel: z.string().max(20).optional().default(""),
  product: z.string().max(120).optional().default(""),
  role: z.string().max(120).optional().default(""),
  volume: z.string().max(120).optional().default(""),
  website: z.string().max(300).optional().default(""),
  // Honeypot: hidden from people, filled in by naive bots.
  trap: z.string().max(200).optional().default(""),
});

/** Store an export enquiry and email the export desk. Validated server side; D1 is the source of truth. */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator(quoteSchema)
  .handler(async ({ data }) => {
    // Pretend success so a bot gets no signal that it was caught.
    if (data.trap) return { ok: true as const };

    const env = bindings();
    const { DB } = env;
    if (!DB) {
      return { ok: false as const, reason: "storage-unavailable" as const };
    }

    const ip = getRequestHeader("cf-connecting-ip") ?? null;
    if (ip) {
      const recent = await DB.prepare(
        `SELECT COUNT(*) AS n FROM quote_requests
          WHERE ip = ? AND created_at > datetime('now', '-1 hour')`
      )
        .bind(ip)
        .first<{ n: number }>();
      if ((recent?.n ?? 0) >= MAX_PER_IP_PER_HOUR) {
        return { ok: false as const, reason: "rate-limited" as const };
      }
    }

    await DB.prepare(
      `INSERT INTO quote_requests
         (company, country, contact_name, email, role, website,
          product, volume, private_label, message, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        data.company,
        data.country,
        data.contactName,
        data.email,
        data.role,
        data.website,
        data.product,
        data.volume,
        data.privateLabel,
        data.message,
        ip
      )
      .run();

    await sendQuoteNotification(env, data);

    return { ok: true as const };
  });

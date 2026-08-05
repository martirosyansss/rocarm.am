import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { bindings } from "../bindings.server";

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
});

/** Store an export enquiry. Validated server side; D1 is the only sink. */
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .validator(quoteSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      return { ok: false as const, reason: "storage-unavailable" as const };
    }

    await DB.prepare(
      `INSERT INTO quote_requests
         (company, country, contact_name, email, role, website,
          product, volume, private_label, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
        data.message
      )
      .run();

    return { ok: true as const };
  });

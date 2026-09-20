import { afterEach, expect, spyOn, test } from "bun:test";
import {
  buildQuoteEmail,
  sendQuoteNotification,
  type QuoteEmailData,
} from "../src/lib/quote-notify.server";

const data: QuoteEmailData = {
  company: "Acme\r\nBcc: evil@example.com",
  contactName: "Ann",
  country: "Georgia",
  email: "ann@acme.example",
  message: "Need a sample <script>alert(1)</script>",
  privateLabel: "No",
  product: "Garni Cola",
  role: "Importer",
  volume: "",
  website: "",
};

const env = { RESEND_API_KEY: "re_key", NOTIFY_TO: "a@x.am, b@x.am", NOTIFY_FROM: "Site <n@x.am>" };

afterEach(() => {
  globalThis.fetch = originalFetch;
});
const originalFetch = globalThis.fetch;

test("subject is a single line and empty fields are omitted", () => {
  const { subject, text } = buildQuoteEmail(data);
  expect(subject).not.toMatch(/[\r\n]/);
  expect(text).not.toContain("Volume:");
  expect(text).toContain("Message:\nNeed a sample <script>");
});

test("posts to Resend with reply_to and every recipient", async () => {
  let sent: { url: string; init: RequestInit } | undefined;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    sent = { url, init };
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;

  expect(await sendQuoteNotification(env, data)).toBe(true);
  const body = JSON.parse(String(sent?.init.body));
  expect(sent?.url).toBe("https://api.resend.com/emails");
  expect(body.to).toEqual(["a@x.am", "b@x.am"]);
  expect(body.reply_to).toBe("ann@acme.example");
});

test("never throws when Resend fails or config is missing", async () => {
  const warn = spyOn(console, "warn").mockImplementation(() => {});
  const error = spyOn(console, "error").mockImplementation(() => {});

  expect(await sendQuoteNotification({}, data)).toBe(false);

  globalThis.fetch = (async () => new Response("no", { status: 500 })) as unknown as typeof fetch;
  expect(await sendQuoteNotification(env, data)).toBe(false);

  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as unknown as typeof fetch;
  expect(await sendQuoteNotification(env, data)).toBe(false);

  warn.mockRestore();
  error.mockRestore();
});

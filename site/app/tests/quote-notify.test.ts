import { expect, spyOn, test } from "bun:test";
import {
  buildQuoteEmail,
  sendQuoteNotification,
  type OutgoingMail,
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

const env = {
  SMTP_HOST: "smtp.mail.ru",
  SMTP_PORT: "465",
  SMTP_USER: "box@rocarm.am",
  SMTP_PASSWORD: "secret",
  NOTIFY_TO: "a@x.am, b@x.am",
};

test("subject is a single line and empty fields are omitted", () => {
  const { subject, text } = buildQuoteEmail(data);
  expect(subject).not.toMatch(/[\r\n]/);
  expect(text).not.toContain("Volume:");
  expect(text).toContain("Message:\nNeed a sample <script>");
});

test("sends from the authenticated mailbox with reply-to and every recipient", async () => {
  let sent: { port: number; mail: OutgoingMail } | undefined;
  const ok = await sendQuoteNotification(env, data, async (config, mail) => {
    sent = { port: config.port, mail };
  });

  expect(ok).toBe(true);
  expect(sent?.port).toBe(465);
  expect(sent?.mail.from.email).toBe("box@rocarm.am");
  expect(sent?.mail.to).toEqual(["a@x.am", "b@x.am"]);
  expect(sent?.mail.reply).toBe("ann@acme.example");
});

test("never throws when SMTP fails or config is missing", async () => {
  const warn = spyOn(console, "warn").mockImplementation(() => {});
  const error = spyOn(console, "error").mockImplementation(() => {});

  expect(await sendQuoteNotification({}, data)).toBe(false);
  expect(await sendQuoteNotification({ ...env, SMTP_PORT: "abc" }, data)).toBe(false);
  expect(
    await sendQuoteNotification(env, data, async () => {
      throw new Error("smtp down");
    }),
  ).toBe(false);

  warn.mockRestore();
  error.mockRestore();
});

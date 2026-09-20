// Email notification for a new export enquiry, sent over SMTP (Mail.ru) from the Worker
// using Cloudflare TCP sockets. Kept free of static Workers-only imports so it can be
// unit-tested with bun.

export type QuoteEmailData = {
  company: string;
  contactName: string;
  country: string;
  email: string;
  message: string;
  privateLabel: string;
  product: string;
  role: string;
  volume: string;
  website: string;
};

export type NotifyEnv = {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  NOTIFY_TO?: string;
};

export type OutgoingMail = {
  from: { name: string; email: string };
  to: string[];
  reply: string;
  subject: string;
  text: string;
};

type SmtpConfig = { host: string; port: number; username: string; password: string };
export type SendMail = (config: SmtpConfig, mail: OutgoingMail) => Promise<void>;

const oneLine = (value: string, max: number) => value.replace(/[\r\n]+/g, " ").slice(0, max);

export function buildQuoteEmail(data: QuoteEmailData) {
  const rows: Array<[string, string]> = [
    ["Company", data.company],
    ["Contact", data.contactName],
    ["Email", data.email],
    ["Country", data.country],
    ["Product", data.product],
    ["Role", data.role],
    ["Volume", data.volume],
    ["Private label", data.privateLabel],
    ["Website", data.website],
  ];
  const body = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    // Plain text only: user input is never interpreted as markup.
    subject: `New enquiry: ${oneLine(data.company, 100)} (${oneLine(data.country, 60)})`,
    text: data.message ? `${body}\n\nMessage:\n${data.message}` : body,
  };
}

// Dynamic import: `cloudflare:sockets` exists only in the Workers runtime.
const sendViaSmtp: SendMail = async (config, mail) => {
  const { WorkerMailer } = await import("worker-mailer");
  await WorkerMailer.send(
    {
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      credentials: { username: config.username, password: config.password },
      authType: "plain",
      socketTimeoutMs: 8000,
      responseTimeoutMs: 8000,
    },
    mail,
  );
};

/** Best-effort: the enquiry is already stored, so a mail failure must never fail the request. */
export async function sendQuoteNotification(
  env: NotifyEnv,
  data: QuoteEmailData,
  send: SendMail = sendViaSmtp,
): Promise<boolean> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, NOTIFY_TO } = env;
  const port = Number(SMTP_PORT);
  if (!SMTP_HOST || !Number.isInteger(port) || !SMTP_USER || !SMTP_PASSWORD || !NOTIFY_TO) {
    console.warn("quote notification skipped: SMTP_* / NOTIFY_TO not configured");
    return false;
  }

  try {
    const { subject, text } = buildQuoteEmail(data);
    await send(
      { host: SMTP_HOST, port, username: SMTP_USER, password: SMTP_PASSWORD },
      {
        // Mail.ru only accepts the authenticated mailbox as the sender address.
        from: { name: "Rocarm Website", email: SMTP_USER },
        to: NOTIFY_TO.split(",").map((address) => address.trim()),
        reply: data.email,
        subject,
        text,
      },
    );
    return true;
  } catch (error) {
    console.error("quote notification failed", error);
    return false;
  }
}

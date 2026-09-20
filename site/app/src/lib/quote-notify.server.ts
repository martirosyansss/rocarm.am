// Email notification for a new export enquiry, sent through the Resend HTTP API.
// Kept free of Workers-only imports so it can be unit-tested with bun.

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
  RESEND_API_KEY?: string;
  NOTIFY_TO?: string;
  NOTIFY_FROM?: string;
};

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

/** Best-effort: the enquiry is already stored, so a mail failure must never fail the request. */
export async function sendQuoteNotification(env: NotifyEnv, data: QuoteEmailData): Promise<boolean> {
  const { RESEND_API_KEY, NOTIFY_TO, NOTIFY_FROM } = env;
  if (!RESEND_API_KEY || !NOTIFY_TO || !NOTIFY_FROM) {
    console.warn("quote notification skipped: RESEND_API_KEY / NOTIFY_TO / NOTIFY_FROM not set");
    return false;
  }

  try {
    const { subject, text } = buildQuoteEmail(data);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: NOTIFY_TO.split(",").map((address) => address.trim()),
        reply_to: data.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      console.error(`quote notification failed: Resend responded ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("quote notification failed", error);
    return false;
  }
}

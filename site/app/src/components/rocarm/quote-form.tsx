import { useState } from "react";

import { submitQuoteRequest } from "@/lib/api/quote.functions";

type Status = "idle" | "sending" | "sent" | "error";

const ROLES = ["Importer", "Distributor", "Retail chain", "HoReCa", "Wholesaler", "Other"];

const PRODUCTS = [
  "Garni Crystalline still",
  "Garni Crystalline sparkling",
  "Garni Crystalline 18.9 L",
  "Garni Crystalline 6 L",
  "Garni Crystalline 10 L",
  "Garni Crystalline 0.5 L glass still",
  "Garni Crystalline 0.5 L glass sparkling",
  "Garni Cola",
  "Mixed pallet",
];

export function QuoteForm({
  qualityRequest = false,
  onCancelQualityRequest,
  product,
  onProductChange,
  requestDetails,
}: {
  qualityRequest?: boolean;
  onCancelQualityRequest?: () => void;
  product?: string;
  onProductChange?: (product: string) => void;
  requestDetails?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string) => String(form.get(key) ?? "").trim();

    setStatus("sending");
    setError("");
    try {
      const result = await submitQuoteRequest({
        data: {
          company: value("company"),
          contactName: value("contactName"),
          country: value("country"),
          email: value("email"),
          message: [
            requestDetails ?? "",
            qualityRequest ? "Please send the quality report and a sample batch analysis." : "",
            value("message"),
          ]
            .filter(Boolean)
            .join("\n\n"),
          privateLabel: value("privateLabel"),
          product: value("product"),
          role: value("role"),
          trap: value("trap"),
          volume: value("volume"),
          website: value("website"),
        },
      });
      if (result.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setError("We could not store your enquiry. Please email info@rocarm.am.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please email info@rocarm.am.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rc-rise" role="status" aria-live="polite">
        <h3 className="rc-h3">Enquiry received</h3>
        <p className="rc-body" style={{ marginTop: "12px", maxWidth: "52ch" }}>
          Our export desk answers within one working day. If it is urgent, write to info@rocarm.am
          or call +374 60 50 40 50.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rc-form"
      noValidate={false}
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
    >
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", height: 0, overflow: "hidden" }}>
        <label htmlFor="trap">Leave this field empty</label>
        <input autoComplete="off" id="trap" name="trap" tabIndex={-1} type="text" />
      </div>
      <p className="rc-form__intro">* Required fields. Order details can follow later.</p>
      {qualityRequest ? (
        <div className="rc-form__request" role="status">
          <span>Quality report &amp; sample analysis requested</span>
          {onCancelQualityRequest ? (
            <button type="button" onClick={onCancelQualityRequest}>
              Remove request
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="rc-field">
        <label htmlFor="company">Company *</label>
        <input
          autoComplete="organization"
          maxLength={200}
          id="company"
          name="company"
          required
          type="text"
        />
      </div>

      <div className="rc-field">
        <label htmlFor="country">Country *</label>
        <input
          autoComplete="country-name"
          maxLength={120}
          id="country"
          name="country"
          required
          type="text"
        />
      </div>

      <div className="rc-field">
        <label htmlFor="contactName">Contact name *</label>
        <input
          autoComplete="name"
          maxLength={200}
          id="contactName"
          name="contactName"
          required
          type="text"
        />
      </div>

      <div className="rc-field">
        <label htmlFor="email">Email *</label>
        <input autoComplete="email" maxLength={200} id="email" name="email" required type="email" />
      </div>

      <div className="rc-field rc-field--wide">
        <label htmlFor="product">Product of interest</label>
        <select
          {...(product === undefined ? { defaultValue: PRODUCTS[0] } : { value: product })}
          onChange={(event) => onProductChange?.(event.target.value)}
          id="product"
          name="product"
        >
          {PRODUCTS.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      <details className="rc-form__optional">
        <summary>Add order details (optional)</summary>
        <div className="rc-form__optional-grid">
          <div className="rc-field">
            <label htmlFor="role">You are</label>
            <select defaultValue={ROLES[0]} id="role" name="role">
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="rc-field">
            <label htmlFor="volume">Indicative volume</label>
            <input
              maxLength={120}
              id="volume"
              name="volume"
              placeholder="e.g. 5,000 units per month"
              type="text"
            />
          </div>

          <div className="rc-field">
            <label htmlFor="privateLabel">Private label</label>
            <select defaultValue="No" id="privateLabel" name="privateLabel">
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Maybe">Want to discuss</option>
            </select>
          </div>

          <div className="rc-field rc-field--wide">
            <label htmlFor="website">Company website</label>
            <input autoComplete="url" maxLength={300} id="website" name="website" type="text" />
          </div>
        </div>
      </details>

      <div className="rc-field rc-field--wide">
        <label htmlFor="message">Anything we should know</label>
        <textarea
          id="message"
          name="message"
          maxLength={3800}
          placeholder="Formats, destination, sample request..."
          rows={3}
        />
      </div>

      <div className="rc-field rc-field--wide">
        <button
          className="rc-quote-cta"
          disabled={status === "sending"}
          style={{ border: "none", cursor: "pointer" }}
          type="submit"
        >
          {status === "sending"
            ? "Sending..."
            : qualityRequest
              ? "Request the quality report"
              : "Send your enquiry"}
          <span aria-hidden="true" className="rc-quote-cta__arrow">
            &#8594;
          </span>
        </button>
        {error ? (
          <p className="rc-field__err" role="alert">
            {error}
          </p>
        ) : null}
        <p className="rc-note">
          We answer within one working day. Your details are not shared outside Rocarm LLC.
        </p>
      </div>
    </form>
  );
}

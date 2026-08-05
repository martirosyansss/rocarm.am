import { useState } from "react";

import { submitQuoteRequest } from "@/lib/api/quote.functions";

type Status = "idle" | "sending" | "sent" | "error";

const ROLES = [
  "Importer",
  "Distributor",
  "Retail chain",
  "HoReCa",
  "Wholesaler",
  "Other",
];

const PRODUCTS = [
  "Garni Crystalline still",
  "Garni Crystalline sparkling",
  "Garni Crystalline 18.9 L",
  "Garni Cola",
  "Mixed pallet",
];

export function QuoteForm() {
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
          message: value("message"),
          privateLabel: value("privateLabel"),
          product: value("product"),
          role: value("role"),
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
      <div className="rc-rise">
        <h3 className="rc-h3">Enquiry received</h3>
        <p className="rc-body" style={{ marginTop: "12px", maxWidth: "52ch" }}>
          Our export desk answers within one working day. If it is urgent, write
          to info@rocarm.am or call +374 60 50 40 50.
        </p>
      </div>
    );
  }

  return (
    <form className="rc-form" noValidate={false} onSubmit={onSubmit}>
      <div className="rc-field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" required type="text" />
      </div>

      <div className="rc-field">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" required type="text" />
      </div>

      <div className="rc-field">
        <label htmlFor="contactName">Contact name</label>
        <input id="contactName" name="contactName" required type="text" />
      </div>

      <div className="rc-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" required type="email" />
      </div>

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
        <label htmlFor="product">Product of interest</label>
        <select defaultValue={PRODUCTS[0]} id="product" name="product">
          {PRODUCTS.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      <div className="rc-field">
        <label htmlFor="volume">Indicative volume</label>
        <input
          id="volume"
          name="volume"
          placeholder="Units per month, or containers per year"
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
        <input id="website" name="website" type="text" />
      </div>

      <div className="rc-field rc-field--wide">
        <label htmlFor="message">Anything we should know</label>
        <textarea id="message" name="message" rows={4} />
      </div>

      <div className="rc-field rc-field--wide">
        <button
          className="rc-quote-cta"
          disabled={status === "sending"}
          style={{ border: "none", cursor: "pointer" }}
          type="submit"
        >
          {status === "sending" ? "Sending" : "Request a quote"}
          <span aria-hidden="true" className="rc-quote-cta__arrow">
            &#8594;
          </span>
        </button>
        {error ? <p className="rc-field__err">{error}</p> : null}
        <p className="rc-note">
          We answer within one working day. Your details are not shared outside
          Rocarm LLC.
        </p>
      </div>
    </form>
  );
}

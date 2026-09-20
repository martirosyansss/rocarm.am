-- Client IP for per-IP rate limiting of the enquiry form. Additive only.
ALTER TABLE quote_requests ADD COLUMN ip TEXT;

CREATE INDEX IF NOT EXISTS idx_quote_requests_ip_created
  ON quote_requests (ip, created_at);

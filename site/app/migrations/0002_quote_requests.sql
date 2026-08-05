-- Export enquiries submitted from the home page. Additive only.
CREATE TABLE IF NOT EXISTS quote_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT NOT NULL,
  country TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT,
  website TEXT,
  product TEXT,
  volume TEXT,
  private_label TEXT,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_created
  ON quote_requests (created_at DESC);

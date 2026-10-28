CREATE TABLE IF NOT EXISTS briefs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ref TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  company TEXT,
  channel TEXT NOT NULL CHECK (channel IN ('email','whatsapp')),
  contact TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT,
  country TEXT,
  deadline TEXT,
  brief TEXT NOT NULL CHECK (length(brief) BETWEEN 20 AND 3000),
  marketing INTEGER NOT NULL DEFAULT 0,
  locale TEXT NOT NULL DEFAULT 'id',
  est TEXT,
  ip_hash TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS briefs_ip_created ON briefs (ip_hash, created_at);

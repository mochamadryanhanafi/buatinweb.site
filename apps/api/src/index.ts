import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { validateBrief } from '@bw/shared/validate';
import { BY } from '@bw/shared';

type Env = { Bindings: { DB: D1Database; ALLOWED_ORIGINS: string } };
const app = new Hono<Env>();

app.use('/api/*', async (c, next) => {
  const allow = (c.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim());
  return cors({ origin: o => (allow.includes(o) ? o : ''), allowMethods: ['POST', 'GET', 'OPTIONS'] })(c, next);
});

app.get('/api/health', c => c.json({ ok: true }));

export const makeRef = (rnd = Math.random) =>
  'BW-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + rnd().toString(36).slice(2, 6).toUpperCase().padEnd(4, 'X');

async function sha(s: string) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

// ponytail: rate limit = D1 count per ip_hash/min (5). Upgrade to Durable Object / KV if abuse grows.
app.post('/api/brief', async c => {
  let body: any;
  try { body = await c.req.json(); } catch { return c.json({ error: 'validation_error', fields: { body: 1 } }, 400); }
  const e = validateBrief(body);
  if (body.service !== 'not-sure' && !BY[body.service]) e.service = 1;
  if (Object.keys(e).length) return c.json({ error: 'validation_error', fields: e }, 400);

  const ipHash = await sha(c.req.header('cf-connecting-ip') || '0');
  try {
    const n = await c.env.DB.prepare(
      "SELECT count(*) AS n FROM briefs WHERE ip_hash=? AND created_at > strftime('%Y-%m-%dT%H:%M:%fZ','now','-1 minute')"
    ).bind(ipHash).first<number>('n');
    if ((n ?? 0) >= 5) return c.json({ error: 'rate_limited' }, 429);

    const ref = makeRef();
    const s = (k: string, max = 200) => (body[k] == null ? null : String(body[k]).slice(0, max));
    await c.env.DB.prepare(
      'INSERT INTO briefs (ref,name,company,channel,contact,service,budget,country,deadline,brief,marketing,locale,est,ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    ).bind(ref, s('name', 120), s('company', 160), body.channel, s('contact'), s('service', 32), s('budget', 8), s('country', 80),
      s('deadline', 10), String(body.brief).trim(), body.marketing === true ? 1 : 0, body.locale === 'en' ? 'en' : 'id', s('est', 2000), ipHash).run();
    return c.json({ ref }, 201);
  } catch (err) {
    console.error('brief insert failed', (err as Error).message); // no PII logged
    return c.json({ error: 'unavailable' }, 503);
  }
});

export default app;

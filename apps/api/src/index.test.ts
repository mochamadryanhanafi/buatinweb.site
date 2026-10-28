import { test, expect } from 'bun:test';
import { validateBrief } from '@bw/shared/validate';
import app, { makeRef } from './index';

const ok = { name: 'A', channel: 'email', contact: 'a@b.co', service: 'WEB-01', brief: 'x'.repeat(20), privacy: true };

test('validateBrief rules', () => {
  expect(validateBrief(ok)).toEqual({});
  expect(validateBrief({ ...ok, name: ' ' })).toHaveProperty('name');
  expect(validateBrief({ ...ok, contact: 'nope' })).toHaveProperty('contact');
  expect(validateBrief({ ...ok, channel: 'whatsapp', contact: '+62 812-3456-7890' })).toEqual({});
  expect(validateBrief({ ...ok, channel: 'whatsapp', contact: '0812' })).toHaveProperty('contact');
  expect(validateBrief({ ...ok, brief: 'short' })).toHaveProperty('brief');
  expect(validateBrief({ ...ok, privacy: false })).toHaveProperty('privacy');
});

test('makeRef format', () => expect(makeRef(() => 0.5)).toMatch(/^BW-\d{6}-[A-Z0-9]{4}$/));

function fakeDB(n = 0, fail = false) {
  return { prepare: () => ({ bind: () => ({ first: async () => n, run: async () => { if (fail) throw new Error('db'); } }) }) };
}
const env = (DB: any) => ({ DB, ALLOWED_ORIGINS: 'http://x' });
const post = (body: unknown, DB: any) =>
  app.request('/api/brief', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }, env(DB));

test('POST /api/brief states', async () => {
  expect((await post({ ...ok, name: '' }, fakeDB())).status).toBe(400);
  expect((await post({ ...ok, service: 'NOPE-1' }, fakeDB())).status).toBe(400);
  expect((await post(ok, fakeDB(5))).status).toBe(429);
  expect((await post(ok, fakeDB(0, true))).status).toBe(503);
  const r = await post(ok, fakeDB());
  expect(r.status).toBe(201);
  expect((await r.json()).ref).toMatch(/^BW-/);
});

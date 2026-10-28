import { useEffect, useRef, useState } from 'preact/hooks';
import { BY, RENEW, fmt as FMT, price, renewLabel, page } from '@bw/shared';
import { T, BASES, ONE, MON, INT, QTY, DOM_INCL, DOM_BUDGET } from '~/i18n/estimator.js';

type L = 'id' | 'en';
type Opt = { id: string; code: string; kind: 'radio' | 'checkbox'; grp: string; name: string; price: string; note: string; on: boolean; disabled: boolean; op: number; toggle: () => void; hasQty?: boolean; qty?: number; inc?: () => void; dec?: () => void };
const QB = 'font:inherit;width:36px;height:36px;border:0;background:transparent;color:var(--tx);cursor:pointer';

export default function Estimator({ lang }: { lang: L }) {
  const t = T[lang], o = lang;
  const [base, setBase] = useState('WEB-01');
  const [add, setAdd] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    const p = new URLSearchParams(location.search), a: Record<string, boolean> = {}, q: Record<string, number> = {};
    (p.get('add') || '').split(',').filter(Boolean).forEach((x) => { const [c, n] = x.split('*'); a[c] = true; if (n) q[c] = Math.max(1, Math.min(10, +n || 1)); });
    const pb = p.get('base'); setBase(pb !== null && BASES.includes(pb) ? pb : 'WEB-01'); setAdd(a); setQty(q);
  }, []);
  const addList = () => Object.keys(add).filter((k) => add[k]).map((k) => QTY.includes(k) && (qty[k] || 1) > 1 ? k + '*' + qty[k] : k).join(',');
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const a = addList(), id = setTimeout(() => { try { const u = new URL(location.href); u.searchParams.set('base', base); a ? u.searchParams.set('add', a) : u.searchParams.delete('add'); history.replaceState(history.state, '', u); } catch {} }, 300);
    return () => clearTimeout(id);
  }, [base, add, qty]);

  const toggle = (c: string) => setAdd((s) => {
    const n = { ...s, [c]: !s[c] };
    if (c.startsWith('MS-') && n[c]) MON.filter((x: string) => x.startsWith('MS-') && x !== c).forEach((x: string) => (n[x] = false));
    if (c === 'INF-11' && n[c]) n['SEC-06'] = false; if (c === 'SEC-06' && n[c]) n['INF-11'] = false;
    return n;
  });
  const fmt = (n: number) => FMT(n, lang), strip = (x: string) => x.replace(/^(Rp|IDR )/, '');
  const rules: string[] = [], locked: Record<string, string> = {};
  if (DOM_INCL.includes(base)) { locked['ADD-01'] = t.incl; if (add['ADD-01']) rules.push(t.rDom.replace('{c}', base)); }
  if (base === 'BND-03') { locked['SHT-05'] = t.incl; if (add['SHT-05']) rules.push(t.rBnd); }
  if (DOM_BUDGET.includes(base)) locked['ADD-02'] = t.budgetIncl;
  const on = (c: string) => !!add[c] && !locked[c];
  const mkOpt = (c: string): Opt => { const it = BY[c], lk = locked[c], q = qty[c] || 1; return { id: 'o-' + c, code: c, kind: 'checkbox', grp: c, name: it[o], price: lk ? '' : price(it, lang), note: lk || (c === 'INF-11' && add['SEC-06'] ? t.same.replace('{c}', 'SEC-06') : c === 'SEC-06' && add['INF-11'] ? t.same.replace('{c}', 'INF-11') : ''),
    on: lk && c !== 'ADD-02' ? true : !!add[c], disabled: !!lk, op: lk ? 0.55 : 1, toggle: () => toggle(c),
    hasQty: QTY.includes(c) && on(c), qty: q, inc: () => setQty((s) => ({ ...s, [c]: Math.min(10, (s[c] || 1) + 1) })), dec: () => setQty((s) => ({ ...s, [c]: Math.max(1, (s[c] || 1) - 1) })) }; };
  const baseOpts: Opt[] = BASES.map((c: string) => c ? { id: 'b-' + c, code: c, kind: 'radio', grp: 'base', name: BY[c][o], price: price(BY[c], lang), note: RENEW[c] ? (lang === 'id' ? 'Tahun ke-2: ' : 'Year 2: ') + renewLabel(c, lang) : '', on: base === c, disabled: false, op: 1, toggle: () => setBase(c) }
    : { id: 'b-none', code: '—', kind: 'radio', grp: 'base', name: t.none, note: t.noneNote, price: '', on: base === '', disabled: false, op: 1, toggle: () => setBase('') });
  const steps = [{ num: '01', title: t.s1, hint: t.h1, opts: baseOpts }, { num: '02', title: t.s2, hint: t.h2, opts: ONE.map(mkOpt) }, { num: '03', title: t.s3, hint: t.h3, opts: MON.map(mkOpt) }, { num: '04', title: t.s4, hint: t.h4, opts: INT.map(mkOpt) }];

  // compute
  type Ln = { k: string; v: string };
  let oMin = 0, oMax = 0, oFrom = false, m = 0, mFrom = false, y = 0, yFrom = false;
  const oL: Ln[] = [], mL: Ln[] = [], yL: Ln[] = [], vL: Ln[] = [];
  const b = base ? BY[base] : null;
  if (b) {
    oMin += b.p; oMax += b.p; if (b.type !== 'f') oFrom = true; oL.push({ k: b.code + ' ' + b[o], v: price(b, lang) });
    const r = RENEW[b.code]; if (r) { y += r.p; if (r.from) yFrom = true; yL.push({ k: b.code + ' ' + t.renewal, v: renewLabel(b.code, lang) }); rules.push(t.rRenew.replace('{c}', b.code)); }
    if (b.code === 'WEB-02') vL.push({ k: t.domRenew, v: t.actual }); if (DOM_BUDGET.includes(b.code)) vL.push({ k: t.domDiff, v: t.actual }); if (b.code === 'WEB-03') vL.push({ k: t.domRenew, v: t.actual });
  }
  let bkp = false;
  [...ONE, ...INT, ...MON].filter(on).forEach((c: string) => {
    const it = BY[c], q = QTY.includes(c) ? (qty[c] || 1) : 1;
    if (c === 'INF-11' || c === 'SEC-06') { if (bkp) return; bkp = true; if (add['INF-11'] && add['SEC-06']) rules.push(t.rBkp); }
    const lbl = c + ' ' + it[o] + (q > 1 ? ' ×' + q : '');
    if (it.type === 'a') { vL.push({ k: c + ' ' + t.domReg, v: t.actual }); return; }
    if (it.bill === 'm') { m += it.p; if (it.type !== 'f') mFrom = true; mL.push({ k: lbl, v: price(it, lang) }); return; }
    oMin += it.p * q; oMax += (it.max || it.p) * q; if (it.type === 's') oFrom = true;
    oL.push({ k: lbl, v: q > 1 ? (it.type === 'r' ? fmt(it.p * q) + '–' + strip(fmt(it.max * q)) : (it.type === 's' ? t.from + ' ' : '') + fmt(it.p * q)) : price(it, lang) });
  });
  const val = (min: number, max: number, from: boolean) => min === 0 && max === 0 ? t.dash : (from ? t.from + ' ' : '') + (min === max ? fmt(min) : fmt(min) + '–' + strip(fmt(max)));
  const quote = oFrom || mFrom || yFrom || oMin !== oMax;
  const groups = [{ label: t.gOnce, value: val(oMin, oMax, oFrom), lines: oL.length ? oL : [{ k: t.nothing, v: '' }] }, { label: t.gMonth, value: m ? (mFrom ? t.from + ' ' : '') + fmt(m) + ' ' + t.month : t.dash, lines: mL }, { label: t.gYear, value: val(y, y, yFrom), lines: yL }, { label: t.gVendor, value: vL.length ? String(vL.length) : t.dash, lines: vL }];
  const codes = [base, ...[...ONE, ...INT, ...MON].filter(on)].filter(Boolean);
  const summary = codes.join(', ') + ' · ' + t.gOnce + ': ' + val(oMin, oMax, oFrom) + (m ? ' · ' + t.gMonth + ': ' + fmt(m) : '');
  const copyLink = () => { try { navigator.clipboard.writeText(location.href); } catch {} setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:clamp(24px,4vw,48px);align-items:start;padding-top:40px">
      <div style="display:flex;flex-direction:column;gap:48px">
        {steps.map((st) => (
          <fieldset style="border:0;margin:0;padding:0">
            <legend style="display:flex;gap:14px;align-items:baseline;padding:0;margin-bottom:12px;width:100%"><span class="mono" style="font-size:12px;color:var(--tx2)">{st.num}</span><span style="font-size:20px;font-weight:600;letter-spacing:-0.015em">{st.title}</span></legend>
            <p style="margin:-4px 0 12px;font-size:14px;color:var(--tx2)">{st.hint}</p>
            <div style="border-top:1px solid var(--tx)">
              {st.opts.map((a) => (
                <div style={`display:flex;align-items:center;gap:14px;padding:12px 4px;border-bottom:1px solid var(--bd);min-height:52px;opacity:${a.op}`}>
                  <input id={a.id} type={a.kind} name={a.grp} checked={a.on} disabled={a.disabled} onChange={a.toggle} style="width:18px;height:18px;accent-color:var(--tx);margin:0;flex:none" />
                  <label for={a.id} style="display:flex;align-items:baseline;gap:14px;flex:1;min-width:0;cursor:pointer">
                    <span class="mono" style="font-size:12px;color:var(--tx2);width:56px;flex:none">{a.code}</span>
                    <span style="flex:1;min-width:0">{a.name}<span style="display:block;font-size:13px;color:var(--tx2)">{a.note}</span></span>
                    <span class="mono" style="font-size:13px;white-space:nowrap;text-align:right">{a.price}</span>
                  </label>
                  {a.hasQty && (
                    <div role="group" aria-label={t.qty + ' ' + a.code} style="display:flex;align-items:center;border:1px solid var(--bd2);border-radius:6px;flex:none">
                      <button type="button" aria-label="−" onClick={a.dec} style={QB}>−</button>
                      <span aria-live="polite" class="mono" style="font-size:13px;min-width:22px;text-align:center">{a.qty}</span>
                      <button type="button" aria-label="+" onClick={a.inc} style={QB}>+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <aside aria-label={t.result} style="position:sticky;top:88px;border:1px solid var(--tx);border-radius:12px;overflow:hidden;background:var(--bg)">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--tx);flex-wrap:wrap">
          <span class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em">{t.result}</span>
          <span class="mono" style={`font-size:12px;padding:4px 8px;border-radius:4px;border:1px solid var(--tx);background:${quote ? 'var(--bg)' : 'var(--inv)'};color:${quote ? 'var(--tx)' : 'var(--invtx)'}`}>{quote ? t.pillQ : t.pillF}</span>
        </div>
        <div aria-live="polite">
          {groups.map((g) => (
            <div style="padding:18px 20px;border-bottom:1px solid var(--bd)">
              <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;flex-wrap:wrap"><span style="font-size:14px;color:var(--tx2)">{g.label}</span><span style="font-size:clamp(20px,2vw,26px);font-weight:600;letter-spacing:-0.02em">{g.value}</span></div>
              {g.lines.map((l) => <div class="mono" style="display:flex;justify-content:space-between;gap:12px;font-size:12px;line-height:1.6;color:var(--tx2);margin-top:4px"><span>{l.k}</span><span style="text-align:right;white-space:nowrap">{l.v}</span></div>)}
            </div>
          ))}
        </div>
        {rules.length > 0 && (
          <div style="padding:16px 20px;border-bottom:1px solid var(--bd)">
            <div class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:8px">{t.rules}</div>
            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--tx2)">
              {rules.map((r) => <li style="display:flex;gap:8px"><span aria-hidden="true" class="mono" style="color:var(--tx)">✓</span><span>{r}</span></li>)}
            </ul>
          </div>
        )}
        <div style="padding:16px 20px;background:var(--sf);font-size:13px;color:var(--tx2);display:flex;flex-direction:column;gap:12px">
          <span>{t.note}</span>
          <a href={page(lang, 'Contact', { service: base || codes[0] || '', est: summary })} style="display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px;min-height:46px;border-radius:6px;background:var(--inv);color:var(--invtx);text-decoration:none">{t.send}</a>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button type="button" onClick={copyLink} style="flex:1;font:inherit;font-size:14px;min-height:44px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{copied ? t.copied : t.copy}</button>
            <button type="button" onClick={() => { setBase('WEB-01'); setAdd({}); setQty({}); }} style="font:inherit;font-size:14px;min-height:44px;padding:0 14px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{t.reset}</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

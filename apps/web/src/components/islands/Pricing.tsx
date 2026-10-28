import { useEffect, useRef, useState } from 'preact/hooks';
import { ITEMS, SECTIONS, GROUPS, RENEW, BY, groupOf, price, typeLabel, renewLabel, svc } from '@bw/shared';
import { T } from '~/i18n/pricing.js';

type L = 'id' | 'en';
const SEL = 'font:inherit;font-size:14px;min-height:44px;padding:0 10px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx)';

export default function Pricing({ lang }: { lang: L }) {
  const t = T[lang], o = lang;
  const [q, setQ] = useState(''); const [g, setG] = useState('all'); const [bill, setBill] = useState('all'); const [ptype, setPtype] = useState('all');
  const [cmp, setCmp] = useState<string[]>([]); const [cmpOpen, setCmpOpen] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQ(p.get('q') || ''); setG(p.get('cat') || 'all'); setBill(p.get('bill') || 'all'); setPtype(p.get('type') || 'all');
    setCmp((p.get('cmp') || '').split(',').filter(Boolean).slice(0, 3));
  }, []);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const id = setTimeout(() => { try {
      const u = new URL(location.href), P = u.searchParams;
      ([['q', q, ''], ['cat', g, 'all'], ['bill', bill, 'all'], ['type', ptype, 'all'], ['cmp', cmp.join(','), '']] as [string, string, string][]).forEach(([k, v, d]) => v !== d ? P.set(k, v) : P.delete(k));
      history.replaceState(history.state, '', u);
    } catch {} }, 300);
    return () => clearTimeout(id);
  }, [q, g, bill, ptype, cmp]);

  const toggle = (c: string) => setCmp((x) => x.includes(c) ? x.filter((y) => y !== c) : x.length < 3 ? [...x, c] : x);
  const reset = () => { setQ(''); setG('all'); setBill('all'); setPtype('all'); };
  const filtered = !!q || g !== 'all' || bill !== 'all' || ptype !== 'all';
  const ql = q.trim().toLowerCase();
  const pass = (it: any, ignoreG?: boolean) => (ignoreG || g === 'all' || groupOf(it.code) === g) && (bill === 'all' || it.bill === bill) && (ptype === 'all' || it.type === ptype) && (!ql || [it.code, it.en, it.id, it.sen, it.sid].some((x: string) => x.toLowerCase().includes(ql)));
  const all = ITEMS.filter((it: any) => pass(it));
  const sections = SECTIONS.map((sc: any) => ({ sc, rows: all.filter((it: any) => it.sec === sc.k) })).filter((x) => x.rows.length);
  const cmpItems = cmp.map((c) => BY[c]).filter(Boolean);
  const billName: Record<string, string> = { o: t.once, m: t.month, y: t.year };
  const chips = [{ k: 'all', label: t.all, n: ITEMS.filter((it: any) => pass(it, true)).length }, ...GROUPS.map((gr: any) => ({ k: gr.k, label: gr[o], n: ITEMS.filter((it: any) => pass(it, true) && groupOf(it.code) === gr.k).length }))];
  const cmpRows: [string, (it: any) => string, number][] = [[t.rName, (it) => it.code + ' · ' + it[o], 600], [t.rPrice, (it) => price(it, lang), 600], [t.rType, (it) => typeLabel(it.type, lang), 400], [t.rBill, (it) => billName[it.bill], 400], [t.rScope, (it) => it[o === 'id' ? 'sid' : 'sen'], 400], [t.rRenew, (it) => RENEW[it.code] ? renewLabel(it.code, lang) : t.none, 400]];

  return (
    <>
      <section aria-label={t.filters} style="position:sticky;top:68px;z-index:20;background:var(--bg);padding:16px 0;border-bottom:1px solid var(--bd);display:flex;flex-direction:column;gap:10px">
        <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">
          <label style="flex:1 1 260px;display:flex;align-items:center;gap:10px;border:1px solid var(--bd2);border-radius:6px;padding:0 14px;min-height:44px">
            <span class="mono" style="font-size:12px;color:var(--tx2)">{t.search}</span>
            <input type="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} placeholder={t.searchPh} style="flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--tx);font:inherit;height:42px" />
          </label>
          <label style="display:flex;align-items:center;gap:8px;font-size:14px"><span style="color:var(--tx2)">{t.billing}</span>
            <select value={bill} onChange={(e) => setBill((e.target as HTMLSelectElement).value)} style={SEL}>{[['all', t.all], ['o', t.once], ['m', t.month], ['y', t.year]].map(([v, l]) => <option value={v}>{l}</option>)}</select></label>
          <label style="display:flex;align-items:center;gap:8px;font-size:14px"><span style="color:var(--tx2)">{t.ptype}</span>
            <select value={ptype} onChange={(e) => setPtype((e.target as HTMLSelectElement).value)} style={SEL}>{[['all', t.all], ['f', t.lg[0][0]], ['s', t.lg[1][0]], ['r', t.lg[2][0]], ['q', t.lg[3][0]], ['a', t.lg[4][0]]].map(([v, l]) => <option value={v}>{l}</option>)}</select></label>
        </div>
        <div role="group" aria-label={t.category} style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px">
          {chips.map((c) => <button type="button" class="chip" style="flex:none" aria-pressed={g === c.k} onClick={() => setG(c.k)}>{c.label} <span class="n">{c.n}</span></button>)}
        </div>
        <div class="mono" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12px;color:var(--tx2)"><span aria-live="polite">{t.count.replace('{n}', String(all.length)).replace('{t}', String(ITEMS.length))}</span>{filtered && <button type="button" class="lnk" onClick={reset}>{t.reset}</button>}</div>
      </section>

      {sections.map(({ sc, rows }) => (
        <section id={'s-' + sc.k.replace('.', '-')} aria-labelledby={'h-' + sc.k.replace('.', '-')} style="padding-top:56px">
          <div style="display:flex;gap:16px;align-items:baseline;border-top:1px solid var(--tx);padding-top:14px;flex-wrap:wrap">
            <span class="mono" style="font-size:12px;color:var(--tx2)">{sc.k}</span>
            <h2 id={'h-' + sc.k.replace('.', '-')} style="margin:0;font-size:clamp(22px,2.4vw,30px);letter-spacing:-0.02em;font-weight:600">{sc[o]}</h2>
            <span class="mono" style="margin-left:auto;font-size:12px;color:var(--tx2)">{rows.length}</span>
          </div>
          <div style="margin-top:8px">
            {rows.map((it: any) => { const inC = cmp.includes(it.code); return (
              <div style="display:grid;grid-template-columns:28px 72px minmax(0,1fr) auto;column-gap:16px;row-gap:4px;align-items:baseline;padding:16px 0;border-bottom:1px solid var(--bd)">
                <input type="checkbox" aria-label={(inC ? t.rm : t.add).replace('{c}', it.code)} checked={inC} disabled={!inC && cmp.length >= 3} onChange={() => toggle(it.code)} style="width:18px;height:18px;margin:0;accent-color:var(--tx);align-self:center" />
                <span class="mono" style="font-size:12px;color:var(--tx2)">{it.code}</span>
                <div style="min-width:0">
                  <a href={svc(lang, it.code)} style="font-size:16px;font-weight:600;text-decoration:none">{it[o]}</a>
                  <p style="margin:4px 0 0;font-size:14px;color:var(--tx2);text-wrap:pretty;max-width:60ch">{it[o === 'id' ? 'sid' : 'sen']}</p>
                </div>
                <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                  <span class="mono" style="font-size:14px;white-space:nowrap">{price(it, lang)}</span>
                  <span class="mono" style="font-size:11px;text-transform:uppercase;letter-spacing:0.04em;border:1px solid var(--bd2);border-radius:4px;padding:2px 6px;color:var(--tx2)">{typeLabel(it.type, lang)}</span>
                  {!!RENEW[it.code] && <span style="font-size:12px;color:var(--tx2)">{(lang === 'id' ? 'Tahun ke-2: ' : 'Year 2: ') + renewLabel(it.code, lang)}</span>}
                </div>
              </div>); })}
          </div>
        </section>
      ))}
      {all.length === 0 && <div style="padding:72px 0;text-align:center;color:var(--tx2)">{t.empty} <button type="button" class="lnk" onClick={reset}>{t.reset}</button></div>}

      <section id="renewals" aria-labelledby="rn-h" style="padding-top:88px">
        <div style="display:flex;gap:16px;align-items:baseline;border-top:1px solid var(--tx);padding-top:14px"><span class="mono" style="font-size:12px;color:var(--tx2)">A.16</span><h2 id="rn-h" style="margin:0;font-size:clamp(22px,2.4vw,30px);letter-spacing:-0.02em;font-weight:600">{t.renewTitle}</h2></div>
        <p style="color:var(--tx2);max-width:44em;margin:12px 0 16px">{t.renewSub}</p>
        {Object.keys(RENEW).map((c) => (
          <div style="display:grid;grid-template-columns:72px minmax(0,1fr) auto;gap:16px;align-items:baseline;padding:14px 0;border-bottom:1px solid var(--bd)">
            <span class="mono" style="font-size:12px;color:var(--tx2)">{c}</span>
            <div style="min-width:0"><span style="font-weight:600">{BY[c][o]}</span><p style="margin:2px 0 0;font-size:14px;color:var(--tx2)">{RENEW[c][o]}</p></div>
            <span class="mono" style="font-size:14px;white-space:nowrap">{renewLabel(c, lang)}</span>
          </div>
        ))}
      </section>

      {cmp.length > 0 && (
        <aside aria-label={t.cmpTitle} style="position:sticky;bottom:0;z-index:30;background:var(--bg);border-top:1px solid var(--tx);margin:48px calc(-1 * clamp(20px,4vw,40px)) 0">
          <div style="max-width:1280px;margin:0 auto;padding:12px clamp(20px,4vw,40px);display:flex;flex-wrap:wrap;gap:10px;align-items:center">
            <span class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em">{t.cmpN.replace('{n}', String(cmp.length))}</span>
            {cmpItems.map((it: any) => <button type="button" class="mono" onClick={() => toggle(it.code)} aria-label={t.rm.replace('{c}', it.code)} style="font-size:12px;min-height:36px;padding:0 10px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{it.code} ×</button>)}
            <div style="margin-left:auto;display:flex;gap:8px">
              <button type="button" onClick={() => { setCmp([]); setCmpOpen(false); }} style="font:inherit;font-size:14px;min-height:44px;padding:0 14px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{t.clear}</button>
              <button type="button" aria-expanded={cmpOpen} aria-controls="cmp-panel" onClick={() => setCmpOpen(!cmpOpen)} style="font:inherit;font-weight:600;font-size:14px;min-height:44px;padding:0 16px;border:0;border-radius:6px;background:var(--inv);color:var(--invtx);cursor:pointer">{cmpOpen ? t.hide : t.open}</button>
            </div>
          </div>
          {cmpOpen && (
            <div id="cmp-panel" role="region" aria-label={t.cmpTitle} tabIndex={0} style="border-top:1px solid var(--bd);max-height:60vh;overflow:auto">
              <div style="max-width:1280px;margin:0 auto;padding:0 clamp(20px,4vw,40px) 16px;min-width:640px">
                {cmpRows.map(([label, fn, w]) => (
                  <div style="display:flex;border-bottom:1px solid var(--bd)">
                    <div class="mono" style="width:150px;flex:none;padding:12px 0;font-size:12px;line-height:1.5;color:var(--tx2);text-transform:uppercase;letter-spacing:0.03em">{label}</div>
                    {cmpItems.map((it: any) => <div style={`flex:1 1 0;min-width:150px;padding:12px 16px;border-left:1px solid var(--bd);font-size:14px;font-weight:${w}`}>{fn(it)}</div>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      )}
    </>
  );
}

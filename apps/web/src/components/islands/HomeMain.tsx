import { useEffect, useRef, useState } from 'preact/hooks';
import { BY, ITEMS, groupOf, fmt as FMT, price, typeLabel, page } from '@bw/shared';
import { T, PKG, FEAT, ADDS, BASES, GROUPS, RENEW, DOMAIN_INCL } from '~/i18n/home.js';

const CAT: any[] = ITEMS.map((i: any) => ({ ...i, g: groupOf(i.code) }));

type L = 'id' | 'en';
const H2 = 'font-size:var(--h2);line-height:1.02;letter-spacing:-0.035em;font-weight:600;margin:0;max-width:16ch;text-wrap:balance';
const HEAD = 'display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;align-items:end;margin:32px 0 48px';
const SEC = 'padding-top:clamp(72px,10vw,128px)';
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function HomeMain({ lang }: { lang: L }) {
  const t = T[lang], o = lang, ix = lang === 'id' ? 1 : 0;
  const fmt = (n: number) => FMT(n, lang), nm = (c: any) => c[o], pr = (c: any) => price(c, lang);
  const [cat, setCat] = useState('all'); const [bill, setBill] = useState('all'); const [q, setQ] = useState('');
  const [cmp, setCmp] = useState(['WEB-01', 'WEB-05', 'WEB-06']);
  const [base, setBase] = useState('WEB-01'); const [add, setAdd] = useState<Record<string, boolean>>({});
  const first = useRef(true);
  useEffect(() => { const p = new URLSearchParams(location.search); setCat(p.get('cat') || 'all'); setBill(p.get('bill') || 'all'); setQ(p.get('q') || ''); }, []);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    try { const u = new URL(location.href); cat !== 'all' ? u.searchParams.set('cat', cat) : u.searchParams.delete('cat'); bill !== 'all' ? u.searchParams.set('bill', bill) : u.searchParams.delete('bill'); q ? u.searchParams.set('q', q) : u.searchParams.delete('q'); history.replaceState(null, '', u); } catch {}
  }, [cat, bill, q]);
  const toggleCmp = (c: string) => setCmp((s) => s.includes(c) ? s.filter((x) => x !== c) : s.length < 3 ? [...s, c] : s);
  const brief = (service: string, extra?: string) => window.dispatchEvent(new CustomEvent('bw-brief', { detail: { service, extra } }));

  const groupCards = GROUPS.map((g: any, i: number) => { const its = CAT.filter((c: any) => c.g === g.k), min = Math.min(...its.filter((c: any) => c.p > 0).map((c: any) => c.p)); return { k: g.k, num: String(i + 1).padStart(2, '0'), name: g[o], desc: o === 'id' ? g.did : g.den, from: t.from + ' ' + fmt(min), count: its.length + ' ' + t.items }; });
  const ql = q.trim().toLowerCase();
  const items = CAT.filter((c: any) => (cat === 'all' || c.g === cat) && (bill === 'all' || c.bill === bill) && (!ql || c.code.toLowerCase().includes(ql) || c.en.toLowerCase().includes(ql) || c.id.toLowerCase().includes(ql)));
  const gname = (k: string) => GROUPS.find((g: any) => g.k === k)?.[o] ?? '';
  const nBill = (f: (c: any) => boolean) => CAT.filter((c: any) => f(c) && (bill === 'all' || c.bill === bill)).length;
  const catChips = [{ k: 'all', label: t.all, n: nBill(() => true) }, ...GROUPS.map((g: any) => ({ k: g.k, label: g[o], n: nBill((c) => c.g === g.k) }))];
  const billChips: [string, string][] = [['all', t.all], ['o', t.once], ['m', t.month], ['y', t.year]];
  const row = (label: string, fn: (c: string) => string, w = 400) => ({ label, cells: cmp.map((c) => ({ v: fn(c), w })) });
  const cmpRows = cmp.length ? [row('', (c) => c + ' · ' + nm(BY[c]), 600), row(t.rUp, (c) => pr(BY[c]), 600), row(t.rRen, (c) => fmt(RENEW[c]) + (lang === 'id' ? ' / tahun' : ' / year')), row(t.rPages, (c) => PKG[c].pages[ix]), row(t.rDesign, (c) => PKG[c].sec[ix]), row(t.rDom, (c) => PKG[c].dom[ix]), row(t.rRev, (c) => PKG[c].rev[ix]), row(t.rEx, (c) => PKG[c].ex[ix])] : [];

  // estimator-lite
  const b = base ? BY[base] : null;
  const sel = ADDS.filter((c: string) => add[c] && !(c === 'ADD-01' && DOMAIN_INCL.includes(base))).map((c: string) => BY[c]);
  type Ln = { k: string; v: string };
  let oMin = 0, oMax = 0, oStart = false, mSum = 0, mStart = false, ySum = 0;
  const oL: Ln[] = [], mL: Ln[] = [], yL: Ln[] = [], vL: Ln[] = [];
  if (b) {
    oMin += b.p; oMax += b.p; if (b.type !== 'f') oStart = true; oL.push({ k: b.code + ' ' + nm(b), v: pr(b) });
    if (RENEW[b.code]) { ySum += RENEW[b.code]; yL.push({ k: b.code + ' ' + (lang === 'id' ? 'perpanjangan' : 'renewal'), v: fmt(RENEW[b.code]) }); }
    if (b.code === 'WEB-02') vL.push({ k: t.domRenew, v: t.actual });
    if (b.code === 'WEB-03' || b.code === 'WEB-06') vL.push({ k: t.domDiff, v: t.actual });
    if (b.code === 'WEB-03') vL.push({ k: t.domRenew, v: t.actual });
  }
  sel.forEach((c: any) => {
    if (c.bill === 'o') { oMin += c.p; oMax += c.max || c.p; if (c.type !== 'f') oStart = true; oL.push({ k: c.code + ' ' + nm(c), v: pr(c) }); }
    else if (c.bill === 'm') { mSum += c.p; if (c.type !== 'f') mStart = true; mL.push({ k: c.code + ' ' + nm(c), v: pr(c) }); }
    else if (c.type === 'a') vL.push({ k: c.code + ' ' + t.domReg, v: t.actual });
  });
  const pre = (s: boolean) => (s ? t.tS + ' ' : '');
  const oVal = oMin === 0 ? t.none : pre(oStart && oMin === oMax) + (oMin === oMax ? fmt(oMin) : fmt(oMin) + '–' + fmt(oMax).replace(/^(Rp|IDR )/, ''));
  const groups = [{ label: t.gOnce, value: oVal, lines: oL.length ? oL : [{ k: t.nothing, v: '' }] }, { label: t.gMonth, value: mSum ? pre(mStart) + fmt(mSum) : t.none, lines: mL }, { label: t.gYear, value: ySum ? fmt(ySum) : t.none, lines: yL }, { label: t.gVendor, value: vL.length ? String(vL.length) : t.none, lines: vL }];
  const quote = oStart || mStart || oMin !== oMax;
  const summary = [b ? b.code : null, ...sel.map((c: any) => c.code)].filter(Boolean).join(', ');

  return (<>
    <section id="services" aria-labelledby="svc-h" class="wrap" style={SEC}>
      <div class="rule"><span>01</span><span>{t.sServices}</span></div>
      <div style={HEAD}><h2 id="svc-h" style={H2}>{t.svcTitle}</h2><p style="margin:0;color:var(--tx2);max-width:28em">{t.svcSub}</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:1px;background:var(--bd);border:1px solid var(--bd);border-radius:12px;overflow:hidden">
        {groupCards.map((g) => (
          <button type="button" class="hov-sf" onClick={() => { setCat(g.k); go('catalog'); }} style="font:inherit;color:var(--tx);text-align:left;background:var(--bg);border:0;padding:24px;cursor:pointer;display:flex;flex-direction:column;gap:10px;min-height:210px">
            <span class="mono" style="font-size:12px;color:var(--tx2)">{g.num}</span>
            <span style="font-size:21px;font-weight:600;letter-spacing:-0.015em;margin-top:auto">{g.name}</span>
            <span style="color:var(--tx2);font-size:15px;text-wrap:pretty">{g.desc}</span>
            <span class="mono" style="display:flex;justify-content:space-between;gap:8px;font-size:13px;border-top:1px solid var(--bd);padding-top:12px;margin-top:4px;width:100%"><span>{g.from}</span><span style="color:var(--tx2)">{g.count}</span></span>
          </button>
        ))}
      </div>
    </section>

    <section id="packages" aria-labelledby="pkg-h" class="wrap" style={SEC}>
      <div class="rule"><span>02</span><span>{t.sPackages}</span></div>
      <div style={HEAD}><h2 id="pkg-h" style={H2}>{t.pkgTitle}</h2><p style="margin:0;color:var(--tx2);max-width:28em">{t.pkgSub}</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px">
        {['WEB-01', 'WEB-05', 'WEB-06'].map((c) => { const it = BY[c], f = FEAT[c], inC = cmp.includes(c); return (
          <article style="border:1px solid var(--bd2);border-radius:12px;padding:28px;display:flex;flex-direction:column;gap:20px;background:var(--bg)">
            <div class="mono" style="display:flex;justify-content:space-between;font-size:12px;color:var(--tx2)"><span>{c}</span><span>{typeLabel(it.type, lang)}</span></div>
            <div><h3 style="margin:0;font-size:24px;letter-spacing:-0.02em;font-weight:600">{nm(it)}</h3><p style="margin:6px 0 0;color:var(--tx2);font-size:15px">{o === 'id' ? f.lid : f.len}</p></div>
            <div><div style="font-size:clamp(30px,3vw,38px);font-weight:600;letter-spacing:-0.03em;line-height:1">{pr(it)}</div><div style="font-size:14px;color:var(--tx2);margin-top:8px">{t.rRen}: {fmt(RENEW[c])}{lang === 'id' ? ' / tahun' : ' / year'}</div></div>
            <ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;border-top:1px solid var(--bd);padding-top:18px;font-size:15px">
              {f[o].map((x: string) => <li style="display:flex;gap:10px"><span aria-hidden="true" style="width:6px;height:6px;background:var(--tx);margin-top:9px;flex:none"></span><span>{x}</span></li>)}
            </ul>
            <p style="margin:0;font-size:13px;color:var(--tx2)">{o === 'id' ? f.xid : f.xen}</p>
            <div style="display:flex;gap:8px;margin-top:auto;flex-wrap:wrap">
              <button type="button" onClick={() => { setBase(c); go('estimator'); }} style="flex:1;font:inherit;font-weight:600;font-size:15px;min-height:44px;border:0;border-radius:6px;background:var(--inv);color:var(--invtx);cursor:pointer">{t.pkgEstimate}</button>
              <button type="button" aria-pressed={inC} onClick={() => toggleCmp(c)} style="font:inherit;font-size:14px;min-height:44px;padding:0 14px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{inC ? '✓ ' + t.cmpOn : t.cmpAdd}</button>
            </div>
          </article>); })}
      </div>
      <div style="margin-top:56px;border:1px solid var(--bd2);border-radius:12px;overflow:hidden">
        <div style="padding:22px 24px;display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center;border-bottom:1px solid var(--bd2)">
          <div><h3 style="margin:0;font-size:19px;font-weight:600">{t.cmpTitle}</h3><p style="margin:4px 0 0;font-size:14px;color:var(--tx2)" aria-live="polite">{cmp.length >= 3 ? t.cmpHintMax : t.cmpHintN.replace('{n}', String(cmp.length))}</p></div>
          <div role="group" aria-label={t.cmpTitle} style="display:flex;flex-wrap:wrap;gap:6px">
            {Object.keys(PKG).map((c) => { const on = cmp.includes(c), dis = !on && cmp.length >= 3; return <button type="button" class="chip mono" aria-pressed={on} disabled={dis} onClick={() => toggleCmp(c)} style={`font-size:12px;min-height:36px;padding:0 10px;border-radius:6px;opacity:${dis ? 0.4 : 1}`}>{c}</button>; })}
          </div>
        </div>
        <div role="region" aria-label={t.cmpTitle} tabIndex={0} style="overflow-x:auto">
          <div style="min-width:640px">
            {cmpRows.map((r) => (
              <div style="display:flex;border-bottom:1px solid var(--bd)">
                <div class="mono" style="width:180px;flex:none;padding:14px 24px;font-size:12px;line-height:1.5;color:var(--tx2);text-transform:uppercase;letter-spacing:0.03em">{r.label}</div>
                {r.cells.map((c) => <div style={`flex:1 1 0;min-width:150px;padding:14px 20px;border-left:1px solid var(--bd);font-size:15px;font-weight:${c.w}`}>{c.v}</div>)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="catalog" aria-labelledby="cat-h" class="wrap" style={SEC}>
      <div class="rule"><span>03</span><span>{t.sCatalog}</span></div>
      <div style={HEAD.replace('0 48px', '0 32px')}><h2 id="cat-h" style={H2}>{t.catTitle}</h2><p style="margin:0;color:var(--tx2);max-width:28em">{t.catSub}</p></div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
        <label style="flex:1 1 280px;display:flex;align-items:center;gap:10px;border:1px solid var(--bd2);border-radius:6px;padding:0 14px;min-height:46px;background:var(--bg)">
          <span class="mono" style="font-size:12px;color:var(--tx2)">{t.searchLabel}</span>
          <input type="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} placeholder={t.searchPh} style="flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--tx);font:inherit;font-size:16px;height:44px" />
        </label>
        <div role="group" aria-label={t.billLabel} class="seg lg">{billChips.map(([k, l]) => <button type="button" aria-pressed={bill === k} onClick={() => setBill(k)}>{l}</button>)}</div>
      </div>
      <div role="group" aria-label={t.catLabel} style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">
        {catChips.map((c) => <button type="button" class="chip" aria-pressed={cat === c.k} onClick={() => setCat(c.k)}>{c.label} <span class="n">{c.n}</span></button>)}
      </div>
      <div class="mono" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:28px 0 12px;font-size:12px;color:var(--tx2)"><span aria-live="polite">{t.results.replace('{n}', String(items.length))}</span><span>{t.priceUpdated}</span></div>
      {items.length > 0 ? (
        <div style="border-top:1px solid var(--tx)">
          {items.map((it: any) => (
            <div style="display:flex;flex-wrap:wrap;align-items:baseline;column-gap:20px;row-gap:4px;padding:14px 0;border-bottom:1px solid var(--bd)">
              <span class="mono" style="font-size:12px;color:var(--tx2);width:64px;flex:none">{it.code}</span>
              <span style="flex:1 1 220px;font-size:16px">{nm(it)} <span style="font-size:13px;color:var(--tx2);margin-left:6px">{gname(it.g)}</span></span>
              <span class="mono" style="font-size:11px;text-transform:uppercase;letter-spacing:0.04em;border:1px solid var(--bd2);border-radius:4px;padding:2px 6px;color:var(--tx2)">{typeLabel(it.type, lang)}</span>
              <span class="mono" style="font-size:14px;min-width:210px;text-align:right;margin-left:auto">{pr(it)}</span>
            </div>
          ))}
        </div>
      ) : <div style="padding:40px 0;text-align:center;color:var(--tx2)">{t.empty} <button type="button" class="lnk" onClick={() => { setCat('all'); setBill('all'); setQ(''); }}>{t.reset}</button></div>}
      <div style="margin-top:24px"><a href={page(lang, 'Pricing')} style="font-weight:600">{t.fullPricing}</a></div>
    </section>

    <section id="estimator" aria-labelledby="est-h" class="wrap" style={SEC}>
      <div class="rule"><span>04</span><span>{t.sEstimator}</span></div>
      <div style={HEAD}><h2 id="est-h" style={H2}>{t.estTitle}</h2><p style="margin:0;color:var(--tx2);max-width:28em">{t.estSub}</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px;align-items:start">
        <div style="display:flex;flex-direction:column;gap:32px">
          <fieldset style="border:0;margin:0;padding:0">
            <legend class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:var(--tx2);margin-bottom:12px;padding:0">{t.estBase}</legend>
            <div style="border-top:1px solid var(--tx)">
              {BASES.map((c: string) => (
                <label style="display:flex;align-items:center;gap:14px;padding:13px 4px;border-bottom:1px solid var(--bd);cursor:pointer;min-height:48px">
                  <input type="radio" name="base" checked={base === c} onChange={() => setBase(c)} style="width:18px;height:18px;accent-color:var(--tx);margin:0" />
                  <span class="mono" style="font-size:12px;color:var(--tx2);width:56px">{c || '—'}</span>
                  <span style="flex:1">{c ? nm(BY[c]) : t.estNone}</span>
                  <span class="mono" style="font-size:13px;white-space:nowrap">{c ? pr(BY[c]) : ''}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset style="border:0;margin:0;padding:0">
            <legend class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:var(--tx2);margin-bottom:12px;padding:0">{t.estAdd}</legend>
            <div style="border-top:1px solid var(--tx)">
              {ADDS.map((c: string) => { const it = BY[c], incl = c === 'ADD-01' && DOMAIN_INCL.includes(base); return (
                <label style={`display:flex;align-items:center;gap:14px;padding:13px 4px;border-bottom:1px solid var(--bd);cursor:pointer;min-height:48px;opacity:${incl ? 0.55 : 1}`}>
                  <input type="checkbox" checked={incl ? true : !!add[c]} disabled={incl} onChange={() => setAdd((s) => ({ ...s, [c]: !s[c] }))} style="width:18px;height:18px;accent-color:var(--tx);margin:0" />
                  <span class="mono" style="font-size:12px;color:var(--tx2);width:56px">{c}</span>
                  <span style="flex:1">{nm(it)}<span style="display:block;font-size:13px;color:var(--tx2)">{incl ? t.estIncl : ''}</span></span>
                  <span class="mono" style="font-size:13px;white-space:nowrap;text-align:right">{incl ? '' : pr(it)}</span>
                </label>); })}
            </div>
          </fieldset>
        </div>
        <aside aria-label={t.estResult} style="position:sticky;top:88px;border:1px solid var(--tx);border-radius:12px;overflow:hidden;background:var(--bg)">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid var(--tx);flex-wrap:wrap">
            <span class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em">{t.estResult}</span>
            <span class="mono" style={`font-size:12px;padding:4px 8px;border-radius:4px;border:1px solid var(--tx);background:${quote ? 'var(--bg)' : 'var(--inv)'};color:${quote ? 'var(--tx)' : 'var(--invtx)'}`}>{quote ? t.pillQuote : t.pillFixed}</span>
          </div>
          <div aria-live="polite">
            {groups.map((g) => (
              <div style="padding:18px 20px;border-bottom:1px solid var(--bd)">
                <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline;flex-wrap:wrap"><span style="font-size:14px;color:var(--tx2)">{g.label}</span><span style="font-size:clamp(20px,2vw,26px);font-weight:600;letter-spacing:-0.02em">{g.value}</span></div>
                {g.lines.map((l) => <div class="mono" style="display:flex;justify-content:space-between;gap:12px;font-size:12px;line-height:1.6;color:var(--tx2);margin-top:4px"><span>{l.k}</span><span style="text-align:right">{l.v}</span></div>)}
              </div>
            ))}
          </div>
          <div style="padding:16px 20px;background:var(--sf);font-size:13px;color:var(--tx2);display:flex;flex-direction:column;gap:14px">
            <span>{t.estNote}</span>
            <button type="button" onClick={() => brief(base || '', (lang === 'id' ? 'Estimasi: ' : 'Estimate: ') + (summary || '—') + ' · ' + oVal)} style="font:inherit;font-weight:600;font-size:15px;min-height:46px;border:0;border-radius:6px;background:var(--inv);color:var(--invtx);cursor:pointer">{t.estSend}</button>
          </div>
        </aside>
      </div>
    </section>
  </>);
}

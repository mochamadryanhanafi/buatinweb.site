import { useState } from 'preact/hooks';
import { T } from '~/i18n/faq.js';

export default function Faq({ lang }: { lang: 'id' | 'en' }) {
  const t = T[lang];
  const [q, setQ] = useState('');
  const [tp, setTp] = useState('all');
  const [open, setOpen] = useState(0);
  const ql = q.trim().toLowerCase();
  const list = t.q.map((x: string[], i: number) => ({ i, k: x[0], q: x[1], a: x[2] }))
    .filter((x) => (tp === 'all' || x.k === tp) && (!ql || (x.q + ' ' + x.a).toLowerCase().includes(ql)));
  return (
    <div>
      <label style="display:flex;align-items:center;gap:10px;border:1px solid var(--bd2);border-radius:6px;padding:0 14px;min-height:46px">
        <span class="mono" style="font-size:12px;color:var(--tx2)">{t.search}</span>
        <input type="search" value={q} onInput={(e) => setQ((e.target as HTMLInputElement).value)} placeholder={t.searchPh} style="flex:1;min-width:0;border:0;outline:0;background:transparent;color:var(--tx);font:inherit;height:44px" />
      </label>
      <div role="group" aria-label={t.topics} style="display:flex;gap:6px;flex-wrap:wrap;margin:12px 0 28px">
        {Object.keys(t.tp).map((k) => <button type="button" class="chip" aria-pressed={tp === k} onClick={() => setTp(k)}>{t.tp[k]}</button>)}
      </div>
      <div style="border-top:1px solid var(--tx)">
        {list.map((x) => {
          const isOpen = open === x.i || !!ql;
          return (
            <div style="border-bottom:1px solid var(--bd)">
              <h2 style="margin:0"><button type="button" id={'fq-' + x.i} aria-expanded={isOpen} aria-controls={'fa-' + x.i} onClick={() => setOpen(open === x.i ? -1 : x.i)} style="width:100%;display:flex;justify-content:space-between;gap:16px;align-items:center;font:inherit;font-size:17px;font-weight:600;text-align:left;padding:18px 0;min-height:56px;border:0;background:transparent;color:var(--tx);cursor:pointer"><span><span class="mono" style="display:block;font-size:11px;color:var(--tx2);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px">{t.tp[x.k]}</span>{x.q}</span><span aria-hidden="true" class="mono" style="font-size:18px">{isOpen ? '−' : '+'}</span></button></h2>
              {isOpen && <div id={'fa-' + x.i} role="region" aria-labelledby={'fq-' + x.i} style="padding:0 0 20px;color:var(--tx2);max-width:42em;text-wrap:pretty">{x.a}</div>}
            </div>
          );
        })}
      </div>
      {list.length === 0 && <p style="color:var(--tx2);padding:32px 0">{t.empty}</p>}
    </div>
  );
}

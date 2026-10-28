import { useState } from 'preact/hooks';
import { BY, price, page, svc } from '@bw/shared';
import { T, DEMOS } from '~/i18n/portfolio.js';

export default function PortfolioGrid({ lang }: { lang: 'id' | 'en' }) {
  const t = T[lang], id = lang === 'id';
  const [f, setF] = useState('all');
  const shown = DEMOS.filter((d: any[]) => f === 'all' || d[1] === f);
  return (
    <>
      <div role="group" aria-label={t.filter} style="display:flex;gap:6px;flex-wrap:wrap;border-top:1px solid var(--tx);padding-top:16px">
        {['all', 'web', 'app', 'data'].map((k) => <button type="button" class="chip" aria-pressed={f === k} onClick={() => setF(k)}>{t[k]} <span class="n">{k === 'all' ? DEMOS.length : DEMOS.filter((d: any[]) => d[1] === k).length}</span></button>)}
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:clamp(20px,3vw,32px);margin-top:32px">
        {shown.map((d: any[]) => (
          <article style="display:flex;flex-direction:column;gap:14px">
            <div style="aspect-ratio:4/3;border:1px solid var(--bd2);border-radius:12px;background:repeating-linear-gradient(135deg,var(--sf) 0 10px,var(--bg) 10px 20px);display:flex;align-items:center;justify-content:center;position:relative">
              <span class="mono" style="position:absolute;top:12px;left:12px;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;background:var(--inv);color:var(--invtx);padding:3px 7px;border-radius:4px">{t.demo}</span>
              <span class="mono" style="position:absolute;top:12px;right:12px;font-size:11px;background:var(--bg);border:1px solid var(--bd2);padding:2px 7px;border-radius:4px">{d[0]}</span>
              <span class="mono" style="font-size:12px;color:var(--tx2);background:var(--bg);padding:4px 8px">{d[7]}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:12px;align-items:baseline"><h2 style="margin:0;font-size:19px;font-weight:600;letter-spacing:-0.01em">{id ? d[3] : d[2]}</h2><span class="mono" style="font-size:12px;color:var(--tx2);white-space:nowrap">{price(BY[d[0]], lang)}</span></div>
            <p style="margin:-6px 0 0;color:var(--tx2);font-size:15px;text-wrap:pretty">{id ? d[5] : d[4]}</p>
            <div style="display:flex;gap:6px;flex-wrap:wrap">{d[6].map((g: string) => <span class="mono" style="font-size:11px;border:1px solid var(--bd);border-radius:4px;padding:2px 6px;color:var(--tx2)">{g}</span>)}</div>
            <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:2px;font-size:15px;font-weight:600"><a href={svc(lang, d[0])}>{t.viewSvc}</a><a href={page(lang, 'Contact', { service: d[0] })}>{t.start}</a></div>
          </article>
        ))}
      </div>
    </>
  );
}

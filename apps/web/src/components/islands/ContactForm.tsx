import { useEffect, useState } from 'preact/hooks';
import { SECTIONS, ITEMS, page } from '@bw/shared';
import { validateBrief } from '@bw/shared/validate';
import { T, EMPTY } from '~/i18n/contact.js';

type L = 'id' | 'en';
type Status = 'idle' | 'submitting' | 'received' | 'validation_error' | 'unavailable' | 'rate_limited';
const API = import.meta.env.PUBLIC_API_URL || '';
const EMSG: Record<string, string> = { name: 'eName', service: 'eService', brief: 'eBrief', privacy: 'ePrivacy' };

export default function ContactForm({ lang, compact = false }: { lang: L; compact?: boolean }) {
  const t = T[lang];
  const [form, setForm] = useState<any>({ ...EMPTY });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [ref, setRef] = useState('');
  const [est, setEst] = useState('');

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    let draft: any = null;
    try { draft = JSON.parse(sessionStorage.getItem('bw-brief-draft') || 'null'); } catch {}
    setEst(compact ? '' : p.get('est') || '');
    setForm({ ...EMPTY, ...(draft || {}), service: p.get('service') || draft?.service || '' });
    // home-page islands prefill via event, then scroll to #brief
    const onB = (e: Event) => { const d = (e as CustomEvent).detail || {}; setForm((x: any) => ({ ...x, service: d.service ?? x.service, brief: d.extra ? (x.brief ? x.brief + '\n' : '') + d.extra : x.brief })); setStatus((s) => (s === 'received' ? 'idle' : s)); document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' }); };
    window.addEventListener('bw-brief', onB);
    return () => window.removeEventListener('bw-brief', onB);
  }, []);
  useEffect(() => {
    if (status === 'received') return;
    try { const f = { ...form }; delete f.privacy; sessionStorage.setItem('bw-brief-draft', JSON.stringify(f)); } catch {}
  }, [form, status]);

  const set = (k: string, v: any) => { setForm((x: any) => ({ ...x, [k]: v })); setErrors((x) => ({ ...x, [k]: undefined })); };
  const onV = (k: string) => (e: Event) => set(k, (e.target as HTMLInputElement).value);
  const onC = (k: string) => (e: Event) => set(k, (e.target as HTMLInputElement).checked);

  const submit = async (ev: Event) => {
    ev.preventDefault();
    if (status === 'submitting') return;
    const e = validateBrief(form);
    const msgs: Record<string, string> = {};
    for (const k of Object.keys(e)) msgs[k] = k === 'contact' ? (form.channel === 'email' ? t.eEmail : t.eWa) : t[EMSG[k]];
    if (Object.keys(msgs).length) {
      setErrors(msgs); setStatus('validation_error');
      const k = ['name', 'contact', 'service', 'brief', 'privacy'].find((x) => msgs[x]);
      setTimeout(() => document.getElementById('f-' + k)?.focus(), 0);
      return;
    }
    setErrors({}); setStatus('submitting');
    try {
      const r = await fetch(API + '/api/brief', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...form, locale: lang, est }) });
      if (r.status === 201) { const j = await r.json(); try { sessionStorage.removeItem('bw-brief-draft'); } catch {} setRef(j.ref); setStatus('received'); }
      else if (r.status === 429) setStatus('rate_limited');
      else if (r.status === 400) setStatus('validation_error');
      else setStatus('unavailable');
    } catch { setStatus('unavailable'); }
  };

  const al = status === 'validation_error' ? t.aVal : status === 'unavailable' ? t.aUn : status === 'rate_limited' ? t.aRl : null;
  const bc = (k: string) => errors[k] ? 'var(--err)' : 'var(--bd2)';
  const inv = (k: string) => !!errors[k];
  const busy = status === 'submitting';
  const o = lang;
  const lbl = (s: string, req = true) => <>{s} <span style="color:var(--tx2);font-weight:400">{req ? '*' : t.optional}</span></>;
  const inp = 'font:inherit;min-height:46px;padding:0 12px;border-radius:6px;background:var(--bg);color:var(--tx);border:1px solid ';

  return (
    <div style="border:1px solid var(--tx);border-radius:12px;padding:clamp(20px,3vw,32px)">
      <div role="status" aria-live="polite">
        {status === 'received' && (
          <div style="display:flex;flex-direction:column;gap:16px;padding:8px 0">
            <span class="mono" style="font-size:12px;text-transform:uppercase;letter-spacing:0.04em;color:var(--ok)">✓ {t.savedTag}</span>
            <h2 style="margin:0;font-size:28px;font-weight:600;letter-spacing:-0.02em">{t.saved}</h2>
            <p style="margin:0;color:var(--tx2)">{t.savedSub}</p>
            <div class="mono" style="display:flex;justify-content:space-between;gap:12px;border:1px solid var(--bd2);border-radius:6px;padding:14px 16px;font-size:14px"><span style="color:var(--tx2)">{t.ref}</span><span>{ref}</span></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              <a href={page(lang, 'Pricing')} style="font-size:15px;min-height:44px;padding:0 16px;display:flex;align-items:center;border:1px solid var(--bd2);border-radius:6px;text-decoration:none">{t.backPricing}</a>
              <button type="button" onClick={() => { setStatus('idle'); setRef(''); setErrors({}); setEst(''); setForm({ ...EMPTY }); }} style="font:inherit;font-size:15px;min-height:44px;padding:0 16px;border:1px solid var(--bd2);border-radius:6px;background:var(--bg);color:var(--tx);cursor:pointer">{t.another}</button>
            </div>
          </div>
        )}
        {al && (
          <div role="alert" style="border:1px solid var(--err);border-radius:6px;padding:14px 16px;margin-bottom:20px;display:flex;gap:12px;align-items:flex-start">
            <span aria-hidden="true" class="mono" style="font-weight:600;color:var(--err)">!</span>
            <div><div style="font-weight:600">{al[0]}</div><div style="font-size:14px;color:var(--tx2);margin-top:2px">{al[1]}</div></div>
          </div>
        )}
      </div>
      {status !== 'received' && (
        <form noValidate onSubmit={submit} style="display:flex;flex-direction:column;gap:20px">
          {!!est && (
            <div style="border:1px solid var(--bd2);border-radius:6px;padding:14px 16px;display:flex;flex-direction:column;gap:6px;background:var(--sf)">
              <div class="mono" style="display:flex;justify-content:space-between;gap:12px;font-size:12px;text-transform:uppercase;letter-spacing:0.04em"><span>{t.attached}</span><button type="button" class="lnk" onClick={() => setEst('')} style="text-transform:none">{t.remove}</button></div>
              <div class="mono" style="font-size:13px;line-height:1.6">{est}</div>
              <a href={page(lang, 'Estimator')} style="font-size:13px">{t.editEst}</a>
            </div>
          )}
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:20px">
            <div style="display:flex;flex-direction:column;gap:6px">
              <label for="f-name" style="font-size:14px;font-weight:600">{lbl(t.fName)}</label>
              <input id="f-name" maxLength={120} autoComplete="name" value={form.name} onInput={onV('name')} aria-invalid={inv('name')} aria-describedby="e-name" style={inp + bc('name')} />
              <span id="e-name" style="font-size:13px;color:var(--err)">{errors.name}</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px">
              <label for="f-company" style="font-size:14px;font-weight:600">{lbl(t.fCompany, false)}</label>
              <input id="f-company" maxLength={160} autoComplete="organization" value={form.company} onInput={onV('company')} style={inp + 'var(--bd2)'} />
            </div>
          </div>
          <fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:6px">
            <legend style="font-size:14px;font-weight:600;padding:0;margin-bottom:6px">{lbl(t.fChannel)}</legend>
            <div style="display:flex;gap:8px;flex-wrap:wrap">
              {[['email', 'Email'], ['whatsapp', 'WhatsApp']].map(([k, l]) => <label style={`display:flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border:1px solid ${form.channel === k ? 'var(--tx)' : 'var(--bd2)'};border-radius:6px;cursor:pointer;font-size:15px`}><input type="radio" name="channel" checked={form.channel === k} onChange={() => { set('channel', k); setErrors((x) => ({ ...x, contact: undefined })); }} style="accent-color:var(--tx);margin:0" />{l}</label>)}
            </div>
            <label for="f-contact" style="font-size:14px;margin-top:8px;color:var(--tx2)">{form.channel === 'email' ? t.fEmail : t.fWa}</label>
            <input id="f-contact" type={form.channel === 'email' ? 'email' : 'tel'} autoComplete={form.channel === 'email' ? 'email' : 'tel'} placeholder={form.channel === 'email' ? 'name@company.com' : '+62 812 3456 7890'} value={form.contact} onInput={onV('contact')} aria-invalid={inv('contact')} aria-describedby="e-contact" style={inp + bc('contact')} />
            <span id="e-contact" style="font-size:13px;color:var(--err)">{errors.contact}</span>
          </fieldset>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:20px">
            <div style="display:flex;flex-direction:column;gap:6px">
              <label for="f-service" style="font-size:14px;font-weight:600">{lbl(t.fService)}</label>
              <select id="f-service" value={form.service} onChange={onV('service')} aria-invalid={inv('service')} aria-describedby="e-service" style={'font:inherit;min-height:46px;padding:0 10px;border-radius:6px;background:var(--bg);color:var(--tx);min-width:0;border:1px solid ' + bc('service')}>
                <option value="">{t.choose}</option><option value="not-sure">{t.notSure}</option>
                {SECTIONS.map((sc: any) => <optgroup label={sc.k + ' · ' + sc[o]}>{ITEMS.filter((i: any) => i.sec === sc.k).map((i: any) => <option value={i.code}>{i.code + ' — ' + i[o]}</option>)}</optgroup>)}
              </select>
              <span id="e-service" style="font-size:13px;color:var(--err)">{errors.service}</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px">
              <label for="f-budget" style="font-size:14px;font-weight:600">{lbl(t.fBudget, false)}</label>
              <select id="f-budget" value={form.budget} onChange={onV('budget')} style={'font:inherit;min-height:46px;padding:0 10px;border-radius:6px;background:var(--bg);color:var(--tx);border:1px solid var(--bd2)'}>
                {t.budgets.map((l: string, i: number) => <option value={i ? 'b' + i : ''}>{l}</option>)}
              </select>
            </div>
          </div>
          {!compact && (
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:20px">
              <div style="display:flex;flex-direction:column;gap:6px">
                <label for="f-country" style="font-size:14px;font-weight:600">{lbl(t.fCountry, false)}</label>
                <input id="f-country" maxLength={80} autoComplete="country-name" value={form.country} onInput={onV('country')} placeholder={t.countryPh} style={inp + 'var(--bd2)'} />
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                <label for="f-deadline" style="font-size:14px;font-weight:600">{lbl(t.fDeadline, false)}</label>
                <input id="f-deadline" type="date" value={form.deadline} onInput={onV('deadline')} style={inp + 'var(--bd2)'} />
              </div>
            </div>
          )}
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;justify-content:space-between;gap:12px"><label for="f-brief" style="font-size:14px;font-weight:600">{lbl(t.fBrief)}</label><span class="mono" style="font-size:12px;color:var(--tx2)">{form.brief.length} / 3000</span></div>
            <textarea id="f-brief" rows={6} maxLength={3000} placeholder={t.fBriefPh} value={form.brief} onInput={onV('brief')} aria-invalid={inv('brief')} aria-describedby="e-brief h-brief" style={'font:inherit;padding:12px;border-radius:6px;background:var(--bg);color:var(--tx);resize:vertical;border:1px solid ' + bc('brief')}></textarea>
            <span id="h-brief" style="font-size:13px;color:var(--tx2)">{t.fBriefHint}</span>
            <span id="e-brief" style="font-size:13px;color:var(--err)">{errors.brief}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--bd);padding-top:18px">
            <label style="display:flex;gap:10px;align-items:flex-start;font-size:14px;cursor:pointer"><input id="f-privacy" type="checkbox" checked={form.privacy} onChange={onC('privacy')} aria-invalid={inv('privacy')} aria-describedby="e-privacy" style="width:18px;height:18px;margin:1px 0 0;accent-color:var(--tx);flex:none" /><span>{t.fPrivacy} <a href={page(lang, 'About') + '#privacy'}>{t.privacyLink}</a>. <span style="color:var(--tx2)">*</span></span></label>
            <span id="e-privacy" style="font-size:13px;color:var(--err)">{errors.privacy}</span>
            <label style="display:flex;gap:10px;align-items:flex-start;font-size:14px;cursor:pointer;color:var(--tx2)"><input type="checkbox" checked={form.marketing} onChange={onC('marketing')} style="width:18px;height:18px;margin:1px 0 0;accent-color:var(--tx);flex:none" /><span>{t.fMarketing}</span></label>
          </div>
          <button type="submit" disabled={busy} style={`font:inherit;font-weight:600;font-size:16px;min-height:50px;border:0;border-radius:6px;background:var(--inv);color:var(--invtx);cursor:pointer;opacity:${busy ? 0.6 : 1}`}>{busy ? t.submitting : t.submit}</button>
        </form>
      )}
    </div>
  );
}

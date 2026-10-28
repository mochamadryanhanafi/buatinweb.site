// Brief validation — single source for Contact island and API worker.
export const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,WA=/^\+[1-9]\d{7,14}$/;
export const BUDGETS=['','b1','b2','b3','b4','b5'];
/** @returns {Record<string,'name'|'contact'|'service'|'brief'|'privacy'>} error keys */
export function validateBrief(f){
  const e={},s=k=>String(f?.[k]??'');
  if(!s('name').trim()||s('name').length>120)e.name=1;
  if(f?.channel==='email'){if(!EMAIL.test(s('contact').trim()))e.contact=1;}
  else if(f?.channel==='whatsapp'){if(!WA.test(s('contact').replace(/[\s\-()]/g,'')))e.contact=1;}
  else e.contact=1;
  if(!s('service'))e.service=1;
  const b=s('brief').trim();if(b.length<20||b.length>3000)e.brief=1;
  if(f?.privacy!==true)e.privacy=1;
  return e;
}

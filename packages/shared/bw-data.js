// Buatinweb shared data — helpers + re-exports. Edit prices.js to update the catalog.
export { VERSION, GROUPS, SECTIONS, ITEMS, RENEW } from './prices.js';
import { SECTIONS, ITEMS, RENEW } from './prices.js';

export const BY=Object.fromEntries(ITEMS.map(i=>[i.code,i]));
export const groupOf=code=>SECTIONS.find(s=>s.k===BY[code].sec).g;
export function fmt(n,L){return L==='id'?'Rp'+n.toLocaleString('id-ID'):'IDR '+n.toLocaleString('en-US');}
export function price(it,L){const id=L==='id';let s;
 if(it.type==='q')s=id?'Quotation':'Quotation';else if(it.type==='a')s=id?'Biaya aktual':'Actual cost';
 else if(it.type==='r')s=fmt(it.p,L)+'–'+fmt(it.max,L).replace(/^(Rp|IDR )/,'');
 else s=(it.type==='s'?(id?'Mulai ':'From '):'')+fmt(it.p,L);
 if(it.bill==='m')s+=id?' / bulan':' / month';if(it.bill==='y')s+=id?' / tahun':' / year';return s;}
export function typeLabel(t,L){return (L==='id'?{f:'Tetap',s:'Mulai',r:'Rentang',q:'Quotation',a:'Aktual'}:{f:'Fixed',s:'From',r:'Range',q:'Quote',a:'Actual'})[t];}
export function renewLabel(code,L){const r=RENEW[code];if(!r)return '';return (r.from?(L==='id'?'Mulai ':'From '):'')+fmt(r.p,L)+(L==='id'?' / tahun':' / year');}

export const SLUG={Home:"",Service:"services",Pricing:"pricing",Estimator:"estimator",Portfolio:"portfolio",About:"about",FAQ:"faq",Contact:"contact"};
export function page(L,name,q){return "/"+L+"/"+SLUG[name]+(q?"?"+new URLSearchParams(q):"");}
export function svc(L,code){return "/"+L+"/services/"+code.toLowerCase()+"/";}

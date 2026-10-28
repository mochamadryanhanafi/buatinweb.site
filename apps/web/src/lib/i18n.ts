export type L = 'id' | 'en';
export const LOCALES: L[] = ['id', 'en'];
export const paths = () => LOCALES.map(lang => ({ params: { lang } }));
export const pick = <T,>(L: L, t: { id: T; en: T }) => t[L];

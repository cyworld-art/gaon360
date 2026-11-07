"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { L, Lang } from './content';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (v: L) => string };
const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {}, tr: v => v.ko });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ko');
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('gv360-lang');
      if (saved === 'ko' || saved === 'en') setLangState(saved);
    } catch { /* storage unavailable */ }
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem('gv360-lang', l); } catch { /* ignore */ }
  }, []);
  const tr = useCallback((v: L) => v[lang], [lang]);
  return <LangContext.Provider value={{ lang, setLang, tr }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

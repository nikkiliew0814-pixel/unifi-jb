"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "./i18n";

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; }
const Ctx = createContext<LangCtx>({ lang: "ENG", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ENG");
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

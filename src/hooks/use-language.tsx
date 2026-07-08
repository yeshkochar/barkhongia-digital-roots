import React, { useState, useEffect, createContext, useContext } from "react";
import { setGlobalLanguage } from "@/lib/language-state";
import { translations } from "@/lib/translations";

type Language = "en" | "as";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  triggerUpdate: () => void;
  updateCount: number;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  triggerUpdate: () => {},
  updateCount: 0,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLang] = useState<Language>("en");
  const [updateCount, setUpdateCount] = useState(0);

  // Load language preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved === "en" || saved === "as") {
      setLang(saved);
      setGlobalLanguage(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLang(lang);
    setGlobalLanguage(lang);
    localStorage.setItem("preferred_language", lang);
  };

  const triggerUpdate = () => {
    setUpdateCount((c) => c + 1);
  };

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const dict = translations[language] || translations["en"];
    let text = (dict as any)[key] || (translations["en"] as any)[key] || key;

    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, triggerUpdate, updateCount }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

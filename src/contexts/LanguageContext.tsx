import { createContext, useContext, useState, ReactNode } from "react";
import en from "../translations/en";
import lt from "../translations/lt";

type Language = "en" | "lt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const translations = {
  en,
  lt,
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem("language");
    return (saved === "lt" ? "lt" : "en") as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    
    // Navigate through nested object using dot notation
    const keys = key.split(".");
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


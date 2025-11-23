import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "lt" : "en")}
      className="font-mono text-sm font-bold hover:bg-accent"
    >
      {language === "en" ? "EN" : "LT"}
      <span className="mx-1">|</span>
      <span className="text-muted-foreground">
        {language === "en" ? "LT" : "EN"}
      </span>
    </Button>
  );
};


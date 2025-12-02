import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PromoCardProps {
  onClick?: () => void;
}

export const PromoCard = ({ onClick }: PromoCardProps) => {
  const { t } = useLanguage();

  return (
    <Card className="manga-panel rounded-none bg-accent text-accent-foreground border-accent-foreground overflow-hidden relative">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon Section */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 border-3 border-accent-foreground flex items-center justify-center bg-background">
              <Gift className="w-10 h-10 md:w-12 md:h-12 text-foreground" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow text-center md:text-left">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 border-2 border-accent-foreground bg-background text-foreground text-xs font-bold uppercase tracking-wide">
                {t("promotion.promoCard.title")}
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold uppercase mb-2">
              {t("promotion.promoCard.mainText")}
            </h3>
            
            <div className="mb-3">
              <span className="text-4xl md:text-5xl font-black uppercase tracking-tight inline-block border-b-4 border-accent-foreground">
                {t("promotion.promoCard.highlightText")}
              </span>
            </div>

            <p className="text-sm md:text-base mb-4 opacity-90">
              {t("promotion.promoCard.description")}
            </p>

            {onClick && (
              <Button 
                onClick={onClick}
                size="lg"
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 border-2 border-accent-foreground rounded-none font-bold uppercase"
              >
                {t("promotion.promoCard.cta")}
              </Button>
            )}

            <p className="text-xs mt-3 opacity-70 font-mono">
              {t("promotion.promoCard.terms")}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-2 right-2 w-16 h-16 border-2 border-accent-foreground/30" />
          <div className="absolute bottom-2 left-2 w-12 h-12 border-2 border-accent-foreground/30 rotate-45" />
        </div>
      </CardContent>
    </Card>
  );
};


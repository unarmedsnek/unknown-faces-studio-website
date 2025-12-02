import { useState } from "react";
import { Link } from "react-router-dom";
import { Gift, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const FloatingPromoBadge = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
      <Link to="/booking">
        <div
          className="relative manga-panel rounded-none bg-accent text-accent-foreground cursor-pointer transition-all duration-300 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background border-2 border-foreground flex items-center justify-center hover:bg-destructive hover:border-destructive transition-colors"
            aria-label="Close promotion"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Badge content */}
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 border-2 border-accent-foreground bg-background flex items-center justify-center">
                <Gift className="w-5 h-5 text-foreground" />
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-xs font-mono uppercase opacity-75">
                {t("promotion.promoCard.title")}
              </div>
              <div className="text-lg font-black uppercase tracking-tight leading-tight">
                {t("promotion.floatingBadge")}
              </div>
            </div>
          </div>

          {/* Expanded tooltip on hover */}
          {isHovered && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-background text-foreground border-2 border-foreground p-3 shadow-[4px_4px_0_hsl(var(--foreground))]">
              <p className="text-sm font-bold mb-1">{t("promotion.promoCard.mainText")}</p>
              <p className="text-xs">{t("promotion.promoCard.description")}</p>
              <div className="mt-2">
                <Button size="sm" className="w-full rounded-none text-xs font-bold uppercase">
                  {t("promotion.promoCard.cta")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Custom animation */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};


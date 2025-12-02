import { useLanguage } from "@/contexts/LanguageContext";

export const PromoBanner = () => {
  const { t } = useLanguage();

  const bannerText = t("promotion.bannerText");

  return (
    <div className="w-full border-y-2 border-foreground bg-accent text-accent-foreground py-4 overflow-hidden relative">
      {/* Scrolling text container */}
      <div className="flex animate-scroll whitespace-nowrap">
        {/* Repeat the text multiple times for continuous effect */}
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center mx-8">
            <span className="text-xl md:text-2xl font-black uppercase tracking-wider">
              {bannerText}
            </span>
            <span className="mx-8 text-2xl">★</span>
          </div>
        ))}
      </div>

      {/* Add the keyframe animation to the component */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};


import { Youtube, Instagram, Facebook, Send } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/channel/UCPBinwqK0M6lQ_ifx7BU5fA", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/unknownfacesofficial/?hl=en", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/unknownfaceso?locale=lt_LT", label: "Facebook" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@unknownfaces38", label: "TikTok" },
  { icon: Send, href: "https://t.me/UFOSTUDIJA", label: "Telegram" },
];

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="border-t-2 border-foreground bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Studio Name */}
          <h3 className="text-xl font-bold tracking-tight">UNKNOWN FACES</h3>
          
          {/* Social Icons */}
          <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground transition-colors hover:text-muted"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-[2px] w-32 bg-border" />

          {/* Copyright */}
          <p className="font-mono text-sm">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

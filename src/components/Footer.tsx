import { Link } from "react-router-dom";
import { Youtube, Instagram, Facebook, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Custom icons matching lucide-react style
const TikTok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88 2.11V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Discord = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/channel/UCPBinwqK0M6lQ_ifx7BU5fA", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/unknownfacesofficial/?hl=en", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/unknownfaceso?locale=lt_LT", label: "Facebook" },
  { icon: TikTok, href: "https://www.tiktok.com/@unknownfaces38", label: "TikTok" },
  { icon: Send, href: "https://t.me/UFOSTUDIJA", label: "Telegram" },
  { icon: Discord, href: "https://discord.gg/XY5kYjk4", label: "Discord" },
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

          {/* Rules Link */}
          <Link
            to="/rules"
            className="font-mono text-sm text-secondary-foreground hover:underline hover:brightness-75 transition-all"
          >
            {t("footer.rules")}
          </Link>

          {/* Copyright */}
          <p className="font-mono text-xs text-secondary-foreground/70 mt-2">
            {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

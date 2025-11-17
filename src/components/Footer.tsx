import { Youtube, Instagram, Facebook, Send } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const socialLinks = [
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
  { icon: Send, href: "#", label: "Telegram" },
];

export const Footer = () => {
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
            © {new Date().getFullYear()} Unknown Faces. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

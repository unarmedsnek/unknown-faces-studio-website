import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Youtube, Instagram, Facebook, Send } from "lucide-react";
import { FaTiktok, FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/channel/UCPBinwqK0M6lQ_ifx7BU5fA", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/unknownfacesofficial/?hl=en", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/unknownfaceso?locale=lt_LT", label: "Facebook" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@unknownfaces38", label: "TikTok" },
  { icon: Send, href: "https://t.me/UFOSTUDIJA", label: "Telegram" },
  { icon: FaDiscord, href: "https://discord.gg/XY5kYjk4", label: "Discord" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.booking"), href: "/booking" },
    { name: t("nav.faq"), href: "/faq" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.location"), href: "/location" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          <div className="border-2 border-foreground px-3 py-1">
            UNKNOWN FACES OFFICIAL
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isActive(item.href)
                  ? "border-b-2 border-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Language Switcher & Social Icons */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-4">
          <LanguageSwitcher />
          <div className="h-6 w-[2px] bg-border" />
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-secondary"
                aria-label={social.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-l-2 border-foreground">
            <div className="flex flex-col gap-6 py-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    isActive(item.href)
                      ? "text-foreground border-b-2 border-foreground pb-1"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t-2 border-border pt-6">
                <div className="mb-4">
                  <LanguageSwitcher />
                </div>
              </div>
              <div className="flex gap-4 border-t-2 border-border pt-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground"
                      aria-label={social.label}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

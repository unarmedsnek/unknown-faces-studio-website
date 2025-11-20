import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Youtube, Instagram, Facebook, Send } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Booking", href: "/booking" },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" },
  { name: "Where to Find Us", href: "/location" },
];

const socialLinks = [
  { icon: Youtube, href: "https://www.youtube.com/channel/UCPBinwqK0M6lQ_ifx7BU5fA", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/unknownfacesofficial/?hl=en", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/unknownfaceso?locale=lt_LT", label: "Facebook" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@unknownfaces38", label: "TikTok" },
  { icon: Send, href: "#", label: "Telegram" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          <div className="border-2 border-foreground px-3 py-1">
            UNKNOWN FACES
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

        {/* Desktop Social Icons */}
        <div className="hidden lg:flex lg:gap-x-4">
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
              <div className="mt-4 flex gap-4 border-t-2 border-border pt-6">
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

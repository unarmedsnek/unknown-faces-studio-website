import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PromoBanner } from "@/components/PromoBanner";
import { FloatingPromoBadge } from "@/components/FloatingPromoBadge";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handlePackageClick = () => {
    navigate("/booking");
  };

  const packages: PackageData[] = [
    {
      name: t("booking.packages.twoHour.name"),
      price: "20€",
      duration: t("booking.packages.twoHour.duration"),
      description: t("booking.packages.twoHour.description"),
    },
    {
      name: t("booking.packages.fourHour.name"),
      price: "40€",
      duration: t("booking.packages.fourHour.duration"),
      description: t("booking.packages.fourHour.description"),
    },
    {
      name: t("booking.packages.sixHour.name"),
      price: "60€",
      duration: t("booking.packages.sixHour.duration"),
      description: t("booking.packages.sixHour.description"),
    },
  ];
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-foreground bg-accent">
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              {/* Logo Image */}
              <div className="mb-8 flex justify-center">
                <img 
                  src="/unknown_faces_logo 512x512.png"
                  alt="Unknown Faces Official Logo"
                  className="h-32 w-32 lg:h-48 lg:w-48 object-contain"
                />
              </div>
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-accent-foreground lg:text-7xl uppercase">
                {t("home.hero.title")}
              </h1>
              <p className="mb-8 text-xl text-accent-foreground lg:text-2xl font-mono">
                {t("home.hero.subtitle")}
              </p>
              <Button asChild size="lg" className="text-lg font-bold bg-accent-foreground text-accent border-accent-foreground">
                <Link to="/booking">
                  {t("home.hero.bookNow")}
                </Link>
              </Button>
            </div>
            
            {/* Geometric manga panels */}
            <div className="absolute left-10 top-10 h-32 w-32 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)] pointer-events-none" />
            <div className="absolute right-20 bottom-20 h-24 w-48 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)] pointer-events-none" />
            <div className="absolute left-1/4 bottom-10 h-16 w-16 rotate-45 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)] pointer-events-none" />
          </div>
        </section>

        {/* Studio Images Section */}
        <section className="border-b-2 border-foreground py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-4xl font-bold">
              <span className="manga-caption-strip">{t("home.studio.title")}</span>
            </h2>
            
            {/* Image + Text alternating layout */}
            <div className="space-y-16">
              {/* First Row: Image Left, Text Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="manga-panel aspect-[3/2] rounded-none overflow-hidden">
                  <img 
                    src="/images/studio/studija-1.jpg" 
                    alt="Professional recording equipment" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="manga-panel space-y-4 p-6 rounded-none">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">{t("home.studio.professional.title")}</h3>
                  <p className="text-foreground/80">
                    {t("home.studio.professional.description")}
                  </p>
                </div>
              </div>

              {/* Second Row: Text Left, Image Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="manga-panel space-y-4 p-6 rounded-none lg:order-1">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">{t("home.studio.creative.title")}</h3>
                  <p className="text-foreground/80">
                    {t("home.studio.creative.description")}
                  </p>
                </div>
                <div className="manga-panel aspect-[3/2] rounded-none overflow-hidden lg:order-2">
                  <img 
                    src="/images/studio/studija-7.jpg" 
                    alt="Creative recording space" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Preview Section */}
        <section className="border-b-2 border-foreground bg-background py-16 overflow-visible">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">
                <span className="manga-caption-strip">{t("home.packages.title")}</span>
              </h2>
              <p className="text-muted-foreground font-mono text-sm">{t("home.packages.subtitle")}</p>
            </div>
            
            <div className="px-4 py-2">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <PackageCard key={pkg.name} package={pkg} onClick={handlePackageClick} />
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline">
                <Link to="/booking">
                  {t("home.packages.viewAll")}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <PromoBanner />

        {/* Instagram Section */}
        <section className="border-b-2 border-foreground py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-4xl font-bold">
              <span className="manga-caption-strip">{t("home.instagram.title")}</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {[
                "https://www.instagram.com/p/C8KTNkSsroG/?hl=en",
                null, // Add links here when you add more images
                null,
                null,
                null,
                null,
              ].map((instagramLink, i) => {
                const imageNumber = i + 1;
                const hasImage = imageNumber === 1; // Update this when you add more images
                
                return (
                  <div
                    key={imageNumber}
                    className="manga-panel aspect-square rounded-none overflow-hidden"
                  >
                    {hasImage && instagramLink ? (
                      <a
                        href={instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                      >
                        <img 
                          src={`/images/instagram/instagram-${imageNumber}.jpg`}
                          alt={`Unknown Faces Studio - ${t("home.instagram.post")} ${imageNumber}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </a>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-mono text-sm text-muted-foreground">
                          {t("home.instagram.post")} {imageNumber}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lg relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {t("home.instagram.handle")}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-8 text-4xl font-bold">
              <span className="manga-caption-strip">{t("home.about.title")}</span>
            </h2>
            <div className="manga-panel p-8 rounded-none">
              <p className="mb-4 text-lg text-foreground/80">
                {t("home.about.description1")}
              </p>
              <p className="mb-4 text-lg text-foreground/80">
                {t("home.about.description2")}
              </p>
              <p className="mb-4 text-lg text-foreground/80">
                {t("home.about.description3")}
              </p>
              <p className="text-lg text-foreground/80">
                {t("home.about.description4")}
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link to="/about">
                  {t("home.about.learnMore")}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingPromoBadge />
    </div>
  );
}

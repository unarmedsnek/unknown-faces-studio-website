import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("privacy.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("privacy.subtitle")}
            </p>
          </div>

          <Card className="manga-panel rounded-none">
            <CardContent className="p-8 space-y-8">
              {/* General Information */}
              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.general.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.general.description")}
                </p>
              </section>

              {/* Data Controller */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.dataController.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.dataController.description")}
                </p>
              </section>

              {/* Data Collection */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.dataCollection.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.dataCollection.description")}
                </p>
              </section>

              {/* Data Usage */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.dataUsage.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.dataUsage.description")}
                </p>
              </section>

              {/* Data Protection */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.dataProtection.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.dataProtection.description")}
                </p>
              </section>

              {/* Your Rights */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.yourRights.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.yourRights.description")}
                </p>
              </section>

              {/* Contact */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("privacy.contact.title")}
                </h2>
                <p className="text-foreground/80">
                  {t("privacy.contact.description")}
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

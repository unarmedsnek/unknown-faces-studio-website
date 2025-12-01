import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Rules() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("rules.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("rules.subtitle")}
            </p>
          </div>

          <Card className="manga-panel rounded-none">
            <CardContent className="p-8 space-y-8">
              {/* General Rules */}
              <section>
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("rules.general.title")}
                </h2>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <span>{t("rules.general.rule1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>{t("rules.general.rule2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <span>{t("rules.general.rule3")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">4.</span>
                    <span>{t("rules.general.rule4")}</span>
                  </li>
                </ul>
              </section>

              {/* Equipment Rules */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("rules.equipment.title")}
                </h2>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <span>{t("rules.equipment.rule1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>{t("rules.equipment.rule2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <span>{t("rules.equipment.rule3")}</span>
                  </li>
                </ul>
              </section>

              {/* Booking & Cancellation */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("rules.booking.title")}
                </h2>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <span>{t("rules.booking.rule1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>{t("rules.booking.rule2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <span>{t("rules.booking.rule3")}</span>
                  </li>
                </ul>
              </section>

              {/* Conduct */}
              <section className="border-t-2 border-border pt-8">
                <h2 className="text-2xl font-bold mb-4 uppercase tracking-wide">
                  {t("rules.conduct.title")}
                </h2>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <span>{t("rules.conduct.rule1")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <span>{t("rules.conduct.rule2")}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <span>{t("rules.conduct.rule3")}</span>
                  </li>
                </ul>
              </section>

              {/* Important Note */}
              <div className="bg-accent p-6 border-2 border-foreground mt-8">
                <p className="text-sm font-semibold mb-2 uppercase tracking-wide text-accent-foreground">
                  {t("rules.note.title")}
                </p>
                <p className="text-sm text-accent-foreground/80">
                  {t("rules.note.description")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

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
            <CardContent className="p-8 space-y-6">
              {/* Header */}
              <section className="text-center border-b-2 border-border pb-6">
                <h2 className="text-2xl font-bold mb-2">{t("rules.header.title")}</h2>
                <p className="text-lg font-semibold">{t("rules.header.location")}</p>
              </section>

              {/* Service Provider */}
              <section>
                <h3 className="text-xl font-bold mb-3">{t("rules.provider.title")}</h3>
                <div className="space-y-1 text-foreground/80">
                  <p><strong>{t("rules.provider.name")}:</strong> {t("rules.provider.nameValue")}</p>
                  <p><strong>{t("rules.provider.address")}:</strong> {t("rules.provider.addressValue")}</p>
                  <p><strong>{t("rules.provider.email")}:</strong> {t("rules.provider.emailValue")}</p>
                  <p><strong>{t("rules.provider.phone")}:</strong> {t("rules.provider.phoneValue")}</p>
                </div>
              </section>

              {/* Client Definition */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.client.title")}</h3>
                <p className="text-foreground/80">{t("rules.client.definition")}</p>
              </section>

              {/* Contract Subject */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.subject.title")}</h3>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>2.1.</strong> {t("rules.subject.point1")}</p>
                  <p><strong>2.2.</strong> {t("rules.subject.point2")}</p>
                  <p><strong>2.3.</strong> {t("rules.subject.point3")}</p>
                </div>
              </section>

              {/* Reservation and Payment */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.reservation.title")}</h3>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>3.1.</strong> {t("rules.reservation.point1")}</p>
                  <p><strong>3.2.</strong> {t("rules.reservation.point2")}</p>
                  <p><strong>3.3.</strong> {t("rules.reservation.point3")}</p>
                </div>
              </section>

              {/* Usage Rules */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.usage.title")}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-bold mb-2">4.1. {t("rules.usage.prohibited.title")}</p>
                    <ul className="space-y-2 ml-6 text-foreground/80">
                      <li>• {t("rules.usage.prohibited.animals")}</li>
                      <li>• {t("rules.usage.prohibited.effects")}</li>
                      <li>• {t("rules.usage.prohibited.noise")}</li>
                      <li>• {t("rules.usage.prohibited.weapons")}</li>
                      <li>• {t("rules.usage.prohibited.parties")}</li>
                      <li>• {t("rules.usage.prohibited.fire")}</li>
                      <li>• {t("rules.usage.prohibited.settings")}</li>
                    </ul>
                  </div>
                  <p className="text-foreground/80"><strong>4.2.</strong> {t("rules.usage.maxPeople")}</p>
                  <p className="text-foreground/80"><strong>4.3.</strong> {t("rules.usage.properUse")}</p>
                  <p className="text-foreground/80"><strong>4.4.</strong> {t("rules.usage.cleanliness")}</p>
                  <p className="text-foreground/80"><strong>4.5.</strong> {t("rules.usage.ventilation")}</p>
                </div>
              </section>

              {/* Liability and Fines */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.liability.title")}</h3>
                <div className="space-y-4">
                  <p className="text-foreground/80"><strong>5.1.</strong> {t("rules.liability.point1")}</p>
                  <p className="text-foreground/80"><strong>5.2.</strong> {t("rules.liability.point2")}</p>
                  <div>
                    <p className="font-bold mb-2">5.3. {t("rules.liability.fines.title")}</p>
                    <ul className="space-y-2 ml-6 text-foreground/80">
                      <li>• {t("rules.liability.fines.smoking")}</li>
                      <li>• {t("rules.liability.fines.substances")}</li>
                      <li>• {t("rules.liability.fines.late")}</li>
                      <li>• {t("rules.liability.fines.cleaning")}</li>
                    </ul>
                  </div>
                  <p className="text-foreground/80"><strong>5.4.</strong> {t("rules.liability.point4")}</p>
                </div>
              </section>

              {/* Video Surveillance */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.surveillance.title")}</h3>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>6.1.</strong> {t("rules.surveillance.point1")}</p>
                  <p><strong>6.2.</strong> {t("rules.surveillance.point2")}</p>
                  <p><strong>6.3.</strong> {t("rules.surveillance.point3")}</p>
                </div>
              </section>

              {/* Electronic Confirmation */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.confirmation.title")}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2"><strong>7.1.</strong> {t("rules.confirmation.checkbox.intro")}</p>
                    <ul className="space-y-1 ml-6 text-foreground/80">
                      <li>- {t("rules.confirmation.checkbox.point1")}</li>
                      <li>- {t("rules.confirmation.checkbox.point2")}</li>
                      <li>- {t("rules.confirmation.checkbox.point3")}</li>
                      <li>- {t("rules.confirmation.checkbox.point4")}</li>
                    </ul>
                  </div>
                  <p className="text-foreground/80"><strong>7.2.</strong> {t("rules.confirmation.legalForce")}</p>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.disputes.title")}</h3>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>8.1.</strong> {t("rules.disputes.point1")}</p>
                  <p><strong>8.2.</strong> {t("rules.disputes.point2")}</p>
                  <p><strong>8.3.</strong> {t("rules.disputes.point3")}</p>
                </div>
              </section>

              {/* Final Provisions */}
              <section className="border-t-2 border-border pt-6">
                <h3 className="text-xl font-bold mb-3">{t("rules.final.title")}</h3>
                <div className="space-y-3 text-foreground/80">
                  <p><strong>9.1.</strong> {t("rules.final.point1")}</p>
                  <p><strong>9.2.</strong> {t("rules.final.point2")}</p>
                  <p><strong>9.3.</strong> {t("rules.final.point3")}</p>
                </div>
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

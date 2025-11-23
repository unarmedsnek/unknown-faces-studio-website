import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhereToFindUs() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("location.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("location.subtitle")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">{t("location.address.title")}</h3>
                      <p className="text-foreground/80 font-mono text-sm">
                        {t("location.address.line1")}<br />
                        {t("location.address.line2")}<br />
                        {t("location.address.line3")}<br />
                        {t("location.address.line4")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">{t("location.hours.title")}</h3>
                      <div className="space-y-1 text-foreground/80 font-mono text-sm">
                        <p>{t("location.hours.weekdays")}</p>
                        <p>{t("location.hours.saturday")}</p>
                        <p>{t("location.hours.sunday")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">{t("location.email.title")}</h3>
                      <a href="mailto:unknownfacesnotes@gmail.com" className="text-foreground/80 hover:underline font-mono text-sm">unknownfacesnotes@gmail.com</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">{t("location.phone.title")}</h3>
                      <a href="tel:+37060623373" className="text-foreground/80 hover:underline font-mono text-sm">+370 606 23373</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Google Maps Embed */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Card className="overflow-hidden border-2 border-foreground shadow-lg">
                <CardContent className="p-0">
                  {/* TODO: Replace src URL with your Google Maps embed URL */}
                  {/* To get your embed URL: 
                      1. Go to https://www.google.com/maps
                      2. Search for your address
                      3. Click "Share" button
                      4. Click "Embed a map"
                      5. Copy the iframe src URL and paste it below
                  */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d143.39365979422985!2d23.902043599994254!3d54.89768185880519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e7220c635b38db%3A0xe1fbe336070661e!2sLaisv%C4%97s%20al.%2099%2C%20Kaunas%2C%2044291%20Kauno%20m.%20sav.%2C%20Lithuania!5e0!3m2!1sen!2sde!4v1763639697932!5m2!1sen!2sde"
                    width="100%"
                    height="600"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio Location Map"
                  />
                  <div className="p-4 bg-muted border-t-2 border-foreground">
                    <p className="text-xs text-center text-muted-foreground font-mono">
                      {t("location.mapNote")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Directions */}
          <section className="mt-12">
            <Card className="border-2 border-foreground bg-muted shadow-none">
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold">{t("location.directions.title")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">{t("location.directions.car.title")}</strong> {t("location.directions.car.description")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("about.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("about.subtitle")}
            </p>
          </div>

          <div className="space-y-16">
            {/* Main Text Block */}
            <section className="prose prose-lg mx-auto max-w-3xl manga-panel rounded-none p-8">
              <p className="text-lg leading-relaxed text-foreground/80">
                {t("about.intro1")}
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                {t("about.intro2")}
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                {t("about.intro3")}
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                {t("about.intro4")}
              </p>
            </section>

            {/* Studio Image 1 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="manga-panel aspect-[3/2] rounded-none overflow-hidden">
                <img 
                  src="/images/studio/atlikejas-3.jpg" 
                  alt="Our studio philosophy: Professional equipment and dedicated approach" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="manga-panel space-y-4 p-6 rounded-none">
                <h2 className="text-3xl font-bold uppercase tracking-wide">{t("about.philosophy.title")}</h2>
                <p className="text-foreground/80">
                  {t("about.philosophy.description")}
                </p>
              </div>
            </section>

            {/* Studio Image 2 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="manga-panel space-y-4 p-6 rounded-none lg:order-2">
                <h2 className="text-3xl font-bold uppercase tracking-wide">{t("about.space.title")}</h2>
                <p className="text-foreground/80">
                  {t("about.space.description")}
                </p>
              </div>
              <div className="manga-panel aspect-[3/2] rounded-none overflow-hidden lg:order-1">
                <img 
                  src="/images/studio/studija-4.jpg" 
                  alt="Our studio space: Acoustically treated rooms and creative atmosphere" 
                  className="w-full h-full object-cover"
                />
              </div>
            </section>

            {/* Mission Statement */}
            <section className="manga-panel rounded-none bg-accent p-8 lg:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold text-accent-foreground uppercase tracking-wide">{t("about.mission.title")}</h2>
                <p className="text-lg text-accent-foreground">
                  "{t("about.mission.quote")}"
                </p>
              </div>
            </section>

            {/* Team/Values */}
            <section className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold">
                <span className="manga-caption-strip">{t("about.values.title")}</span>
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">{t("about.values.quality.title")}</h3>
                  <p className="text-sm text-foreground/80">
                    {t("about.values.quality.description")}
                  </p>
                </div>
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">{t("about.values.accessibility.title")}</h3>
                  <p className="text-sm text-foreground/80">
                    {t("about.values.accessibility.description")}
                  </p>
                </div>
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">{t("about.values.community.title")}</h3>
                  <p className="text-sm text-foreground/80">
                    {t("about.values.community.description")}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

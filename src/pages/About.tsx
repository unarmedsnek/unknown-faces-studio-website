import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center motion-lines py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">About Unknown Faces</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              Our mission, our story, our sound
            </p>
          </div>

          <div className="space-y-16">
            {/* Main Text Block */}
            <section className="prose prose-lg mx-auto max-w-3xl manga-panel rounded-none p-8">
              <p className="text-lg leading-relaxed text-foreground/80">
                Unknown Faces is more than just a recording studio—it's a creative sanctuary where artists transform their vision into reality. Founded with the belief that every voice deserves to be heard, we've built a space that combines professional-grade equipment with a welcoming, artist-first atmosphere.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                Our studio was born from a simple idea: to bridge the gap between unknown artists and their dreams of becoming known. We understand the challenges emerging artists face, and we're dedicated to providing accessible, high-quality recording services that don't compromise on excellence.
              </p>
              <p className="text-lg leading-relaxed text-foreground/80 mt-4">
                Whether you're recording your first demo or your tenth album, our team brings the same level of passion and expertise to every project. We believe in collaboration, creativity, and the power of music to connect people.
              </p>
            </section>

            {/* Studio Image 1 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="manga-panel aspect-video rounded-none" />
              <div className="manga-panel space-y-4 p-6 rounded-none">
                <h2 className="text-3xl font-bold uppercase tracking-wide">Our Philosophy</h2>
                <p className="text-foreground/80">
                  We believe in treating every artist and every project with respect and dedication. Our approach is collaborative—we work with you to capture the exact sound you're hearing in your head. No cookie-cutter solutions, just authentic artistry.
                </p>
              </div>
            </section>

            {/* Studio Image 2 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="manga-panel space-y-4 p-6 rounded-none lg:order-2">
                <h2 className="text-3xl font-bold uppercase tracking-wide">The Space</h2>
                <p className="text-foreground/80">
                  Our studio features acoustically treated recording rooms, a comfortable lounge area, and state-of-the-art equipment. We've designed every aspect of the space to inspire creativity and capture pristine audio quality.
                </p>
              </div>
              <div className="manga-panel aspect-video rounded-none lg:order-1" />
            </section>

            {/* Mission Statement */}
            <section className="manga-panel rounded-none bg-accent p-8 lg:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold text-accent-foreground uppercase tracking-wide">Our Mission</h2>
                <p className="text-lg text-accent-foreground">
                  "To empower artists at every stage of their journey by providing professional recording services in an environment that values creativity, authenticity, and artistic growth. From unknown to known—we're here for every step of your musical evolution."
                </p>
              </div>
            </section>

            {/* Team/Values */}
            <section className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold">
                <span className="manga-caption-strip">What We Stand For</span>
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">Quality</h3>
                  <p className="text-sm text-foreground/80">
                    Professional equipment and experienced engineers ensure every recording meets industry standards.
                  </p>
                </div>
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">Accessibility</h3>
                  <p className="text-sm text-foreground/80">
                    Flexible packages and pricing make professional recording attainable for artists at all levels.
                  </p>
                </div>
                <div className="manga-panel space-y-2 p-6 rounded-none">
                  <h3 className="text-xl font-bold uppercase tracking-wide">Community</h3>
                  <p className="text-sm text-foreground/80">
                    We're building a supportive community of artists who inspire and elevate each other.
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

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold">About Unknown Faces</h1>
            <p className="text-xl text-muted-foreground">
              Our mission, our story, our sound
            </p>
          </div>

          <div className="space-y-16">
            {/* Main Text Block */}
            <section className="prose prose-lg mx-auto max-w-3xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Unknown Faces is more than just a recording studio—it's a creative sanctuary where artists transform their vision into reality. Founded with the belief that every voice deserves to be heard, we've built a space that combines professional-grade equipment with a welcoming, artist-first atmosphere.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our studio was born from a simple idea: to bridge the gap between unknown artists and their dreams of becoming known. We understand the challenges emerging artists face, and we're dedicated to providing accessible, high-quality recording services that don't compromise on excellence.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Whether you're recording your first demo or your tenth album, our team brings the same level of passion and expertise to every project. We believe in collaboration, creativity, and the power of music to connect people.
              </p>
            </section>

            {/* Studio Image 1 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="manga-panel aspect-video bg-muted" />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Philosophy</h2>
                <p className="text-muted-foreground">
                  We believe in treating every artist and every project with respect and dedication. Our approach is collaborative—we work with you to capture the exact sound you're hearing in your head. No cookie-cutter solutions, just authentic artistry.
                </p>
              </div>
            </section>

            {/* Studio Image 2 */}
            <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4 lg:order-2">
                <h2 className="text-3xl font-bold">The Space</h2>
                <p className="text-muted-foreground">
                  Our studio features acoustically treated recording rooms, a comfortable lounge area, and state-of-the-art equipment. We've designed every aspect of the space to inspire creativity and capture pristine audio quality.
                </p>
              </div>
              <div className="manga-panel aspect-video bg-muted lg:order-1" />
            </section>

            {/* Mission Statement */}
            <section className="border-2 border-foreground bg-accent p-8 lg:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-6 text-3xl font-bold text-accent-foreground">Our Mission</h2>
                <p className="text-lg text-accent-foreground">
                  "To empower artists at every stage of their journey by providing professional recording services in an environment that values creativity, authenticity, and artistic growth. From unknown to known—we're here for every step of your musical evolution."
                </p>
              </div>
            </section>

            {/* Team/Values */}
            <section className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold">What We Stand For</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional equipment and experienced engineers ensure every recording meets industry standards.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Accessibility</h3>
                  <p className="text-sm text-muted-foreground">
                    Flexible packages and pricing make professional recording attainable for artists at all levels.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Community</h3>
                  <p className="text-sm text-muted-foreground">
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

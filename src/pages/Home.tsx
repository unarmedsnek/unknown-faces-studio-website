import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const packages: PackageData[] = [
  {
    name: "Basic Session",
    price: "$150",
    duration: "2 hours",
    description: "Best for solo artists and demos",
  },
  {
    name: "Standard Session",
    price: "$300",
    duration: "4 hours",
    description: "Best for full tracks and small bands",
  },
  {
    name: "Premium Session",
    price: "$500",
    duration: "8 hours",
    description: "Best for albums and professional projects",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b-2 border-foreground bg-accent">
          <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-5xl font-bold tracking-tight text-accent-foreground lg:text-7xl uppercase">
                UNKNOWN FACES
              </h1>
              <p className="mb-8 text-xl text-accent-foreground lg:text-2xl font-mono">
                from unknown to known faces
              </p>
              <Link to="/booking">
                <Button size="lg" className="text-lg font-bold bg-accent-foreground text-accent border-accent-foreground">
                  BOOK NOW
                </Button>
              </Link>
            </div>
            
            {/* Geometric manga panels */}
            <div className="absolute left-10 top-10 h-32 w-32 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)]" />
            <div className="absolute right-20 bottom-20 h-24 w-48 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)]" />
            <div className="absolute left-1/4 bottom-10 h-16 w-16 rotate-45 border-3 border-accent-foreground/30 shadow-[4px_4px_0_rgba(255,255,255,0.1)]" />
          </div>
        </section>

        {/* Studio Images Section */}
        <section className="border-b-2 border-foreground py-16 motion-lines">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-4xl font-bold">
              <span className="manga-caption-strip">Our Studio</span>
            </h2>
            
            {/* Image + Text alternating layout */}
            <div className="space-y-16">
              {/* First Row: Image Left, Text Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="manga-panel aspect-video rounded-none" />
                <div className="manga-panel space-y-4 p-6 rounded-none">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">Professional Equipment</h3>
                  <p className="text-foreground/80">
                    State-of-the-art recording equipment and acoustically treated rooms for the highest quality sound.
                    Our studio is equipped with industry-standard gear to bring your vision to life.
                  </p>
                </div>
              </div>

              {/* Second Row: Text Left, Image Right */}
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="manga-panel space-y-4 p-6 rounded-none lg:order-1">
                  <h3 className="text-2xl font-bold uppercase tracking-wide">Creative Space</h3>
                  <p className="text-foreground/80">
                    A comfortable and inspiring environment designed to help artists perform at their best.
                    Our space encourages creativity and collaboration.
                  </p>
                </div>
                <div className="manga-panel aspect-video rounded-none lg:order-2" />
              </div>
            </div>
          </div>
        </section>

        {/* Packages Preview Section */}
        <section className="border-b-2 border-foreground bg-background py-16 motion-lines">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold">
                <span className="manga-caption-strip">Recording Packages</span>
              </h2>
              <p className="text-muted-foreground font-mono text-sm">Choose the perfect session for your project</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg) => (
                <PackageCard key={pkg.name} package={pkg} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/booking">
                <Button size="lg" variant="outline">
                  View All Packages & Book
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="border-b-2 border-foreground py-16 motion-lines">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-12 text-center text-4xl font-bold">
              <span className="manga-caption-strip">Follow Us on Instagram</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="manga-panel aspect-square rounded-none flex items-center justify-center"
                >
                  <span className="font-mono text-sm text-muted-foreground">
                    Instagram Post {i}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lg relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                @unknownfaces_studio
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 motion-lines">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="mb-8 text-4xl font-bold">
              <span className="manga-caption-strip">About Unknown Faces</span>
            </h2>
            <div className="manga-panel p-8 rounded-none">
              <p className="mb-4 text-lg text-foreground/80">
                Unknown Faces is a professional recording studio dedicated to helping artists bring their musical vision to life.
                Located in the heart of the city, we provide a creative space equipped with top-tier equipment and experienced engineers.
              </p>
              <p className="text-lg text-foreground/80">
                Whether you're recording your first demo or working on a full album, we're here to support your journey from unknown to known.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/about">
                <Button variant="outline">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export default function WhereToFindUs() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center motion-lines py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">Where to Find Us</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              Visit us at our studio location
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
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">Studio Address</h3>
                      <p className="text-foreground/80 font-mono text-sm">Laisvės alėja 99<br />Centras<br />Kaunas<br />Lietuva</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">Opening Hours</h3>
                      <div className="space-y-1 text-foreground/80 font-mono text-sm">
                        <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                        <p>Saturday: 12:00 PM - 8:00 PM</p>
                        <p>Sunday: By Appointment Only</p>
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
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">Email</h3>
                      <a href="mailto:hello@unknownfaces.studio" className="text-foreground/80 hover:underline font-mono text-sm">hello@unknownfaces.studio</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="manga-panel rounded-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-6 w-6 flex-shrink-0" />
                    <div>
                      <h3 className="mb-2 text-xl font-bold uppercase tracking-wide">Phone</h3>
                      <a href="tel:+15551234567" className="text-foreground/80 hover:underline font-mono text-sm">+1 (555) 123-4567</a>
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
                      📍 Replace the map src URL with your actual studio location
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
                <h2 className="mb-4 text-2xl font-bold">Getting Here</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">By Car:</strong> We have dedicated parking available behind the building. Enter through the main entrance and follow the signs.
                  </p>
                  <p>
                    <strong className="text-foreground">By Public Transit:</strong> The studio is a 5-minute walk from the Central Station. Take bus lines 12, 45, or 67 and exit at Creative District stop.
                  </p>
                  <p>
                    <strong className="text-foreground">By Bike:</strong> Bike racks are available at the front entrance.
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

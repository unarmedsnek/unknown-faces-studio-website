import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  {
    name: "Full Day Session",
    price: "$800",
    duration: "12 hours",
    description: "Best for large projects and multiple tracks",
  },
];

export default function Booking() {
  const [extraHour, setExtraHour] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <Navbar />
      
      <main className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center motion-lines py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">Book Your Session</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              Choose your package and fill out the form below
            </p>
          </div>

          {/* Packages Grid */}
          <section className="mb-16 motion-lines py-8">
            <h2 className="mb-8 text-3xl font-bold text-center">
              <span className="manga-caption-strip">Available Packages</span>
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg) => (
                <PackageCard key={pkg.name} package={pkg} />
              ))}
            </div>
          </section>

          {/* Booking Form */}
          <section className="motion-lines py-8">
            <h2 className="mb-8 text-3xl font-bold text-center">
              <span className="manga-caption-strip">Booking Form</span>
            </h2>
            <Card className="mx-auto max-w-2xl manga-panel rounded-none">
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="uppercase tracking-wide font-mono text-xs">Full Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" className="border-2 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="uppercase tracking-wide font-mono text-xs">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="border-2 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase tracking-wide font-mono text-xs">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="border-2 rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package" className="uppercase tracking-wide font-mono text-xs">Select Package</Label>
                    <Select>
                      <SelectTrigger id="package" className="border-2 rounded-none">
                        <SelectValue placeholder="Choose a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.name} value={pkg.name}>{pkg.name} - {pkg.price}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="extra-hour" checked={extraHour} onCheckedChange={(checked) => setExtraHour(checked as boolean)} className="rounded-none border-2" />
                    <Label htmlFor="extra-hour" className="cursor-pointer text-sm font-medium uppercase tracking-wide">Add an extra hour</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="uppercase tracking-wide font-mono text-xs">Preferred Time</Label>
                    <Input id="time" type="text" placeholder="e.g., 2:00 PM" className="border-2 rounded-none" />
                  </div>
                  <Button type="submit" size="lg" className="w-full">Submit Booking (UI Only)</Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Cal.com Placeholder */}
          <section className="mt-16">
            <Card className="mx-auto max-w-2xl border-2 border-dashed border-border bg-muted shadow-none">
              <CardContent className="py-16 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  cal.com embed placeholder
                </p>
                <p className="mt-2 text-muted-foreground">
                  Calendar integration will be added here
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

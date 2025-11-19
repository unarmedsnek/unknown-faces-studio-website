import { useState, useEffect, FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { emailjsConfig } from "@/config/emailjs.config";
import { getCalLink, calConfig } from "@/config/cal.config";

// Cal.com type declaration
declare global {
  interface Window {
    Cal?: (action: string, options?: Record<string, unknown>) => void;
  }
}

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
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraHour, setExtraHour] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // No need for complex initialization - using iframe embed instead
  // Cal.com's inline embed has compatibility issues, iframe is more reliable

  const handlePackageClick = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email data with all booking information
      const emailData = {
        package_name: selectedPackage?.name,
        package_price: selectedPackage?.price,
        package_duration: selectedPackage?.duration,
        extra_hour: extraHour ? "Yes (+$50)" : "No",
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        to_email: formData.email, // For user confirmation email
        message: `Booking request for ${selectedPackage?.name}`,
      };

      // TODO: Cal.com will handle the actual calendar booking
      // The date/time selected in Cal.com widget will be sent separately to Cal.com
      // This email is for notification purposes

      // Send email to studio owner
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.ownerTemplateId,
        emailData,
        emailjsConfig.publicKey
      );

      // Send confirmation email to user
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.userTemplateId,
        emailData,
        emailjsConfig.publicKey
      );

      toast({
        title: "Booking Request Sent!",
        description: "We'll confirm your booking shortly via email.",
      });

      // Reset form
      setFormData({ name: "", phone: "", email: "" });
      setExtraHour(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error sending booking:", error);
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <p className="text-center text-muted-foreground mb-8 font-mono text-sm">
              Click a package to book your session
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {packages.map((pkg) => (
                <PackageCard 
                  key={pkg.name} 
                  package={pkg} 
                  onClick={() => handlePackageClick(pkg)}
                />
              ))}
            </div>
          </section>

          {/* Booking Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Book: {selectedPackage?.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedPackage?.price} • {selectedPackage?.duration}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Cal.com Calendar Widget */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">Select Date & Time</h3>
                  <Card className="border-2">
                    <CardContent className="p-4">
                      {/* Cal.com embed - using reliable iframe method */}
                      {selectedPackage ? (
                        <iframe
                          key={`cal-embed-${selectedPackage.name}`}
                          src={`https://cal.com/${getCalLink(selectedPackage.name)}?embed=true&theme=${calConfig.embedConfig.theme}&layout=${calConfig.embedConfig.layout}`}
                          style={{ 
                            width: "100%", 
                            height: "600px", 
                            border: "none",
                            borderRadius: "4px"
                          }}
                          title={`Book ${selectedPackage.name}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-center py-12 text-sm text-muted-foreground">
                          <p>Please select a package</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  <p className="text-xs text-muted-foreground">
                    * Select an available time slot from the calendar. Cal.com will handle the booking.
                  </p>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">Your Information</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-name" className="uppercase tracking-wide font-mono text-xs">
                        Full Name *
                      </Label>
                      <Input
                        id="modal-name"
                        type="text"
                        placeholder="John Doe"
                        className="border-2 rounded-none"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-phone" className="uppercase tracking-wide font-mono text-xs">
                        Phone Number *
                      </Label>
                      <Input
                        id="modal-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        className="border-2 rounded-none"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-email" className="uppercase tracking-wide font-mono text-xs">
                        Email *
                      </Label>
                      <Input
                        id="modal-email"
                        type="email"
                        placeholder="john@example.com"
                        className="border-2 rounded-none"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="uppercase tracking-wide font-mono text-xs">Selected Package</Label>
                      <Input
                        type="text"
                        value={`${selectedPackage?.name} - ${selectedPackage?.price}`}
                        className="border-2 rounded-none bg-muted"
                        disabled
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="modal-extra-hour"
                        checked={extraHour}
                        onCheckedChange={(checked) => setExtraHour(checked as boolean)}
                        className="rounded-none border-2"
                      />
                      <Label
                        htmlFor="modal-extra-hour"
                        className="cursor-pointer text-sm font-medium uppercase tracking-wide"
                      >
                        Add an extra hour (+$50)
                      </Label>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Submit Booking Request"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        You'll receive a confirmation email once your booking is processed
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}

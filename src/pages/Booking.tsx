import { useState, FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { emailjsConfig } from "@/config/emailjs.config";
import { getCalLink, calConfig } from "@/config/cal.config";
import { createCalComBooking, getEventTypeId } from "@/config/calcom-api.config";

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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handlePackageClick = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setExtraHour(false);
    setSelectedDate("");
    setSelectedTime("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a package first.",
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }

    // Validate date and time
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Date/Time",
        description: "Please select a date and time for your booking.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Combine date and time into ISO format
      const bookingDateTime = new Date(`${selectedDate}T${selectedTime}`);
      const startTime = bookingDateTime.toISOString();

      // Get event type ID based on package and extra hour
      const eventTypeId = getEventTypeId(selectedPackage.name, extraHour);

      if (!eventTypeId || eventTypeId === 0) {
        throw new Error("Event Type ID not configured. Please update calcom-api.config.ts with your Cal.com event type IDs.");
      }

      console.log("📅 Creating booking:", {
        package: selectedPackage.name,
        extraHour,
        eventTypeId,
        startTime,
        attendee: formData.name,
      });

      // Create booking via Cal.com API
      const booking = await createCalComBooking({
        eventTypeId,
        start: startTime,
        attendee: {
          name: formData.name,
          email: formData.email,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          phoneNumber: formData.phone || undefined,
        },
        metadata: {
          package: selectedPackage.name,
          packagePrice: selectedPackage.price,
          extraHour: extraHour ? "Yes" : "No",
        },
      });

      console.log("✅ Booking created:", booking);

      // Format date/time for emails
      const bookingDate = bookingDateTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const bookingTime = bookingDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Calculate end time
      const baseDuration = parseInt(selectedPackage.duration.split(" ")[0]);
      const totalDuration = extraHour ? baseDuration + 1 : baseDuration;
      const endDateTime = new Date(bookingDateTime.getTime() + totalDuration * 60 * 60 * 1000);
      const bookingEndTime = endDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Prepare email data
      const emailData = {
        package_name: selectedPackage.name,
        package_price: selectedPackage.price,
        package_duration: selectedPackage.duration,
        extra_hour: extraHour ? "Yes (+$50)" : "No",
        total_duration: extraHour 
          ? `${selectedPackage.duration} + 1 hour` 
          : selectedPackage.duration,
        booking_date: bookingDate,
        booking_time: `${bookingTime} - ${bookingEndTime}`,
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        to_email: formData.email,
        message: `Booking confirmed for ${selectedPackage.name} on ${bookingDate} at ${bookingTime}`,
      };

      console.log("📧 Sending emails...");

      // Send email to studio owner
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.ownerTemplateId,
        emailData,
        emailjsConfig.publicKey
      );
      console.log("✅ Owner email sent");

      // Send confirmation email to user
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.userTemplateId,
        emailData,
        emailjsConfig.publicKey
      );
      console.log("✅ User confirmation email sent");

      // Show success
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your ${selectedPackage.name} on ${bookingDate} at ${bookingTime} is confirmed. Check your email!`,
      });

      // Reset and close
      setFormData({ name: "", phone: "", email: "" });
      setExtraHour(false);
      setSelectedDate("");
      setSelectedTime("");
      setIsModalOpen(false);

    } catch (error: any) {
      console.error("❌ Booking error:", error);

      let errorMessage = "Failed to create booking. Please try again.";
      
      if (error.message?.includes("Event Type ID")) {
        errorMessage = "Cal.com not configured. Please update event type IDs in calcom-api.config.ts";
      } else if (error.message?.includes("Cal.com API error")) {
        errorMessage = `Cal.com error: ${error.message}. Please check your API key and event type IDs.`;
      }

      toast({
        title: "Booking Failed",
        description: errorMessage,
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
                {/* Date & Time Selection - Left Side */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">
                    Select Date & Time
                  </h3>
                  
                  {/* Date Input */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-date" className="uppercase tracking-wide font-mono text-xs">
                      Date *
                    </Label>
                    <Input
                      id="booking-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="border-2 rounded-none"
                      required
                    />
                  </div>

                  {/* Time Input */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-time" className="uppercase tracking-wide font-mono text-xs">
                      Time *
                    </Label>
                    <Input
                      id="booking-time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="border-2 rounded-none"
                      required
                    />
                  </div>

                  {/* Package Info */}
                  <Card className="border-2 bg-muted">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="h-5 w-5 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold">{selectedPackage?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {selectedPackage?.duration}
                            {extraHour && " + 1 hour"}
                          </p>
                          <p className="text-sm font-medium">
                            Price: {selectedPackage?.price}
                            {extraHour && " + $50"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cal.com Link */}
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Tip:</strong> Check your{" "}
                    <a
                      href={`https://cal.com/${getCalLink(selectedPackage?.name || "", extraHour)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-foreground"
                    >
                      Cal.com availability
                    </a>{" "}
                    before booking
                  </p>
                </div>

                {/* Booking Form - Right Side */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">
                    Step 2: Enter Your Information
                  </h3>
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
                        {isSubmitting ? "Creating Booking..." : "Complete Booking"}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        Your booking will be created and you'll receive a confirmation email
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

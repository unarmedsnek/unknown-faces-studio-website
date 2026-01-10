import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { PromoCard } from "@/components/PromoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Loader2, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  getAvailableSlots,
  createGoogleCalendarBooking,
  getPackageDuration,
  downloadICSFile,
  LITHUANIAN_TIMEZONE,
  type BookingResponse,
} from "@/config/google-calendar-api.config";
import { parseISO } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { useLanguage } from "@/contexts/LanguageContext";

// Helper to format time in Lithuanian timezone
function formatLithuanianTime(date: Date): string {
  return formatInTimeZone(date, LITHUANIAN_TIMEZONE, "HH:mm");
}

// Helper to format date in Lithuanian timezone
function formatLithuanianDate(date: Date): string {
  return formatInTimeZone(date, LITHUANIAN_TIMEZONE, "EEEE, MMMM d, yyyy");
}

interface AvailableSlot {
  time: string; // ISO string
  start: string; // ISO string
  end: string; // ISO string
}

// Package keys (language-independent)
const PACKAGE_KEYS = {
  TWO_HOUR: "2 hour session",
  FOUR_HOUR: "4 hour session",
  SIX_HOUR: "6 hour session",
  EIGHT_HOUR: "8 hour Session",
  TEN_HOUR: "10 hour Session",
} as const;

export default function Booking() {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [selectedPackageKey, setSelectedPackageKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraHour, setExtraHour] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AvailableSlot | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    extraNotes: "",
  });
  const [extraServices, setExtraServices] = useState({
    vocalRecording: false,
    mixMaster: false,
    instrumental: false,
  });
  const [hasReadRules, setHasReadRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [availableDateKeys, setAvailableDateKeys] = useState<Set<string>>(new Set());
  const [hasFetchedMonthAvailability, setHasFetchedMonthAvailability] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formLoadTime, setFormLoadTime] = useState<string>("");
  const [honeypot, setHoneypot] = useState({
    website: "",
    url: "",
    honeypot: ""
  });
  const { toast } = useToast();

  const packages: (PackageData & { key: string })[] = [
    {
      key: PACKAGE_KEYS.TWO_HOUR,
      name: t("booking.packages.twoHour.name"),
      price: "20€",
      duration: t("booking.packages.twoHour.duration"),
      description: t("booking.packages.twoHour.description"),
    },
    {
      key: PACKAGE_KEYS.FOUR_HOUR,
      name: t("booking.packages.fourHour.name"),
      price: "40€",
      duration: t("booking.packages.fourHour.duration"),
      description: t("booking.packages.fourHour.description"),
    },
    {
      key: PACKAGE_KEYS.SIX_HOUR,
      name: t("booking.packages.sixHour.name"),
      price: "60€",
      duration: t("booking.packages.sixHour.duration"),
      description: t("booking.packages.sixHour.description"),
    },
    {
      key: PACKAGE_KEYS.EIGHT_HOUR,
      name: t("booking.packages.eightHour.name"),
      price: "75€",
      duration: t("booking.packages.eightHour.duration"),
      description: t("booking.packages.eightHour.description"),
    },
    {
      key: PACKAGE_KEYS.TEN_HOUR,
      name: t("booking.packages.tenHour.name"),
      price: "80€",
      duration: t("booking.packages.tenHour.duration"),
      description: t("booking.packages.tenHour.description"),
    },
  ];

  // Extra hour is flat 10€ for all packages
  const EXTRA_HOUR_COST = "10€";

  // Price constants for extras (in euros)
  const PRICES = {
    extraHour: 10,
    vocalRecording: 25,
    mixMaster: 70,
    instrumental: 150,
  };

  // Get package base price as number
  const getBasePrice = (): number => {
    if (!selectedPackage) return 0;
    const priceStr = selectedPackage.price.replace("€", "");
    return parseInt(priceStr) || 0;
  };

  // Calculate total price with breakdown
  const calculatePrice = (): { base: number; extras: { name: string; price: number }[]; total: number } => {
    const base = getBasePrice();
    const extras: { name: string; price: number }[] = [];

    if (extraHour) {
      extras.push({ name: t("booking.priceBreakdown.extraHour"), price: PRICES.extraHour });
    }
    if (extraServices.vocalRecording) {
      extras.push({ name: t("booking.priceBreakdown.vocalRecording"), price: PRICES.vocalRecording });
    }
    if (extraServices.mixMaster) {
      extras.push({ name: t("booking.priceBreakdown.mixMaster"), price: PRICES.mixMaster });
    }
    if (extraServices.instrumental) {
      extras.push({ name: t("booking.priceBreakdown.instrumental"), price: PRICES.instrumental });
    }

    const total = base + extras.reduce((sum, extra) => sum + extra.price, 0);
    return { base, extras, total };
  };

  // Calculate total duration in minutes using the config
  const getTotalDurationMinutes = (): number => {
    if (!selectedPackageKey) return 0;
    return getPackageDuration(selectedPackageKey, extraHour);
  };

  // Fetch available slots when package, date, or extra hour changes
  useEffect(() => {
    if (!selectedPackage || !selectedDate || !selectedPackageKey) {
      setAvailableSlots([]);
      return;
    }

    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const durationMinutes = getTotalDurationMinutes();
        
        // Get slots for the selected date
        const dateKey = formatInTimeZone(selectedDate, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");

        const slotsData = await getAvailableSlots({
          startDate: dateKey,
          endDate: dateKey,
          durationMinutes,
        });

        console.log("📅 Slots data received:", slotsData);

        // Get slots for the selected date from the response
        let daySlots = slotsData.data[dateKey] || [];

        console.log("📅 Day slots for selected date:", daySlots.length);

        // Process slots
        const now = new Date();
        const isSelectedDateToday =
          formatInTimeZone(now, LITHUANIAN_TIMEZONE, "yyyy-MM-dd") === dateKey;
        const validSlots: AvailableSlot[] = [];

        for (const slot of daySlots) {
          const slotTime = slot.start;
          if (!slotTime) continue;

          const slotStart = parseISO(slotTime);
          const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

          // Skip past times if today
          if (isSelectedDateToday && slotStart <= now) {
            continue;
          }

          validSlots.push({
            time: slotStart.toISOString(),
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
          });
        }

        // Sort slots by time (so 00:00 appears at the start, not the end)
        validSlots.sort((a, b) => {
          const timeA = parseISO(a.start);
          const timeB = parseISO(b.start);
          // Get hours in Lithuanian timezone for proper sorting
          const hourA = parseInt(formatInTimeZone(timeA, LITHUANIAN_TIMEZONE, "HH"));
          const hourB = parseInt(formatInTimeZone(timeB, LITHUANIAN_TIMEZONE, "HH"));
          return hourA - hourB;
        });

        setAvailableSlots(validSlots);
        console.log("✅ Total valid slots:", validSlots.length);

      } catch (error: any) {
        console.error("❌ Error fetching slots:", error);
        setAvailableSlots([]);
        toast({
          title: t("booking.toasts.loadFailed.title"),
          description: t("booking.toasts.loadFailed.description"),
          variant: "destructive",
        });
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedPackageKey, selectedDate, extraHour, toast]);

  // Fetch availability for the entire visible month to gray-out unavailable days
  useEffect(() => {
    if (!selectedPackage || !selectedPackageKey) {
      setAvailableDateKeys(new Set());
      setHasFetchedMonthAvailability(false);
      return;
    }

    const fetchMonthAvailability = async () => {
      try {
        const durationMinutes = getTotalDurationMinutes();

        const monthStart = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
        const monthEnd = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);

        const monthStartKey = formatInTimeZone(monthStart, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");
        const monthEndKey = formatInTimeZone(monthEnd, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");

        const slotsData = await getAvailableSlots({
          startDate: monthStartKey,
          endDate: monthEndKey,
          durationMinutes,
        });

        const monthKeys = new Set<string>();
        
        // The response data is already keyed by date
        if (slotsData.data && typeof slotsData.data === "object") {
          Object.entries(slotsData.data).forEach(([key, slots]: [string, any]) => {
            if (Array.isArray(slots) && slots.length > 0) {
              monthKeys.add(key);
            }
          });
        }

        setAvailableDateKeys(monthKeys);
      } catch (error) {
        console.error("❌ Error fetching month availability:", error);
        setAvailableDateKeys(new Set());
      } finally {
        setHasFetchedMonthAvailability(true);
      }
    };

    setHasFetchedMonthAvailability(false);
    fetchMonthAvailability();
  }, [selectedPackageKey, extraHour, calendarDate]);

  // Track when modal opens (form load time)
  useEffect(() => {
    if (isModalOpen) {
      setFormLoadTime(new Date().toISOString());
      setHoneypot({ website: "", url: "", honeypot: "" });
    }
  }, [isModalOpen]);

  const handlePackageClick = (pkg: PackageData & { key: string }) => {
    setSelectedPackage(pkg);
    setSelectedPackageKey(pkg.key);
    setExtraHour(false);
    setExtraServices({ vocalRecording: false, mixMaster: false, instrumental: false });
    setSelectedDate(undefined);
    setSelectedTimeSlot(null);
    setAvailableSlots([]);
    setCalendarDate(new Date());
    setAvailableDateKeys(new Set());
    setHasFetchedMonthAvailability(false);
    setIsModalOpen(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTimeSlot(null);
    } else {
      setSelectedDate(undefined);
      setSelectedTimeSlot(null);
      setAvailableSlots([]);
    }
  };

  const handleTimeSelect = (slot: AvailableSlot) => {
    setSelectedTimeSlot(slot);
  };

  const handleDownloadICS = () => {
    if (bookingResult?.icsContent) {
      downloadICSFile(bookingResult.icsContent, "unknown-faces-studio-booking.ics");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form load time exists
    if (!formLoadTime) {
      toast({
        title: "Error",
        description: "Please refresh the page and try again.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPackage) {
      toast({
        title: t("booking.toasts.noPackage.title"),
        description: t("booking.toasts.noPackage.description"),
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: t("booking.toasts.missingInfo.title"),
        description: t("booking.toasts.missingInfo.description"),
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: t("booking.toasts.missingDateTime.title"),
        description: t("booking.toasts.missingDateTime.description"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const startTime = selectedTimeSlot.start;
      // Calculate end time based on current extraHour setting (not from slot)
      const durationMinutes = getTotalDurationMinutes();
      const startDateTime = parseISO(startTime);
      const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60 * 1000);
      const endTime = endDateTime.toISOString();

      console.log("📅 Creating booking:", {
        package: selectedPackage.name,
        packageKey: selectedPackageKey,
        extraHour,
        durationMinutes,
        startTime,
        endTime,
        attendee: formData.name,
      });

      // Create booking via Google Calendar API (script handles emails)
      const booking = await createGoogleCalendarBooking({
        startTime,
        endTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        packageKey: selectedPackageKey,
        extraHour,
        extraNotes: formData.extraNotes || undefined,
        extraServices,
        formLoadTime: formLoadTime,
        website: honeypot.website,
        url: honeypot.url,
        honeypot: honeypot.honeypot,
      });

      console.log("✅ Booking created:", booking);

      // Store booking result for success dialog
      setBookingResult(booking);

      // Close booking modal and show success dialog
      setIsModalOpen(false);
      setShowSuccessDialog(true);

      // Reset form
      setFormData({ name: "", phone: "", email: "", extraNotes: "" });
      setExtraHour(false);
      setExtraServices({ vocalRecording: false, mixMaster: false, instrumental: false });
      setHasReadRules(false);
      setSelectedDate(undefined);
      setSelectedTimeSlot(null);
      setAvailableSlots([]);
      setFormLoadTime("");
      setHoneypot({ website: "", url: "", honeypot: "" });

    } catch (error: any) {
      console.error("❌ Booking error:", error);

      let errorMessage = error.message || "Failed to create booking. Please try again.";
      
      // Handle specific error messages from script
      if (errorMessage.includes("no longer available")) {
        errorMessage = "This time slot is no longer available. Please select another time.";
      } else if (errorMessage.includes("Too many")) {
        errorMessage = "Too many booking attempts. Please try again later.";
      } else if (errorMessage.includes("disposable email")) {
        errorMessage = "Please use a permanent email address.";
      } else if (errorMessage.includes("advance")) {
        errorMessage = errorMessage; // Use script's message
      }

      toast({
        title: t("booking.toasts.failed.title"),
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
          <div className="mb-12 text-center py-8">
            <h1 className="mb-4 text-5xl font-bold">
              <span className="manga-caption-strip">{t("booking.title")}</span>
            </h1>
            <p className="text-xl text-muted-foreground font-mono">
              {t("booking.subtitle")}
            </p>
          </div>

          {/* Promotion Card */}
          <div className="mb-12 px-4">
            <PromoCard />
          </div>

          {/* Packages Grid */}
          <section className="mb-16 py-8 overflow-visible">
            <h2 className="mb-8 text-3xl font-bold text-center">
              <span className="manga-caption-strip">{t("booking.availablePackages")}</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8 font-mono text-sm">
              {t("booking.clickToBook")}
            </p>
            <div className="px-4 py-2">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg.name} 
                    package={pkg} 
                    onClick={() => handlePackageClick(pkg)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Booking Modal */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {t("booking.modal.title")} {selectedPackage?.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedPackage?.price} • {selectedPackage?.duration} • {t("booking.modal.timezone")}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                {/* Calendar & Time Slots - Left Side */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">
                    {t("booking.modal.selectDateTime")}
                  </h3>
                  
                  {/* Calendar */}
                  <Card className="border-2">
                    <CardContent className="p-4">
                      <Calendar
                        key={`calendar-${selectedPackage?.name}-${isModalOpen}`}
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          if (date < today) return true;
                          if (!selectedPackage) return true;
                          if (!hasFetchedMonthAvailability) return false;

                          const dateKey = formatInTimeZone(date, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");
                          return !availableDateKeys.has(dateKey);
                        }}
                        month={calendarDate}
                        onMonthChange={setCalendarDate}
                        classNames={{
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
                          month: "space-y-4 w-full",
                          table: "w-full border-collapse",
                          head_row: "flex w-full",
                          head_cell: "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem]",
                          row: "flex w-full mt-2",
                          cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-full p-0 font-normal aria-selected:opacity-100",
                        }}
                        modifiersClassNames={{
                          selected: "bg-primary text-primary-foreground",
                          today: "border-2 border-primary font-bold",
                        }}
                      />
                    </CardContent>
                  </Card>

                  {/* Available Time Slots */}
                  {selectedDate && (
                    <Card className="border-2">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <h4 className="font-semibold text-sm uppercase tracking-wide">
                              {t("booking.modal.availableTimes")} ({formatInTimeZone(selectedDate, LITHUANIAN_TIMEZONE, "MMM d, yyyy")})
                            </h4>
                          </div>
                          
                          {loadingSlots ? (
                            <div className="flex items-center justify-center py-8">
                              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                              <span className="ml-2 text-sm text-muted-foreground">{t("booking.modal.loadingAvailability")}</span>
                            </div>
                          ) : availableSlots.length === 0 ? (
                            <p className="text-sm text-muted-foreground py-4 text-center">
                              {t("booking.modal.noSlots")}
                            </p>
                          ) : (
                            <div className="grid grid-cols-3 gap-2">
                              {availableSlots.map((slot, index) => {
                                const slotDate = parseISO(slot.time);
                                const timeStr = formatLithuanianTime(slotDate);
                                const isSelected = selectedTimeSlot?.start === slot.start;
                                
                                return (
                                  <Button
                                    key={index}
                                    type="button"
                                    variant={isSelected ? "default" : "outline"}
                                    className="rounded-none border-2"
                                    onClick={() => handleTimeSelect(slot)}
                                  >
                                    {timeStr}
                                  </Button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Package Info */}
                  <Card className="border-2 bg-muted">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="h-5 w-5 mt-0.5" />
                        <div className="space-y-1">
                          <p className="font-semibold">{selectedPackage?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {t("booking.modal.duration")} {selectedPackage?.duration}
                            {extraHour && " + 1 hour"}
                          </p>
                          <p className="text-sm font-medium">
                            {t("booking.modal.price")} {selectedPackage?.price}
                            {extraHour && ` + ${EXTRA_HOUR_COST}`}
                          </p>
                          <p className="text-xs text-muted-foreground pt-2 border-t border-border mt-2">
                            {t("booking.modal.questionsCall")} <a href="tel:+37060623373" className="hover:underline font-semibold">+370 606 23373</a>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Booking Form - Right Side */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold uppercase tracking-wide">
                    {t("booking.modal.enterInfo")}
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot fields - hidden from users, bots will fill them */}
                    <div style={{ 
                      display: 'none', 
                      position: 'absolute', 
                      left: '-9999px',
                      opacity: 0,
                      pointerEvents: 'none'
                    }}>
                      <input 
                        type="text" 
                        name="website" 
                        value={honeypot.website}
                        onChange={(e) => setHoneypot({...honeypot, website: e.target.value})}
                        tabIndex={-1} 
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      <input 
                        type="text" 
                        name="url" 
                        value={honeypot.url}
                        onChange={(e) => setHoneypot({...honeypot, url: e.target.value})}
                        tabIndex={-1} 
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      <input 
                        type="text" 
                        name="honeypot" 
                        value={honeypot.honeypot}
                        onChange={(e) => setHoneypot({...honeypot, honeypot: e.target.value})}
                        tabIndex={-1} 
                        autoComplete="off"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-name" className="uppercase tracking-wide font-mono text-xs">
                        {t("booking.modal.fullName")} *
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
                        {t("booking.modal.phone")} *
                      </Label>
                      <Input
                        id="modal-phone"
                        type="tel"
                        placeholder="+370 6XX XXX XX"
                        className="border-2 rounded-none"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-email" className="uppercase tracking-wide font-mono text-xs">
                        {t("booking.modal.email")} *
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
                      <Label className="uppercase tracking-wide font-mono text-xs">{t("booking.modal.selectedPackage")}</Label>
                      <Input
                        type="text"
                        value={`${selectedPackage?.name} - ${selectedPackage?.price}`}
                        className="border-2 rounded-none bg-muted"
                        disabled
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modal-extra-notes" className="uppercase tracking-wide font-mono text-xs">
                        {t("booking.modal.extraNotes")}
                      </Label>
                      <Textarea
                        id="modal-extra-notes"
                        placeholder={t("booking.modal.extraNotesPlaceholder")}
                        className="border-2 rounded-none resize-none"
                        rows={3}
                        value={formData.extraNotes}
                        onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })}
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
                        {t("booking.modal.addExtraHour")}
                      </Label>
                    </div>

                    {/* Extra Services */}
                    <div className="space-y-2 pt-2 border-t border-border">
                      <Label className="uppercase tracking-wide font-mono text-xs block mb-3">
                        {t("booking.extraServices.title")}
                      </Label>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="service-vocal"
                          checked={extraServices.vocalRecording}
                          onCheckedChange={(checked) => setExtraServices({ ...extraServices, vocalRecording: checked as boolean })}
                          className="rounded-none border-2"
                        />
                        <Label
                          htmlFor="service-vocal"
                          className="cursor-pointer text-sm font-medium"
                        >
                          {t("booking.extraServices.vocalRecording")}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="service-mix"
                          checked={extraServices.mixMaster}
                          onCheckedChange={(checked) => setExtraServices({ ...extraServices, mixMaster: checked as boolean })}
                          className="rounded-none border-2"
                        />
                        <Label
                          htmlFor="service-mix"
                          className="cursor-pointer text-sm font-medium"
                        >
                          {t("booking.extraServices.mixMaster")}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="service-instrumental"
                          checked={extraServices.instrumental}
                          onCheckedChange={(checked) => setExtraServices({ ...extraServices, instrumental: checked as boolean })}
                          className="rounded-none border-2"
                        />
                        <Label
                          htmlFor="service-instrumental"
                          className="cursor-pointer text-sm font-medium"
                        >
                          {t("booking.extraServices.instrumental")}
                        </Label>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    {selectedPackage && (
                      <Card className="border-2 border-foreground bg-muted/50">
                        <CardContent className="p-4">
                          <p className="text-sm font-semibold mb-3 uppercase tracking-wide font-mono">
                            {t("booking.priceBreakdown.title")}
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>{selectedPackage.name}</span>
                              <span className="font-mono">{getBasePrice()}€</span>
                            </div>
                            {calculatePrice().extras.map((extra, index) => (
                              <div key={index} className="flex justify-between text-muted-foreground">
                                <span>+ {extra.name}</span>
                                <span className="font-mono">{extra.price}€</span>
                              </div>
                            ))}
                            <div className="border-t border-foreground pt-2 mt-2 flex justify-between font-bold text-lg">
                              <span>{t("booking.priceBreakdown.total")}</span>
                              <span className="font-mono">{calculatePrice().total}€</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {selectedDate && selectedTimeSlot && (
                      <Card className="border-2 border-primary">
                        <CardContent className="p-4">
                          <p className="text-sm font-semibold mb-1">{t("booking.modal.selectedBooking")}</p>
                          <p className="text-sm">
                            {formatInTimeZone(selectedDate, LITHUANIAN_TIMEZONE, "EEEE, MMMM d, yyyy")} {t("booking.modal.at")} {formatLithuanianTime(parseISO(selectedTimeSlot.start))}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    {/* Rules Checkbox - Required */}
                    <div className="flex items-start space-x-2 pt-4 border-t border-border">
                      <Checkbox
                        id="rules-checkbox"
                        checked={hasReadRules}
                        onCheckedChange={(checked) => setHasReadRules(checked as boolean)}
                        className="rounded-none border-2 mt-1"
                      />
                      <Label
                        htmlFor="rules-checkbox"
                        className="cursor-pointer text-sm leading-relaxed"
                      >
                        {t("booking.modal.rulesAgreement")}{" "}
                        <a href="/rules" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary font-semibold">
                          {t("booking.modal.rulesLink")}
                        </a>
                      </Label>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting || !selectedDate || !selectedTimeSlot || !hasReadRules}
                      >
                        {isSubmitting ? t("booking.modal.creatingBooking") : t("booking.modal.completeBooking")}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        {t("booking.modal.confirmationNote")}
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Success Dialog with Calendar Links */}
          <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  🎉 {t("booking.toasts.success.title")}
                </DialogTitle>
                <DialogDescription className="text-center">
                  Your booking has been confirmed! A confirmation email has been sent to your email address.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                {bookingResult?.booking && (
                  <Card className="border-2">
                    <CardContent className="p-4">
                      <p className="font-semibold mb-2">Booking Details:</p>
                      <p className="text-sm text-muted-foreground">
                        {formatLithuanianDate(parseISO(bookingResult.booking.start))}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatLithuanianTime(parseISO(bookingResult.booking.start))} - {formatLithuanianTime(parseISO(bookingResult.booking.end))}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-center">Add to your calendar:</p>
                  
                  {/* Download ICS */}
                  {bookingResult?.icsContent && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleDownloadICS}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Calendar File (.ics)
                    </Button>
                  )}

                  {/* Google Calendar Link */}
                  {bookingResult?.calendarLinks?.google && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(bookingResult.calendarLinks?.google, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Add to Google Calendar
                    </Button>
                  )}

                  {/* Outlook Link */}
                  {bookingResult?.calendarLinks?.outlook && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(bookingResult.calendarLinks?.outlook, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Add to Outlook Calendar
                    </Button>
                  )}
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setBookingResult(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}

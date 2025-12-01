import { useState, useEffect, FormEvent } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PackageCard, PackageData } from "@/components/PackageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { emailjsConfig } from "@/config/emailjs.config";
import { 
  createCalComBooking, 
  getEventTypeId, 
  getAvailableSlots,
  LITHUANIAN_TIMEZONE 
} from "@/config/calcom-api.config";
import { parseISO, isSameDay } from "date-fns";
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

// Package keys for Cal.com API (language-independent)
const PACKAGE_KEYS = {
  BASIC: "Basic Session",
  STANDARD: "Standard Session",
  PREMIUM: "Premium Session",
  FULL_DAY: "Full Day Session",
} as const;

export default function Booking() {
  const { t } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [selectedPackageKey, setSelectedPackageKey] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [extraHour, setExtraHour] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    extraNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [availableDateKeys, setAvailableDateKeys] = useState<Set<string>>(new Set());
  const [hasFetchedMonthAvailability, setHasFetchedMonthAvailability] = useState(false);
  const { toast } = useToast();

  const packages: (PackageData & { key: string })[] = [
    {
      key: PACKAGE_KEYS.BASIC,
      name: t("booking.packages.basic.name"),
      price: "$150",
      duration: t("booking.packages.basic.duration"),
      description: t("booking.packages.basic.description"),
    },
    {
      key: PACKAGE_KEYS.STANDARD,
      name: t("booking.packages.standard.name"),
      price: "$300",
      duration: t("booking.packages.standard.duration"),
      description: t("booking.packages.standard.description"),
    },
    {
      key: PACKAGE_KEYS.PREMIUM,
      name: t("booking.packages.premium.name"),
      price: "$500",
      duration: t("booking.packages.premium.duration"),
      description: t("booking.packages.premium.description"),
    },
    {
      key: PACKAGE_KEYS.FULL_DAY,
      name: t("booking.packages.fullDay.name"),
      price: "$800",
      duration: t("booking.packages.fullDay.duration"),
      description: t("booking.packages.fullDay.description"),
    },
  ];

  // Calculate total duration in minutes
  const getTotalDurationMinutes = (): number => {
    if (!selectedPackage) return 0;
    const baseDuration = parseInt(selectedPackage.duration.split(" ")[0]);
    const totalHours = extraHour ? baseDuration + 1 : baseDuration;
    return totalHours * 60;
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
        const eventTypeId = getEventTypeId(selectedPackageKey, extraHour);
        
        if (!eventTypeId || eventTypeId === 0) {
          console.warn("Event Type ID not configured");
          setAvailableSlots([]);
          setLoadingSlots(false);
          return;
        }

        // Get slots for the selected date
        // Cal.com API expects ISO 8601 in UTC – convert Lithuanian day bounds to UTC
        const dateKey = formatInTimeZone(selectedDate, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");
        const startOfDayUtc = fromZonedTime(`${dateKey}T00:00:00`, LITHUANIAN_TIMEZONE).toISOString();
        const endOfDayUtc = fromZonedTime(`${dateKey}T23:59:59`, LITHUANIAN_TIMEZONE).toISOString();

        const slotsData = await getAvailableSlots({
          eventTypeId,
          startTime: startOfDayUtc,
          endTime: endOfDayUtc,
          timeZone: LITHUANIAN_TIMEZONE,
        });

        console.log("📅 Slots data received:", JSON.stringify(slotsData, null, 2));
        console.log("📅 Total slots in response:", 
          slotsData.data ? 
            (typeof slotsData.data === 'object' && !Array.isArray(slotsData.data) ? 
              Object.values(slotsData.data).flat().length : 
              slotsData.data.length) : 
            0
        );

        // Cal.com API v2/slots returns: { data: { [date]: [{ start: string }] }, status: "success" }
        let daySlots: any[] = [];
        
        // Handle Cal.com API response structure
        if (slotsData.data) {
          // Response format: { data: { "2025-11-22": [{ start: "..." }] } }
          if (typeof slotsData.data === 'object' && !Array.isArray(slotsData.data)) {
            // Object format with date keys: { "2025-11-22": [{ start: "..." }] }
            daySlots = slotsData.data[dateKey] || [];
          } else if (Array.isArray(slotsData.data)) {
            // Array format - filter by date
            daySlots = slotsData.data.filter((slot: any) => {
              const slotTime = slot.start || slot.time;
              if (slotTime) {
                const slotDate = parseISO(slotTime);
                return formatInTimeZone(slotDate, LITHUANIAN_TIMEZONE, "yyyy-MM-dd") === dateKey;
              }
              return false;
            });
          }
        } else if (slotsData.slots) {
          // Fallback: some responses might use 'slots' instead of 'data'
          if (typeof slotsData.slots === 'object' && !Array.isArray(slotsData.slots)) {
            daySlots = slotsData.slots[dateKey] || [];
          } else if (Array.isArray(slotsData.slots)) {
            daySlots = slotsData.slots.filter((slot: any) => {
              const slotTime = slot.start || slot.time;
              if (slotTime) {
                const slotDate = parseISO(slotTime);
                return formatInTimeZone(slotDate, LITHUANIAN_TIMEZONE, "yyyy-MM-dd") === dateKey;
              }
              return false;
            });
          }
        }

        console.log("📅 Day slots for selected date:", daySlots);
        console.log("📅 Number of slots returned by Cal.com for this date:", daySlots.length);
        console.log("📅 Selected date key:", dateKey);

        // Filter slots to ensure full duration fits
        const totalDurationMinutes = getTotalDurationMinutes();
        console.log("📅 Required duration (minutes):", totalDurationMinutes);
        const now = new Date();
        const isSelectedDateToday =
          formatInTimeZone(now, LITHUANIAN_TIMEZONE, "yyyy-MM-dd") === dateKey;
        const validSlots: AvailableSlot[] = [];

        for (const slot of daySlots) {
          // Cal.com API returns slots with 'start' field
          const slotTime = slot.start || slot.time;
          if (!slotTime) {
            console.log("⚠️ Skipping slot with no start time:", slot);
            continue;
          }

          const slotStart = parseISO(slotTime);
          const slotEnd = new Date(slotStart.getTime() + totalDurationMinutes * 60 * 1000);

          // Skip past times if today
          if (isSelectedDateToday && slotStart <= now) {
            console.log("⏭️ Skipping past slot:", formatLithuanianTime(slotStart));
            continue;
          }

          // Ensure the requested duration fits within the same Lithuanian day
          const dayEndUtc = fromZonedTime(`${dateKey}T23:59:59`, LITHUANIAN_TIMEZONE);

          if (slotEnd <= dayEndUtc) {
            validSlots.push({
              time: slotStart.toISOString(),
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
            });
            console.log("✅ Valid slot added:", formatLithuanianTime(slotStart), "→", formatLithuanianTime(slotEnd));
          } else {
            console.log("❌ Slot rejected (duration extends past day end):", formatLithuanianTime(slotStart), "→", formatLithuanianTime(slotEnd));
          }
        }

        setAvailableSlots(validSlots);
        console.log("✅ Total valid slots after filtering:", validSlots.length);
        console.log("✅ Valid slots:", validSlots.map(s => formatLithuanianTime(parseISO(s.start))));

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
        const eventTypeId = getEventTypeId(selectedPackageKey, extraHour);

        if (!eventTypeId || eventTypeId === 0) {
          console.warn("Event Type ID not configured for calendar availability");
          setAvailableDateKeys(new Set());
          return;
        }

        const monthStart = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
        const monthEnd = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);

        const monthStartKey = formatInTimeZone(monthStart, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");
        const monthEndKey = formatInTimeZone(monthEnd, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");

        const slotsData = await getAvailableSlots({
          eventTypeId,
          startTime: fromZonedTime(`${monthStartKey}T00:00:00`, LITHUANIAN_TIMEZONE).toISOString(),
          endTime: fromZonedTime(`${monthEndKey}T23:59:59`, LITHUANIAN_TIMEZONE).toISOString(),
          timeZone: LITHUANIAN_TIMEZONE,
        });

        const monthKeys = new Set<string>();
        const addSlotDateKey = (slot: any) => {
          const slotTime = slot?.start || slot?.time;
          if (!slotTime) return;
          const slotDate = parseISO(slotTime);
          const key = formatInTimeZone(slotDate, LITHUANIAN_TIMEZONE, "yyyy-MM-dd");
          monthKeys.add(key);
        };

        if (slotsData.data) {
          if (typeof slotsData.data === "object" && !Array.isArray(slotsData.data)) {
            Object.entries(slotsData.data).forEach(([key, slots]: [string, any]) => {
              if (Array.isArray(slots) && slots.length > 0) {
                monthKeys.add(key);
              }
            });
          } else if (Array.isArray(slotsData.data)) {
            slotsData.data.forEach(addSlotDateKey);
          }
        } else if (slotsData.slots) {
          if (typeof slotsData.slots === "object" && !Array.isArray(slotsData.slots)) {
            Object.entries(slotsData.slots).forEach(([key, slots]: [string, any]) => {
              if (Array.isArray(slots) && slots.length > 0) {
                monthKeys.add(key);
              }
            });
          } else if (Array.isArray(slotsData.slots)) {
            slotsData.slots.forEach(addSlotDateKey);
          }
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

  const handlePackageClick = (pkg: PackageData & { key: string }) => {
    setSelectedPackage(pkg);
    setSelectedPackageKey(pkg.key); // Save the English key for Cal.com API
    setExtraHour(false);
    setSelectedDate(undefined);
    setSelectedTime("");
    setAvailableSlots([]);
    setCalendarDate(new Date()); // Reset calendar to current month
    setAvailableDateKeys(new Set());
    setHasFetchedMonthAvailability(false);
    setIsModalOpen(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    // Clear previous selection properly
    if (date) {
      setSelectedDate(date);
      setSelectedTime(""); // Reset time when date changes
    } else {
      // If date is undefined (deselected), clear everything
      setSelectedDate(undefined);
      setSelectedTime("");
      setAvailableSlots([]);
    }
  };

  const handleTimeSelect = (slot: AvailableSlot) => {
    const slotDate = parseISO(slot.time);
    setSelectedTime(formatLithuanianTime(slotDate));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPackage) {
      toast({
        title: t("booking.toasts.noPackage.title"),
        description: t("booking.toasts.noPackage.description"),
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    if (!formData.name || !formData.email) {
      toast({
        title: t("booking.toasts.missingInfo.title"),
        description: t("booking.toasts.missingInfo.description"),
        variant: "destructive",
      });
      return;
    }

    // Validate date and time
    if (!selectedDate || !selectedTime) {
      toast({
        title: t("booking.toasts.missingDateTime.title"),
        description: t("booking.toasts.missingDateTime.description"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the selected slot
      const selectedSlot = availableSlots.find(slot => {
        const slotDate = parseISO(slot.time);
        const slotTimeStr = formatLithuanianTime(slotDate);
        return slotTimeStr === selectedTime && isSameDay(slotDate, selectedDate);
      });

      if (!selectedSlot) {
        throw new Error("Selected time slot is no longer available");
      }

      // Use the slot's ISO time directly (already in correct timezone)
      const startTime = selectedSlot.start;

      // Get event type ID based on package and extra hour
      const eventTypeId = getEventTypeId(selectedPackageKey, extraHour);

      if (!eventTypeId || eventTypeId === 0) {
        throw new Error("Event Type ID not configured. Please update calcom-api.config.ts with your Cal.com event type IDs.");
      }

      console.log("📅 Creating booking:", {
        package: selectedPackage.name,
        extraHour,
        eventTypeId,
        startTime,
        attendee: formData.name,
        timeZone: LITHUANIAN_TIMEZONE,
      });

      // Create booking via Cal.com API with Lithuanian timezone
      const booking = await createCalComBooking({
        eventTypeId,
        start: startTime,
        attendee: {
          name: formData.name,
          email: formData.email,
          timeZone: LITHUANIAN_TIMEZONE,
          phoneNumber: formData.phone || undefined,
        },
        metadata: {
          package: selectedPackage.name,
          packagePrice: selectedPackage.price,
          extraHour: extraHour ? "Yes" : "No",
        },
      });

      console.log("✅ Booking created:", booking);

      // Format date/time for emails in Lithuanian timezone
      const bookingDateObj = parseISO(startTime);
      const bookingDate = formatLithuanianDate(bookingDateObj);
      const bookingTime = formatLithuanianTime(bookingDateObj);

      // Calculate end time
      const totalDurationMinutes = getTotalDurationMinutes();
      const endDateTime = new Date(bookingDateObj.getTime() + totalDurationMinutes * 60 * 1000);
      const bookingEndTime = formatLithuanianTime(endDateTime);

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
        extra_notes: formData.extraNotes || "No additional notes",
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
      const successMsg = t("booking.toasts.success.description")
        .replace("{package}", selectedPackage.name)
        .replace("{date}", bookingDate)
        .replace("{time}", bookingTime);
      
      toast({
        title: t("booking.toasts.success.title"),
        description: successMsg,
      });

      // Reset and close
      setFormData({ name: "", phone: "", email: "", extraNotes: "" });
      setExtraHour(false);
      setSelectedDate(undefined);
      setSelectedTime("");
      setAvailableSlots([]);
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
                          // Only disable past dates
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
                                const isSelected = selectedTime === timeStr;
                                
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
                            {extraHour && " + $50"}
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
                        placeholder="+370 671 60928"
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

                    {selectedDate && selectedTime && (
                      <Card className="border-2 border-primary">
                        <CardContent className="p-4">
                          <p className="text-sm font-semibold mb-1">{t("booking.modal.selectedBooking")}</p>
                          <p className="text-sm">
                            {formatInTimeZone(selectedDate, LITHUANIAN_TIMEZONE, "EEEE, MMMM d, yyyy")} {t("booking.modal.at")} {selectedTime}
                          </p>
                        </CardContent>
                      </Card>
                    )}

                    <div className="pt-4 space-y-2">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting || !selectedDate || !selectedTime}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

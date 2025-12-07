/**
 * Google Calendar API Configuration (via Google Apps Script)
 * 
 * Custom Google Apps Script integration that provides
 * availability checking and booking creation.
 */

// Lithuanian timezone constant
export const LITHUANIAN_TIMEZONE = "Europe/Vilnius";

// Google Apps Script Web App configuration
export const googleCalendarConfig = {
  // Web App URL from Google Apps Script deployment
  apiUrl: import.meta.env.VITE_GOOGLE_CALENDAR_API_URL || "",
  
  // API Secret for authentication
  apiSecret: import.meta.env.VITE_GOOGLE_CALENDAR_API_SECRET || "",
};

// Debug: Log config on load (remove in production)
console.log("🔧 Google Calendar Config:", {
  apiUrl: googleCalendarConfig.apiUrl ? `${googleCalendarConfig.apiUrl.substring(0, 50)}...` : "NOT SET",
  apiSecretLength: googleCalendarConfig.apiSecret?.length || 0,
});

// Package durations in minutes
export const PACKAGE_DURATIONS: Record<string, number> = {
  "2 hour session": 120,
  "4 hour session": 240,
  "6 hour session": 360,
  "8 hour Session": 480,
  "10 hour Session": 600,
};

/**
 * Get package duration in minutes
 */
export function getPackageDuration(packageName: string, withExtraHour: boolean): number {
  const baseDuration = PACKAGE_DURATIONS[packageName] || 120;
  return withExtraHour ? baseDuration + 60 : baseDuration;
}

/**
 * Available slot interface
 */
export interface AvailableSlot {
  start: string; // ISO string
}

/**
 * Booking response interface
 */
export interface BookingResponse {
  success: boolean;
  booking?: {
    id: string;
    title: string;
    start: string;
    end: string;
  };
  icsContent?: string;
  calendarLinks?: {
    google: string;
    outlook: string;
  };
  error?: string;
}

/**
 * Get available time slots from Google Apps Script
 */
export async function getAvailableSlots(data: {
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  durationMinutes: number;
}): Promise<{ success: boolean; data: Record<string, AvailableSlot[]>; timezone: string }> {
  const params = new URLSearchParams({
    apiSecret: googleCalendarConfig.apiSecret,
    startDate: data.startDate,
    endDate: data.endDate,
    durationMinutes: data.durationMinutes.toString(),
  });

  const url = `${googleCalendarConfig.apiUrl}?${params.toString()}`;
  console.log("📅 Fetching slots from Google Calendar API...");

  // Don't set Content-Type header for GET requests to avoid CORS preflight
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Google Calendar API error:", errorText);
    throw new Error(`Google Calendar API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  
  if (!result.success) {
    console.error("❌ Google Calendar API returned error:", result.error);
    throw new Error(result.error || "Failed to fetch available slots");
  }

  console.log("✅ Available slots fetched from Google Calendar");
  return result;
}

/**
 * Create a booking via Google Apps Script
 */
export async function createGoogleCalendarBooking(data: {
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  name: string;
  email: string;
  phone?: string;
  packageName: string;
  packagePrice: string;
  extraHour?: boolean;
  extraNotes?: string;
  extraServices?: {
    vocalRecording: boolean;
    mixMaster: boolean;
    instrumental: boolean;
  };
  totalPrice?: number; // Total price including extras
}): Promise<BookingResponse> {
  console.log("📅 Creating booking via Google Calendar API...", data);

  // Use URL params to avoid CORS preflight issues with POST
  // Google Apps Script handles this better than JSON body
  const bookingData = {
    apiSecret: googleCalendarConfig.apiSecret,
    action: "book",
    startTime: data.startTime,
    endTime: data.endTime,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    packageName: data.packageName,
    packagePrice: data.packagePrice,
    extraHour: data.extraHour ? "true" : "false",
    extraNotes: data.extraNotes || "",
    extraServices: JSON.stringify(data.extraServices || {}),
    totalPrice: (data.totalPrice || 0).toString(),
  };

  const params = new URLSearchParams(bookingData as Record<string, string>);
  const url = `${googleCalendarConfig.apiUrl}?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
  });

  const result = await response.json();

  if (!result.success) {
    console.error("❌ Booking creation failed:", result.error);
    throw new Error(result.error || "Failed to create booking");
  }

  console.log("✅ Booking created successfully:", result);
  return result;
}

/**
 * Download ICS file
 */
export function downloadICSFile(icsContent: string, filename: string = "booking.ics"): void {
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


/**
 * Google Calendar API Configuration (via Google Apps Script)
 * 
 * Updated for hardened Google Apps Script API
 * - GET /availability is public (no secret)
 * - POST /book requires API secret in JSON body
 */

// Lithuanian timezone constant
export const LITHUANIAN_TIMEZONE = "Europe/Vilnius";

// Google Apps Script Web App configuration
export const googleCalendarConfig = {
  // Web App URL from Google Apps Script deployment
  apiUrl: import.meta.env.VITE_GOOGLE_CALENDAR_API_URL || "",
  
  // API Secret for authentication (should be sent via server proxy ideally)
  apiSecret: import.meta.env.VITE_GOOGLE_CALENDAR_API_SECRET || "",
};

// Debug: Log config on load (remove in production)
console.log("🔧 Google Calendar Config:", {
  apiUrl: googleCalendarConfig.apiUrl ? `${googleCalendarConfig.apiUrl.substring(0, 50)}...` : "NOT SET",
  apiSecretLength: googleCalendarConfig.apiSecret?.length || 0,
});

// Package durations in minutes (frontend keys)
export const PACKAGE_DURATIONS: Record<string, number> = {
  "2 hour session": 120,
  "4 hour session": 240,
  "6 hour session": 360,
  "8 hour session": 480,
  "10 hour session": 600,
};

// Map frontend package keys to script package IDs
export const PACKAGE_ID_MAP: Record<string, string> = {
  "2 hour session": "studio_2h",
  "4 hour session": "studio_4h",
  "6 hour session": "studio_6h",
  "8 hour session": "studio_8h",
  "10 hour session": "studio_10h",
};

/**
 * Get package ID for the script from frontend package key
 */
export function getPackageId(packageKey: string): string {
  return PACKAGE_ID_MAP[packageKey] || "studio_2h";
}

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
 * GET /availability - Public endpoint (no secret required)
 */
export async function getAvailableSlots(data: {
  startDate: string; // ISO date string (yyyy-MM-dd)
  endDate: string;   // ISO date string (yyyy-MM-dd)
  durationMinutes: number;
}): Promise<{ success: boolean; data: Record<string, AvailableSlot[]>; timezone: string }> {
  const params = new URLSearchParams({
    startDate: data.startDate,
    endDate: data.endDate,
    durationMinutes: data.durationMinutes.toString(),
  });

  const clientId = localStorage.getItem("clientId") || crypto.randomUUID();
  localStorage.setItem("clientId", clientId);
  params.set("clientId", clientId);

  const url = `${googleCalendarConfig.apiUrl}?${params.toString()}`;
  console.log("📅 Fetching slots from Google Calendar API...");

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
 * POST /book - Requires API secret in JSON body
 */
export async function createGoogleCalendarBooking(data: {
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  name: string;
  email: string;
  phone?: string;
  packageKey: string; // Frontend package key (will be mapped to packageId)
  extraHour?: boolean;
  extraNotes?: string;
  extraServices?: {
    vocalRecording: boolean;
    mixMaster: boolean;
    instrumental: boolean;
  };
  formLoadTime: string; // ISO timestamp when form was loaded
  website?: string;      // Honeypot field
  url?: string;          // Honeypot field
  honeypot?: string;     // Honeypot field
}): Promise<BookingResponse> {
  console.log("📅 Creating booking via Google Calendar API...", data);

  // Map frontend package key to script package ID
  const packageId = getPackageId(data.packageKey);

  // Prepare request body matching script expectations
  const requestBody = {
    apiSecret: googleCalendarConfig.apiSecret,
    startTime: data.startTime,
    endTime: data.endTime,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    packageId: packageId,
    extraHour: data.extraHour || false,
    extraServices: {
      vocalRecording: data.extraServices?.vocalRecording || false,
      mixMaster: data.extraServices?.mixMaster || false,
      instrumental: data.extraServices?.instrumental || false,
    },
    extraNotes: data.extraNotes || "",
    formLoadTime: data.formLoadTime,
    // Honeypot fields - must be empty strings, not undefined
    website: data.website || "",
    url: data.url || "",
    honeypot: data.honeypot || "",
  };

  const response = await fetch(googleCalendarConfig.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(requestBody),
    redirect: "follow",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Booking creation failed:", errorText);
    let errorMessage = "Failed to create booking";
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.error || errorMessage;
    } catch {
      errorMessage = errorText || errorMessage;
    }
    throw new Error(errorMessage);
  }

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


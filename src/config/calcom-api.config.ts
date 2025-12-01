/**
 * Cal.com API Configuration
 * 
 * API Documentation: https://cal.com/docs/api-reference/v2
 */

// Lithuanian timezone constant
export const LITHUANIAN_TIMEZONE = "Europe/Vilnius";

export const calcomApiConfig = {
  // API key loaded from environment variable for security
  // Get your API key from: https://app.cal.com/settings/developer/api-keys
  apiKey: import.meta.env.VITE_CALCOM_API_KEY || "",
  
  // Cal.com API base URL (v2)
  apiBaseUrl: "https://api.cal.com/v2",
};

/**
 * Event Type IDs for each package
 * Find these by going to: https://app.cal.com/event-types
 * Click on an event type, look at the URL: /event-types/[ID]
 */
export const eventTypeIds = {
  // Base event types - loaded from environment variables
  base: {
    "2 hour session": Number(import.meta.env.VITE_EVENT_TYPE_2H) || 0,
    "4 hour session": Number(import.meta.env.VITE_EVENT_TYPE_4H) || 0,
    "6 hour session": Number(import.meta.env.VITE_EVENT_TYPE_6H) || 0,
    "8 hour Session": Number(import.meta.env.VITE_EVENT_TYPE_8H) || 0,
    "10 hour Session": Number(import.meta.env.VITE_EVENT_TYPE_10H) || 0,
  },
  // Event types with extra hour - loaded from environment variables
  withExtra: {
    "2 hour session": Number(import.meta.env.VITE_EVENT_TYPE_2H_EXTRA) || 0,
    "4 hour session": Number(import.meta.env.VITE_EVENT_TYPE_4H_EXTRA) || 0,
    "6 hour session": Number(import.meta.env.VITE_EVENT_TYPE_6H_EXTRA) || 0,
    "8 hour Session": Number(import.meta.env.VITE_EVENT_TYPE_8H_EXTRA) || 0,
    "10 hour Session": Number(import.meta.env.VITE_EVENT_TYPE_10H_EXTRA) || 0,
  }
};

/**
 * Get event type ID based on package and extra hour selection
 */
export function getEventTypeId(packageName: string, withExtraHour: boolean): number {
  const typeMap = withExtraHour ? eventTypeIds.withExtra : eventTypeIds.base;
  return typeMap[packageName as keyof typeof typeMap] || 0;
}

/**
 * Create a booking via Cal.com API
 */
export async function createCalComBooking(data: {
  eventTypeId: number;
  start: string; // ISO 8601 format
  attendee: {
    name: string;
    email: string;
    timeZone: string;
    phoneNumber?: string;
  };
  meetingUrl?: string;
  metadata?: Record<string, any>;
}) {
  console.log("📅 Creating Cal.com booking via API...", data);

  const response = await fetch(`${calcomApiConfig.apiBaseUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${calcomApiConfig.apiKey}`,
      "cal-api-version": "2024-08-13",
    },
    body: JSON.stringify({
      eventTypeId: data.eventTypeId,
      start: data.start,
      attendee: {
        name: data.attendee.name,
        email: data.attendee.email,
        timeZone: data.attendee.timeZone,
        ...(data.attendee.phoneNumber && { phoneNumber: data.attendee.phoneNumber }),
      },
      ...(data.metadata && { metadata: data.metadata }),
      ...(data.meetingUrl && { meetingUrl: data.meetingUrl }),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Cal.com API error:", errorText);
    throw new Error(`Cal.com API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  console.log("✅ Cal.com booking created:", result);
  return result;
}

/**
 * Get available time slots for an event type
 * API Reference: https://cal.com/docs/api-reference/v2/slots/get-available-time-slots-for-an-event-type
 * 
 * Endpoint: GET /v2/slots
 * Parameters: eventTypeId, start (ISO 8601), end (ISO 8601), timeZone
 */
export async function getAvailableSlots(data: {
  eventTypeId: number;
  startTime: string; // ISO date (YYYY-MM-DD) or ISO datetime
  endTime: string;   // ISO date (YYYY-MM-DD) or ISO datetime
  timeZone: string;
}) {
  // Cal.com API expects ISO 8601 format for dates
  // Try with just date first (YYYY-MM-DD), if that fails, use full ISO datetime
  const params = new URLSearchParams({
    eventTypeId: data.eventTypeId.toString(),
    start: data.startTime,
    end: data.endTime,
    timeZone: data.timeZone,
  });

  console.log("📅 Fetching slots from:", `${calcomApiConfig.apiBaseUrl}/slots?${params.toString()}`);

  const response = await fetch(
    `${calcomApiConfig.apiBaseUrl}/slots?${params}`,
    {
      headers: {
        "Authorization": `Bearer ${calcomApiConfig.apiKey}`,
        "cal-api-version": "2024-09-04", // Updated to latest version
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `Failed to fetch available slots: ${response.statusText}`;
    
    try {
      const errorJson = JSON.parse(errorText);
      console.error("❌ Cal.com API error response:", errorJson);
      if (errorJson.error?.message) {
        errorMessage = `Cal.com API error: ${errorJson.error.message}`;
      }
    } catch {
      console.error("❌ Failed to fetch available slots (raw):", errorText);
    }
    
    // If 404, suggest checking endpoint format
    if (response.status === 404) {
      console.error("💡 404 Error - The endpoint might be incorrect. Check Cal.com API docs for the correct endpoint format.");
      console.error("💡 Tried endpoint:", `${calcomApiConfig.apiBaseUrl}/slots/available`);
      console.error("💡 Event Type ID:", data.eventTypeId);
    }
    
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log("✅ Available slots fetched:", result);
  return result;
}

/**
 * Get available slots for a date range (for calendar view)
 * Returns slots grouped by date
 */
export async function getAvailableSlotsForDateRange(data: {
  eventTypeId: number;
  startDate: Date; // Start of date range
  endDate: Date;    // End of date range (e.g., +30 days)
  timeZone: string;
}) {
  // Format as ISO datetime strings for the API
  const startTime = data.startDate.toISOString();
  const endTime = data.endDate.toISOString();

  return await getAvailableSlots({
    eventTypeId: data.eventTypeId,
    startTime,
    endTime,
    timeZone: data.timeZone,
  });
}


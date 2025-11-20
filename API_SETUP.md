# Cal.com API Setup - Direct Booking

## 🎯 How It Works Now

**Simple and Direct:**
1. User fills form ONCE (name, email, phone, date, time)
2. User clicks "Complete Booking"
3. System creates booking via Cal.com API
4. Emails sent automatically
5. Done! ✅

**No confirmation screens, no extra steps.**

---

## ⚙️ Configuration Required (10 Minutes)

### Step 1: Get Your Cal.com API Key (3 min)

1. Go to: **https://app.cal.com/settings/developer/api-keys**
2. Click **"Create API Key"**
3. Give it a name: "Studio Bookings"
4. Copy the API key (starts with `cal_live_...`)
5. Open `src/config/calcom-api.config.ts`
6. Replace the TODO with your API key:

```typescript
export const calcomApiConfig = {
  apiKey: "cal_live_YOUR_KEY_HERE", // 👈 Paste your key
  apiBaseUrl: "https://api.cal.com/v2",
};
```

---

### Step 2: Get Your Event Type IDs (5 min)

You need the **numeric ID** for each event type.

#### How to Find Event Type IDs:

1. Go to: **https://app.cal.com/event-types**
2. Click on an event type (e.g., "Basic Session")
3. Look at the URL in your browser:
   ```
   https://app.cal.com/event-types/[ID]/edit
                                      ↑
                                   This number!
   ```
4. Copy that number

#### Repeat for All Event Types:

You need **8 event type IDs** total:

**Base Event Types (no extra hour):**
- Basic Session (2 hours) → ID: `______`
- Standard Session (4 hours) → ID: `______`
- Premium Session (8 hours) → ID: `______`
- Full Day Session (12 hours) → ID: `______`

**With Extra Hour:**
- Basic + Extra (3 hours) → ID: `______`
- Standard + Extra (5 hours) → ID: `______`
- Premium + Extra (9 hours) → ID: `______`
- Full Day + Extra (13 hours) → ID: `______`

#### Update Config:

Open `src/config/calcom-api.config.ts`:

```typescript
export const eventTypeIds = {
  // Base event types
  base: {
    "Basic Session": 123456,        // 👈 Your 2-hour event ID
    "Standard Session": 234567,     // 👈 Your 4-hour event ID
    "Premium Session": 345678,      // 👈 Your 8-hour event ID
    "Full Day Session": 456789,     // 👈 Your 12-hour event ID
  },
  // Event types with extra hour
  withExtra: {
    "Basic Session": 567890,        // 👈 Your 3-hour event ID
    "Standard Session": 678901,     // 👈 Your 5-hour event ID
    "Premium Session": 789012,      // 👈 Your 9-hour event ID
    "Full Day Session": 890123,     // 👈 Your 13-hour event ID
  }
};
```

---

### Step 3: Create Event Types (if not done yet)

If you haven't created event types with extra hour durations:

1. Go to: **https://app.cal.com/event-types**
2. For each package, create **TWO event types**:

**Example for Basic Session:**

**Event 1: Basic Session**
- Name: `Basic Session`
- Duration: `120 minutes` (2 hours)
- URL: `secret` (or your choice)

**Event 2: Basic Session + Extra Hour**
- Name: `Basic Session + Extra`
- Duration: `180 minutes` (3 hours)
- URL: `secret-extra` (or your choice)

**Repeat for:**
- Standard (4hr + 5hr)
- Premium (8hr + 9hr)
- Full Day (12hr + 13hr)

---

## 🧪 Testing

```bash
npm run dev
```

### Test Flow:

1. Click "Basic Session" package
2. Modal opens
3. Fill form:
   - Name: Your name
   - Email: Your email
   - Phone: Your phone
   - Date: Tomorrow
   - Time: 2:00 PM
4. Check "Add Extra Hour" (optional)
5. Click "Complete Booking"
6. ✅ Success message appears
7. ✅ Check your email (owner notification)
8. ✅ Check user email (confirmation)
9. ✅ Check Cal.com dashboard (booking appears)
10. ✅ Check Google Calendar (event appears)

---

## 🔍 What Gets Sent

### To Cal.com API:

```json
{
  "eventTypeId": 123456,
  "start": "2024-01-15T14:00:00.000Z",
  "attendee": {
    "name": "John Doe",
    "email": "john@example.com",
    "timeZone": "America/New_York",
    "phoneNumber": "+1234567890"
  },
  "metadata": {
    "package": "Basic Session",
    "packagePrice": "$150",
    "extraHour": "Yes"
  }
}
```

### To EmailJS:

**Owner Email:**
- All booking details
- Customer name, email, phone
- Selected date and time
- Package and price

**User Email:**
- Confirmation of booking
- Date and time
- Package and duration
- Studio contact info

---

## ✅ Benefits of API Approach

| Feature | Status |
|---------|--------|
| **One-step booking** | ✅ Fill form, click submit, done |
| **Calendar sync** | ✅ Cal.com handles automatically |
| **No UI confirmation** | ✅ No extra screens |
| **Fast** | ✅ Direct API call |
| **Extra hour** | ✅ Different event type IDs |
| **Emails** | ✅ Sent after successful booking |
| **Customer info** | ✅ Included in Cal.com event |

---

## 🐛 Troubleshooting

### Error: "Event Type ID not configured"

**Solution:** Update `eventTypeIds` in `src/config/calcom-api.config.ts` with your actual IDs.

### Error: "Cal.com API error (401)"

**Solution:** Check your API key in `calcomApiConfig.apiKey`. Make sure it's valid and active.

### Error: "Cal.com API error (400)"

**Possible causes:**
- Invalid date/time format
- Event type ID doesn't exist
- Event type not enabled

**Solution:** Verify event type IDs are correct and event types are active in Cal.com.

### Booking created but no email sent

**Solution:** Check EmailJS configuration in `src/config/emailjs.config.ts`. Verify template IDs and "To Email" settings.

### Booking created but not syncing to Google Calendar

**Solution:** In Cal.com, go to the event type settings and ensure your Google Calendar is connected and selected.

---

## 📊 How It Works Behind the Scenes

```
User fills form
   ↓
User clicks "Complete Booking"
   ↓
System calls Cal.com API:
POST /v2/bookings
   ↓
Cal.com creates booking:
  ✅ Saves to database
  ✅ Syncs to Google Calendar
  ✅ Blocks time slot
  ✅ Includes customer info
   ↓
System sends EmailJS emails:
  ✅ Owner notification
  ✅ User confirmation
   ↓
Success toast appears
Modal closes
Form resets
   ↓
✅ DONE!
```

---

## 🎯 Summary

**Configuration:**
1. Get API key from Cal.com → Paste in config
2. Get event type IDs → Paste in config
3. Test

**User Experience:**
1. Fill form once
2. Click submit
3. Done!

**No confirmation screens, no extra steps, no complications.**

**Total setup time: 10 minutes**

---

## 📝 Configuration Checklist

```
✅ Cal.com API key added to calcom-api.config.ts
✅ 8 event type IDs added to calcom-api.config.ts
✅ Event types created in Cal.com (base + extra hour)
✅ Event types connected to Google Calendar
✅ EmailJS configured (service ID, template IDs)
✅ Tested complete booking flow
✅ Verified emails sent
✅ Verified calendar sync
```

---

**Simple, direct, reliable.** 🚀


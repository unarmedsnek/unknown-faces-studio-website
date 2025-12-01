# API Setup Guide

This guide explains how to configure Cal.com and EmailJS for the booking system.

## 📋 Overview

The website uses:
- **Cal.com** - For booking management and calendar scheduling
- **EmailJS** - For sending booking confirmation emails

All credentials are stored in `.env.local` (never committed to git).

## 🔧 Cal.com Setup

### Step 1: Get API Key (3 minutes)

1. Go to https://app.cal.com/settings/developer/api-keys
2. Click "Create API Key"
3. Name it "Studio Bookings"
4. Copy the API key (starts with `cal_live_...`)
5. Add to `.env.local`:
   ```env
   VITE_CALCOM_API_KEY=cal_live_YOUR_KEY_HERE
   ```

### Step 2: Create Event Types (10 minutes)

Create event types for each booking package. You need TWO event types per package: one standard, one with an extra hour.

**Example for 2-hour session:**
- Event 1: "2 Hour Session" → Duration: 2 hours
- Event 2: "2 Hour Session + Extra" → Duration: 3 hours

Repeat for all packages:
- 2 hour session (base + extra)
- 4 hour session (base + extra)
- 6 hour session (base + extra)
- 8 hour session (base + extra)
- 10 hour session (base + extra)

### Step 3: Get Event Type IDs (5 minutes)

For each event type:
1. Go to https://app.cal.com/event-types
2. Click on the event type
3. Look at the URL: `https://app.cal.com/event-types/[ID]/edit`
4. Copy the numeric ID

Add all IDs to `.env.local`:
```env
# Base durations
VITE_EVENT_TYPE_2H=1234567
VITE_EVENT_TYPE_4H=1234568
VITE_EVENT_TYPE_6H=1234569
VITE_EVENT_TYPE_8H=1234570
VITE_EVENT_TYPE_10H=1234571

# With extra hour
VITE_EVENT_TYPE_2H_EXTRA=1234572
VITE_EVENT_TYPE_4H_EXTRA=1234573
VITE_EVENT_TYPE_6H_EXTRA=1234574
VITE_EVENT_TYPE_8H_EXTRA=1234575
VITE_EVENT_TYPE_10H_EXTRA=1234576
```

## 📧 EmailJS Setup

### Step 1: Create Account

1. Sign up at https://www.emailjs.com/
2. Connect your email service (Gmail, Outlook, etc.)

### Step 2: Create Email Templates

Create two templates:

**Template 1: Owner Notification**
- Name: "Studio Booking Request"
- To: Your studio email
- Variables: `{{package_name}}`, `{{package_price}}`, `{{user_name}}`, `{{user_email}}`, `{{user_phone}}`, `{{extra_notes}}`

**Template 2: User Confirmation**
- Name: "Booking Confirmation"
- To: `{{user_email}}`
- Variables: `{{user_name}}`, `{{package_name}}`, `{{package_price}}`

### Step 3: Get Credentials

1. **Service ID**: https://dashboard.emailjs.com/admin/integration
2. **Template IDs**: Click on each template to see its ID
3. **Public Key**: https://dashboard.emailjs.com/admin/account

Add to `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_USER_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## ✅ Testing

1. Restart your dev server: `npm run dev`
2. Go to the booking page
3. Select a package and try to book
4. Check browser console for any errors
5. Verify emails are sent correctly

## 🔒 Security Notes

- Never commit `.env.local` to git
- Config files (`src/config/*.ts`) are gitignored
- Only `.env.template` with placeholder values should be in git
- For production, set environment variables in your hosting platform

## 🆘 Troubleshooting

### "API key not found"
- Check `.env.local` exists in project root
- Verify `VITE_CALCOM_API_KEY` is set
- Restart dev server

### "Event type undefined"
- Check all `VITE_EVENT_TYPE_*` variables are set
- Verify IDs are numeric (no quotes in .env.local)

### "EmailJS error"
- Check all `VITE_EMAILJS_*` variables are set
- Verify credentials in EmailJS dashboard
- Check email service is connected

---

For more details, see the official documentation:
- Cal.com API: https://cal.com/docs/api-reference/v2
- EmailJS: https://www.emailjs.com/docs/

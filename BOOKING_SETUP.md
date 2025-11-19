# Booking System Setup Guide

This guide will help you configure the Cal.com calendar booking and EmailJS email functionality for your Unknown Faces Studio website.

## 📋 Overview

The booking system includes:
- **Package Selection**: Clickable package cards that open a booking modal
- **Cal.com Integration**: Embedded calendar for date/time selection
- **EmailJS Integration**: Automated emails to studio owner and customers
- **Google Maps**: Location map on the "Where to Find Us" page

---

## 🗓️ Part 1: Cal.com Setup

### Step 1: Create a Cal.com Account
1. Go to [cal.com](https://cal.com/) and sign up
2. Complete your profile setup
3. Note your **username** (found at Settings → My Account → Profile)

### Step 2: Create Event Types
Create 4 event types matching your packages:

| Package Name | Duration | Suggested Slug |
|-------------|----------|----------------|
| Basic Session | 2 hours | `2-hour-session` |
| Standard Session | 4 hours | `4-hour-session` |
| Premium Session | 8 hours | `8-hour-session` |
| Full Day Session | 12 hours | `12-hour-session` |

**To create event types:**
1. Go to Event Types → New Event Type
2. Set the duration (in minutes: 120, 240, 480, 720)
3. Configure your availability
4. Note the **event type slug** (URL path)

### Step 3: Configure Cal.com in Your Project
1. Open `src/config/cal.config.ts`
2. Replace `YOUR_CAL_USERNAME` with your actual Cal.com username
3. Update the `eventTypes` object with your event type slugs:

```typescript
export const calConfig = {
  username: "your-cal-username", // ← Change this
  
  eventTypes: {
    "Basic Session": "2-hour-session",      // ← Update these
    "Standard Session": "4-hour-session",
    "Premium Session": "8-hour-session",
    "Full Day Session": "12-hour-session",
  },
  
  embedConfig: {
    layout: "month_view",
    theme: "light",
  },
};
```

---

## 📧 Part 2: EmailJS Setup

### Step 1: Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/) and sign up
2. Verify your email address

### Step 2: Add an Email Service
1. Go to Email Services → Add New Service
2. Choose your email provider (Gmail, Outlook, etc.)
3. Connect your email account
4. Note your **Service ID**

### Step 3: Create Email Templates

#### Owner Notification Template
This email is sent to you when someone books:

1. Go to Email Templates → Create New Template
2. **Template Name**: Booking Notification (Owner)
3. **Template Content**:

```
Subject: New Booking Request - {{package_name}}

Hi,

You have a new booking request!

📦 Package Details:
- Package: {{package_name}}
- Price: {{package_price}}
- Duration: {{package_duration}}
- Extra Hour: {{extra_hour}}

👤 Customer Information:
- Name: {{user_name}}
- Email: {{user_email}}
- Phone: {{user_phone}}

The customer has selected their preferred date/time via Cal.com.
Please check your Cal.com dashboard to confirm the booking.

---
Unknown Faces Studio Booking System
```

4. Note the **Template ID**

#### Customer Confirmation Template
This email is sent to the customer as confirmation:

1. Create another new template
2. **Template Name**: Booking Confirmation (Customer)
3. **Template Content**:

```
Subject: Booking Confirmation - Unknown Faces Studio

Hi {{user_name}},

Thank you for booking with Unknown Faces Studio! 🎵

📋 Your Booking Details:
- Package: {{package_name}}
- Price: {{package_price}}
- Duration: {{package_duration}}

We've received your booking request and will review your selected date/time shortly. You'll receive a confirmation email once your booking is confirmed.

If you have any questions, feel free to reply to this email or call us at +1 (555) 123-4567.

Looking forward to working with you!

Best regards,
Unknown Faces Studio Team

---
📍 123 Music Street, Creative District
📧 hello@unknownfaces.studio
📞 +1 (555) 123-4567
```

4. Note the **Template ID**

### Step 4: Get Your Public Key
1. Go to Account → General
2. Copy your **Public Key**

### Step 5: Configure EmailJS in Your Project
1. Open `src/config/emailjs.config.ts`
2. Replace the placeholder values:

```typescript
export const emailjsConfig = {
  serviceId: "service_abc1234",              // ← Your Service ID
  ownerTemplateId: "template_owner_xyz",     // ← Owner template ID
  userTemplateId: "template_user_xyz",       // ← User template ID
  publicKey: "your_public_key_here",         // ← Your Public Key
};
```

---

## 🗺️ Part 3: Google Maps Setup

### Step 1: Get Your Google Maps Embed URL
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your studio address
3. Click the **Share** button
4. Click **Embed a map**
5. Copy the iframe `src` URL

### Step 2: Update the Map in Your Project
1. Open `src/pages/WhereToFindUs.tsx`
2. Find the `<iframe>` element (around line 87)
3. Replace the `src` URL with your copied URL:

```tsx
<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL_HERE"
  width="100%"
  height="600"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Studio Location Map"
/>
```

### Step 3: Update Your Address
In the same file, update your actual studio address:

```tsx
<p className="text-foreground/80 font-mono text-sm">
  123 Music Street<br />
  Creative District<br />
  City, State 12345<br />
  United States
</p>
```

---

## 🚀 Testing Your Setup

### Test the Booking Flow
1. Start your development server: `npm run dev`
2. Navigate to the Booking page
3. Click on a package card → Modal should open
4. Verify the Cal.com calendar loads (if configured correctly)
5. Fill out the form with test data
6. Click "Submit Booking Request"
7. Check for success toast notification
8. Verify you receive the owner email
9. Verify the test customer receives the confirmation email

### Test the Map
1. Navigate to "Where to Find Us" page
2. Verify the Google Map loads showing your studio location
3. Test map interactions (zoom, pan)

---

## 📝 Configuration Files Reference

### Cal.com Config
**Location**: `src/config/cal.config.ts`
- Cal.com username
- Event type slugs
- Embed preferences

### EmailJS Config
**Location**: `src/config/emailjs.config.ts`
- Service ID
- Template IDs (owner & user)
- Public key

### Map Configuration
**Location**: `src/pages/WhereToFindUs.tsx`
- Google Maps embed URL
- Studio address details
- Contact information

---

## 🔧 Troubleshooting

### Cal.com not loading
- ✅ Check that `cal.config.ts` has correct username
- ✅ Verify event type slugs match your Cal.com event URLs
- ✅ Make sure your Cal.com event types are active
- ✅ Check browser console for errors

### Emails not sending
- ✅ Verify all EmailJS credentials in `emailjs.config.ts`
- ✅ Check EmailJS dashboard for delivery status
- ✅ Make sure email service is connected and verified
- ✅ Check spam/junk folders for test emails
- ✅ Verify template variable names match exactly

### Map not loading
- ✅ Ensure Google Maps embed URL is complete
- ✅ Check that the URL starts with `https://www.google.com/maps/embed`
- ✅ Try accessing the map URL directly in browser
- ✅ Check browser console for CORS or loading errors

---

## 💡 Additional Features

### Listening to Cal.com Events
You can listen to Cal.com booking events to capture booking details:

```typescript
useEffect(() => {
  const handleCalEvent = (e: MessageEvent) => {
    if (e.data.event === 'cal:booking_confirmed') {
      const bookingDetails = e.data.booking;
      console.log('Booking confirmed:', bookingDetails);
      // You can send this data along with the EmailJS emails
    }
  };

  window.addEventListener('message', handleCalEvent);
  return () => window.removeEventListener('message', handleCalEvent);
}, []);
```

### Customizing Email Templates
In your EmailJS templates, you have access to these variables:
- `{{package_name}}` - Selected package name
- `{{package_price}}` - Package price
- `{{package_duration}}` - Session duration
- `{{extra_hour}}` - Whether extra hour was selected
- `{{user_name}}` - Customer's name
- `{{user_email}}` - Customer's email
- `{{user_phone}}` - Customer's phone number

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Review the configuration files for typos
3. Verify all API keys and credentials are correct
4. Check the respective service dashboards (Cal.com, EmailJS) for status

---

**Happy booking! 🎵**


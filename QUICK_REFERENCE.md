# Quick Reference Card 📝

## 🚀 Quick Start (3 Steps)

### 1. Cal.com Setup (10 min)
```typescript
// File: src/config/cal.config.ts

export const calConfig = {
  username: "your-cal-username", // ← Change this
  eventTypes: {
    "Basic Session": "2-hour-session",
    "Standard Session": "4-hour-session", 
    "Premium Session": "8-hour-session",
    "Full Day Session": "12-hour-session",
  },
};
```

**What you need:**
- Cal.com account: https://cal.com/signup
- Your username (from Settings → My Account)
- 4 event types created (2hr, 4hr, 8hr, 12hr)

---

### 2. EmailJS Setup (15 min)
```typescript
// File: src/config/emailjs.config.ts

export const emailjsConfig = {
  serviceId: "service_abc1234",         // ← Your Service ID
  ownerTemplateId: "template_owner",    // ← Owner template
  userTemplateId: "template_user",      // ← User template
  publicKey: "your_public_key",         // ← Public key
};
```

**What you need:**
- EmailJS account: https://www.emailjs.com/
- Email service connected (Gmail/Outlook)
- 2 templates created (owner notification + user confirmation)

**Template Variables:**
`{{package_name}}`, `{{package_price}}`, `{{package_duration}}`, `{{extra_hour}}`, `{{user_name}}`, `{{user_email}}`, `{{user_phone}}`

---

### 3. Google Maps Setup (5 min)
```tsx
// File: src/pages/WhereToFindUs.tsx (line ~87)

<iframe
  src="YOUR_GOOGLE_MAPS_EMBED_URL_HERE" // ← Paste your URL
  width="100%"
  height="600"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Studio Location Map"
/>
```

**How to get URL:**
1. Go to Google Maps
2. Search your address
3. Click "Share" → "Embed a map"
4. Copy the `src` URL from the iframe code

---

## 📦 Files to Configure

| File | What to Update | Time |
|------|----------------|------|
| `src/config/cal.config.ts` | Cal.com username + event types | 2 min |
| `src/config/emailjs.config.ts` | EmailJS credentials | 2 min |
| `src/pages/WhereToFindUs.tsx` | Google Maps URL + address | 3 min |

**Total configuration time: ~7 minutes** (after accounts are set up)

---

## 🧪 Test Checklist

```bash
# 1. Start dev server
npm run dev

# 2. Test booking flow
✓ Visit http://localhost:5173/booking
✓ Click a package card
✓ Modal opens with Cal.com calendar
✓ Fill form and submit
✓ Check for success toast
✓ Verify emails received

# 3. Test map
✓ Visit http://localhost:5173/location
✓ Map loads and is interactive
```

---

## 🎯 Key Features Implemented

### Booking Page
- ✅ Clickable package cards with hover effects
- ✅ Modal dialog with booking form
- ✅ Cal.com calendar embed (dynamic per package)
- ✅ EmailJS dual emails (owner + user)
- ✅ Form validation
- ✅ Toast notifications
- ✅ Loading states

### Where To Find Us Page
- ✅ Google Maps iframe
- ✅ Interactive map (zoom, pan, street view)
- ✅ Sticky positioning on desktop
- ✅ Mobile responsive

---

## 🔑 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Cal.com Dashboard | https://app.cal.com/event-types | Manage event types |
| Cal.com Settings | https://cal.com/settings/my-account/profile | Get username |
| EmailJS Dashboard | https://dashboard.emailjs.com/admin | Get Service ID |
| EmailJS Templates | https://dashboard.emailjs.com/admin/templates | Create templates |
| Google Maps | https://www.google.com/maps | Get embed URL |

---

## 💡 Pro Tips

### Cal.com
- Create separate event types for each duration (don't use dynamic duration)
- Test booking yourself first
- Set buffer times between bookings
- Configure email reminders in Cal.com settings

### EmailJS
- Use test mode first before going live
- Check spam folders during testing
- Monitor usage in EmailJS dashboard (free tier: 200 emails/month)
- Add professional reply-to email address

### Google Maps
- Use "Satellite" view for studios
- Add custom marker if needed (Google My Business)
- Consider adding driving directions in surrounding text
- Test map on mobile devices

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Cal.com not loading | Check username and event type slugs in `cal.config.ts` |
| Emails not sending | Verify all credentials in `emailjs.config.ts` |
| Map not showing | Ensure iframe src URL is complete |
| Modal not opening | Check browser console for errors |
| Toast not appearing | Already configured in `App.tsx` ✓ |

---

## 📧 Email Template Examples

### Owner Template
```
Subject: 🎵 New Booking - {{package_name}}

New booking request from {{user_name}}!

📦 Package: {{package_name}} ({{package_duration}})
💰 Price: {{package_price}}
➕ Extra Hour: {{extra_hour}}

👤 Customer:
Name: {{user_name}}
Email: {{user_email}}
Phone: {{user_phone}}

Check Cal.com for date/time selection.
```

### User Template
```
Subject: Booking Confirmation - Unknown Faces Studio

Hi {{user_name}},

Thanks for booking with Unknown Faces Studio! 🎵

Your selection:
📦 {{package_name}}
⏱️ {{package_duration}}
💰 {{package_price}}

We'll confirm your booking shortly!

Unknown Faces Studio
hello@unknownfaces.studio
```

---

## 📱 Contact for Issues

If you encounter problems:
1. Check browser console (F12)
2. Verify all config files updated
3. Test each service independently
4. Check service dashboards for errors

---

## 🎉 You're All Set!

Once configured, your booking system will:
1. ✅ Display packages with pricing
2. ✅ Let users select date/time via Cal.com
3. ✅ Collect customer information
4. ✅ Send you booking notifications
5. ✅ Send customers confirmations
6. ✅ Show studio location on map

**Happy booking! 🎵**

---

*For detailed setup instructions, see `BOOKING_SETUP.md`*
*For implementation details, see `IMPLEMENTATION_SUMMARY.md`*


# API Setup Guide

This guide explains how to configure EmailJS for the booking system.

## 📋 Overview

The website uses:
- **Google Calendar** - For booking management and calendar scheduling (via Google Apps Script)
- **EmailJS** - For sending booking confirmation emails

All credentials are stored in `.env.local` (never committed to git).

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

### "EmailJS error"
- Check all `VITE_EMAILJS_*` variables are set
- Verify credentials in EmailJS dashboard
- Check email service is connected

---

For more details, see the official documentation:
- EmailJS: https://www.emailjs.com/docs/

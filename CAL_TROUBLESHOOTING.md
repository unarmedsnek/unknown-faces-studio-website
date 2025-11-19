# Cal.com Calendar Troubleshooting Guide

## Issue: "Cal is not defined" Error

If you're seeing "Cal is not defined" errors in the console, follow these steps to diagnose and fix the issue.

---

## 🔍 Diagnostic Steps

### 1. Open Browser Console
Press `F12` (or `Cmd+Option+J` on Mac) to open Developer Tools and go to the Console tab.

### 2. Test the Booking Flow
1. Navigate to the booking page (`/booking`)
2. Click on any package card
3. Watch the console for messages

### 3. Expected Console Messages

When working correctly, you should see:

```
Loading Cal.com embed script...
✅ Cal.com script loaded successfully
✅ window.Cal is available
📅 Modal opened for package: Basic Session
📅 Cal.com link: unarmed-snek-adbnl0/secret
Attempting to initialize Cal.com (attempt 1/20)...
✅ Cal.com found! Initializing...
✅ Cal.com initialized successfully
```

---

## ❌ Common Error Messages & Solutions

### Error: "❌ Failed to load Cal.com embed script"

**Cause:** Network issue or Cal.com is blocked

**Solutions:**
1. Check your internet connection
2. Check if `https://app.cal.com/embed/embed.js` is accessible
3. Check browser extensions (ad blockers, privacy tools) that might block Cal.com
4. Try a different browser
5. Check if you're behind a firewall/proxy that blocks Cal.com

**Test:** Open this URL directly in your browser:
```
https://app.cal.com/embed/embed.js
```
You should see JavaScript code, not an error page.

---

### Error: "❌ Cal.com script loaded but window.Cal is undefined"

**Cause:** Script loaded but Cal.com object didn't initialize

**Solutions:**
1. Hard refresh the page: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
2. Clear browser cache and reload
3. Check the Network tab in DevTools:
   - Look for `embed.js` request
   - Make sure it shows status 200 (success)
   - Check the Response tab to see if it's actual JavaScript code

---

### Error: "❌ Cal.com failed to load after maximum retries"

**Cause:** Script is taking too long to load or not loading at all

**Solutions:**
1. Check Network tab for failed requests
2. Verify your Cal.com username is correct in `src/config/cal.config.ts`
3. Make sure your event type slugs are correct
4. Hard refresh the page
5. Try restarting the dev server:
   ```bash
   npm run dev
   ```

---

### Error: "⚠️ window.Cal not available yet, retrying..."

**Cause:** Script is still loading (this is normal for first few attempts)

**If it keeps retrying:**
- Script may not be loading properly
- Network might be slow
- Check Network tab in DevTools for the `embed.js` request status

---

## ✅ Verification Checklist

### 1. Check Cal.com Configuration

**File:** `src/config/cal.config.ts`

```typescript
export const calConfig = {
  username: "unarmed-snek-adbnl0", // ✓ Your actual Cal.com username
  
  eventTypes: {
    "Basic Session": "secret",      // ✓ Just the slug, not full URL
    "Standard Session": "30min",    // ✓ Must match your Cal.com event types
    "Premium Session": "8h",        
    "Full Day Session": "12-hour",  
  },
};
```

**Verify:**
- ✓ Username is correct (check at https://cal.com/settings/my-account/profile)
- ✓ Event type slugs are just the slug part, not full URLs
- ✓ Event types exist in your Cal.com account

### 2. Test Event Type URLs

Open these URLs directly in your browser (replace with your actual slugs):

```
https://cal.com/unarmed-snek-adbnl0/secret
https://cal.com/unarmed-snek-adbnl0/30min
https://cal.com/unarmed-snek-adbnl0/8h
https://cal.com/unarmed-snek-adbnl0/12-hour
```

Each should show a Cal.com booking page. If you get "Page not found":
- The event type doesn't exist
- The slug is incorrect
- Update `cal.config.ts` with the correct slugs

### 3. Check Network Requests

In DevTools → Network tab:
1. Refresh the page
2. Look for `embed.js` request
3. Status should be `200`
4. Type should be `script`
5. Size should be ~100-200 KB

If it's missing or failed:
- Cal.com might be blocked
- Network issue
- Check browser extensions

### 4. Inspect the Embed Element

When modal is open:
1. Open DevTools → Elements tab
2. Find the div with `data-cal-link` attribute
3. Verify the attribute value is correct: `unarmed-snek-adbnl0/secret`

**Right-click the div → Inspect:**
```html
<div 
  data-cal-link="unarmed-snek-adbnl0/secret"
  data-cal-config='{"layout":"month_view","theme":"light"}'
  style="width: 100%; height: 100%; min-height: 500px;"
  class="cal-embed"
>
```

If `data-cal-link` is wrong or empty:
- Check `getCalLink()` function
- Check package name matches event type key

---

## 🔧 Quick Fixes

### Fix 1: Hard Refresh
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Fix 2: Clear Cache
1. Open DevTools (F12)
2. Right-click the Refresh button
3. Select "Empty Cache and Hard Reload"

### Fix 3: Restart Dev Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Fix 4: Rebuild
```bash
npm run build
npm run preview
```

### Fix 5: Check Browser Console for Clues
Look for any errors mentioning:
- CORS
- CSP (Content Security Policy)
- Network errors
- 404s

---

## 🌐 Browser Compatibility

Cal.com embed works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Brave

May not work on:
- ❌ Very old browsers
- ❌ Browsers with strict privacy settings
- ❌ Browsers with Cal.com blocked

---

## 🛡️ Browser Extension Conflicts

These extensions may block Cal.com:
- Privacy Badger
- uBlock Origin (check filters)
- Ghostery
- NoScript
- Some VPNs

**Test:** Open in Incognito/Private mode (extensions usually disabled)

---

## 📞 Still Not Working?

### Check These:

1. **Cal.com Account Status**
   - Is your Cal.com account active?
   - Are your event types published (not draft)?
   - Is your profile public?

2. **Event Type Settings**
   - Go to https://cal.com/event-types
   - Click on each event type
   - Ensure "Activate Event Type" is ON
   - Check availability settings

3. **Network Tab Evidence**
   - Screenshot the Network tab showing `embed.js` request
   - Screenshot any failed requests
   - Note the status codes

4. **Console Output**
   - Copy all console messages (including errors)
   - Note what happens after clicking a package

---

## 💡 Alternative: Use Cal.com Link

If the embed continues to fail, you can use a direct link as a temporary workaround:

**Update the modal to show a link instead:**

```tsx
<Card className="border-2">
  <CardContent className="p-4">
    <div className="text-center py-12">
      <p className="mb-4">Click below to schedule your session on Cal.com:</p>
      <a 
        href={`https://cal.com/${getCalLink(selectedPackage.name)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded hover:opacity-90"
      >
        Open Calendar in New Tab
      </a>
    </div>
  </CardContent>
</Card>
```

This opens Cal.com in a new tab instead of embedding it.

---

## 📊 Debug Info to Share

If you need help, share:
1. Browser name and version
2. Operating system
3. Console messages (full output)
4. Network tab showing `embed.js` request
5. Your `cal.config.ts` (username and event types)
6. Whether direct Cal.com URLs work (test booking pages)

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ No console errors
- ✅ Cal.com calendar widget appears in modal
- ✅ You can see available time slots
- ✅ You can click on dates/times
- ✅ Booking flow completes

The calendar should appear within 1-2 seconds of opening the modal.

---

*Last updated: Based on implementation with logging and retry logic*


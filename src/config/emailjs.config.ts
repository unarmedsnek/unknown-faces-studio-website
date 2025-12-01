/**
 * EmailJS Configuration
 * 
 * Setup Instructions:
 * 1. Sign up at https://www.emailjs.com/
 * 2. Create a new email service (Gmail, Outlook, etc.)
 * 3. Create two email templates:
 *    - One for the studio owner (receives booking requests)
 *    - One for the user (booking confirmation)
 * 4. Replace the values below with your actual credentials
 */

export const emailjsConfig = {
  // Loaded from environment variables for security
  // Found at: https://dashboard.emailjs.com/admin/integration
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",

  // This template will be sent to you (the studio owner)
  // Template should include: {{package_name}}, {{package_price}}, {{package_duration}},
  // {{user_name}}, {{user_email}}, {{user_phone}}, {{extra_hour}}, {{extra_notes}},
  // {{vocal_recording}}, {{mix_master}}, {{instrumental_lease}}
  ownerTemplateId: import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID || "",

  // This template will be sent to the customer as confirmation
  // Template should include: {{user_name}}, {{package_name}}, {{package_price}}, {{package_duration}}
  userTemplateId: import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID || "",

  // Found at: https://dashboard.emailjs.com/admin/account
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
};

/**
 * Example EmailJS Template Variables:
 * 
 * Owner Template (receives bookings):
 * --------------------------------
 * Subject: New Booking Request - {{package_name}}
 * 
 * Body:
 * You have a new booking request!
 * 
 * Package: {{package_name}}
 * Price: {{package_price}}
 * Duration: {{package_duration}}
 * Extra Hour: {{extra_hour}}
 * 
 * Customer Details:
 * Name: {{user_name}}
 * Email: {{user_email}}
 * Phone: {{user_phone}}
 * 
 * Additional Notes:
 * {{extra_notes}}
 * 
 * Extra Services:
 * Vocal Recording: {{vocal_recording}}
 * Mix/Master: {{mix_master}}
 * Instrumental Lease: {{instrumental_lease}}
 * 
 * 
 * User Confirmation Template:
 * --------------------------------
 * Subject: Booking Confirmation - Unknown Faces Studio
 * 
 * Body:
 * Hi {{user_name}},
 * 
 * Thank you for booking with Unknown Faces Studio!
 * 
 * Your Booking Details:
 * Package: {{package_name}}
 * Price: {{package_price}}
 * Duration: {{package_duration}}
 * 
 * We'll review your request and confirm your booking shortly.
 * 
 * Best regards,
 * Unknown Faces Studio Team
 */


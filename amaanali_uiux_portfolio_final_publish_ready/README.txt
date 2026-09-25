AMAANALI UI/UX PORTFOLIO — FINAL CLIENT PACKAGE

Branding
- Signup/login page uses the supplied premium Amaanali Designs logo artwork.
- Client dashboard uses the supplied transparent-style Amaanali Designs logo artwork.

Client access flow
1. New visitor opens auth.html and sees Create Account first.
2. After signup, Login opens automatically.
3. Login leads to client-dashboard.html.
4. Forgot password opens a working local reset flow.

Forgot password
- The Send verification code button is now a real clickable button and does not depend on browser form submission.
- The demo generates a six-digit verification code, displays it in the reset panel, verifies it, and lets the user create a new password.
- IMPORTANT: this static version does NOT send a real email. Real email password recovery requires a production authentication/email service and server-side storage.

AI assistant
- api/chat.js provides the server-side AI endpoint.
- Keep OPENAI_API_KEY in Vercel Environment Variables; never place it in frontend JavaScript.

Contact
- Contact form prepares an email in the visitor's mail app.
- WhatsApp opens with a pre-written client message.
- Instagram uses the Amaanali.design profile.

Deployment
- Static pages can be deployed on Vercel.
- If environment variables are changed in Vercel, redeploy for them to take effect.

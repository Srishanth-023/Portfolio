# 📬 Web3Forms Contact Integration Setup

This guide walks you through the configuration, usage, and troubleshooting of the Web3Forms integration in the 3D portfolio's Contact section.

## 1. What this is and why Web3Forms

**Web3Forms** is a free API service that lets you receive form submissions directly to your email without needing a backend server.
- **Why Web3Forms:** No backend required, free tier offers 250 submissions/month, unlimited forms and domains, built-in spam protection (honeypot/hCaptcha).
- **Trade-offs:** 30-day submission history on the free tier, no dashboard for viewing past messages, and the access key is public by design (relies on domain restriction for security).

## 2. Get your access key

1. Go to [Web3Forms](https://web3forms.com/).
2. Enter the email address that should receive the messages (`srishanth232007@gmail.com`).
3. Click "Create Access Key".
4. Check your inbox. You will receive an email containing your **Access Key**. Copy this key.

## 3. Configure environment variables

This project is built with Vite. Environment variables must be prefixed with `VITE_`.
1. Create a `.env.local` file in the root of your project:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your-copied-access-key-here
   ```
2. The `.env.example` file is committed to the repository with an empty value so others know what is required:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=
   ```
3. Your `.env.local` will be ignored by Git (via `.gitignore`) to prevent leaking your key, even though Web3Forms keys are designed to be safe when restricted.

## 4. Deployment setup

When you deploy your site, you must add the environment variable to your host.

**If using Vercel:**
1. Go to your Project Dashboard > Settings > Environment Variables.
2. Key: `VITE_WEB3FORMS_ACCESS_KEY`
3. Value: `your-copied-access-key-here`
4. Click "Save", then go to Deployments and trigger a Redeploy.

**If using GitHub Pages (via Actions):**
1. Go to Repo Settings > Secrets and variables > Actions > New repository secret.
2. Name: `VITE_WEB3FORMS_ACCESS_KEY`, Secret: `your-copied-access-key-here`.
3. Update your `.github/workflows` to pass the secret during the build step:
   ```yaml
   env:
     VITE_WEB3FORMS_ACCESS_KEY: ${{ secrets.VITE_WEB3FORMS_ACCESS_KEY }}
   ```

## 5. Restrict the key to your domain

To prevent abuse, you must restrict the key so it only accepts submissions from your domain.
1. Log in to your [Web3Forms Dashboard](https://web3forms.com/) (using the link from your email).
2. Go to **Settings**.
3. Under "Allowed Domains", add your production domain (e.g., `srishanth.com` or `srishanth.vercel.app`).
4. Add `localhost` if you want the form to work during local development.

## 6. Spam protection

- **Honeypot:** A hidden field (`botcheck`) is included in the form. Normal users won't see it. If a spam bot fills it out, Web3Forms silently drops the submission.
- **Client-side Rate Limiting:** The form code uses `localStorage` to prevent multiple submissions within 60 seconds.
- **Optional hCaptcha:** If you still get spam, you can enable hCaptcha in Web3Forms settings and add the `h-captcha-response` field.

## 7. How the code works

- **`src/pages/Contact.jsx`**: 
  - Collects user input (Name, Email, Subject, Message).
  - Triggers the 3D Fox animation on focus/blur.
  - Submits the data as JSON to `https://api.web3forms.com/submit` using native `fetch()`.
- **Validation**: Client-side validation checks lengths and trims spaces before sending.
- **Network Resilience**: Uses an `AbortController` with a 15-second timeout to prevent infinite loading states on poor connections.
- **Graceful Fallback**: If `VITE_WEB3FORMS_ACCESS_KEY` is missing, the form disables itself and shows a direct `mailto:` link.

## 8. Testing checklist

- [ ] Run the app locally (`npm run dev`) with your key in `.env.local`.
- [ ] Fill out the form and submit. Verify the Fox animation triggers correctly.
- [ ] Check your inbox (and spam folder) for the message.
- [ ] Attempt to submit again immediately. Ensure the 60-second rate limit blocks it.
- [ ] Clear `.env.local`, restart the dev server, and verify the form disables gracefully.
- [ ] Test on a mobile viewport (360px+) to ensure responsiveness.

## 9. Troubleshooting

- **"Invalid Access Key"**: Double-check your `.env.local` and ensure you restarted the dev server.
- **Form fails silently / CORS error**: You likely didn't add your domain (or `localhost`) to the Web3Forms Allowed Domains setting.
- **Emails going to Spam**: Add `web3forms.com` to your email whitelist or mark the emails as "Not Spam".
- **429 Too Many Requests**: You've hit the rate limit (either the client-side 60s block, or the Web3Forms free tier limit).

## 10. Limits and alternatives

- **Web3Forms Free Tier:** 250 submissions per month.
- **Alternatives:** If you outgrow this, you can easily swap the endpoint in `Contact.jsx` to Formspree, EmailJS, or Formbold. The UI and `fetch` logic remains identical; only the API URL and payload structure change.

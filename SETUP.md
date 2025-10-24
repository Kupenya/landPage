# Landing Page Setup Guide

This guide will help you set up the high-converting landing page for "The Budding Storyteller" ebook download.

## Prerequisites

- Node.js 18+ installed
- Google account for Sheets API
- Email service account (EmailJS or Resend)

## 1. Install Dependencies

```bash
npm install
```

## 2. Google Sheets API Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API

### Step 2: Create Service Account

1. Go to "IAM & Admin" > "Service Accounts"
2. Click "Create Service Account"
3. Name it "Landing Page Service"
4. Click "Create and Continue"
5. Skip roles for now, click "Done"

### Step 3: Generate Credentials

1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

### Step 4: Create Google Sheet

1. Create a new Google Sheet
2. Name it "Email Submissions"
3. Add these column headers in row 1:
   - A: Email
   - B: Timestamp
   - C: Download Link Sent
   - D: WhatsApp Community Joined
   - E: Consultation Booked
   - F: Workshop Waitlist
   - G: Source/UTM
   - H: Download Link

### Step 5: Share Sheet with Service Account

1. Click "Share" on your Google Sheet
2. Add the service account email (from the JSON file)
3. Give it "Editor" permissions

## 3. Email Service Setup

### Option A: EmailJS (Recommended for beginners)

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create account and connect your email service
3. Create an email template with:
   - Subject: "Your Free Ebook: The Budding Storyteller 📖"
   - Body: Include download link and community CTAs
4. Note down your Service ID, Template ID, and Public Key

### Option B: Resend API

1. Go to [Resend.com](https://resend.com/)
2. Create account and verify domain
3. Get your API key
4. Create email template

## 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Sheets API Configuration
GOOGLE_SHEETS_ID=your_google_sheets_id_here
GOOGLE_CLIENT_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Email Service Configuration
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Application Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number_with_country_code
```

## 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your landing page.

## 6. Email Template Setup

### EmailJS Template Example

**Subject:** Your Free Ebook: The Budding Storyteller 📖

**Body:**

```html
<h2>Welcome to the Storytelling Community! 🎉</h2>

<p>Hi there,</p>

<p>
  Thank you for downloading "The Budding Storyteller"! You're about to learn the
  5 essential storytelling frameworks that will transform how you connect with
  customers.
</p>

<p><strong>What you'll discover:</strong></p>
<ul>
  <li>How to make your customers the hero of their own story</li>
  <li>Position your brand as the trusted guide</li>
  <li>Present your process as a clear framework</li>
  <li>Build trust through honest mistakes</li>
  <li>Showcase transformation and results</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a
    href="{{download_link}}"
    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;"
  >
    Download Your Free Ebook Now
  </a>
</div>

<p><strong>While you're here, don't miss out on:</strong></p>
<ul>
  <li>
    📱 <strong>Join our WhatsApp Community:</strong> Daily tips and peer support
  </li>
  <li>
    📅 <strong>Book a Free Consultation:</strong> Get personalized guidance
  </li>
  <li>
    🎓 <strong>Workshop Waitlist:</strong> Be first to know about upcoming
    workshops
  </li>
</ul>

<p>Happy storytelling!</p>
<p>The Storytelling Team</p>
```

## 7. Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## 8. Testing

1. Test the email capture form
2. Verify emails are being added to Google Sheets
3. Check that download emails are being sent
4. Test the WhatsApp community link
5. Verify all CTAs are working

## 9. Analytics Setup (Optional)

Add Google Analytics:

1. Create GA4 property
2. Add tracking code to `layout.tsx`
3. Set up conversion tracking for email submissions

## Troubleshooting

### Common Issues

1. **Google Sheets API errors**: Check service account permissions
2. **Email not sending**: Verify EmailJS configuration
3. **Build errors**: Check all environment variables are set
4. **Styling issues**: Ensure Tailwind CSS is properly configured

### Support

If you encounter issues:

1. Check the browser console for errors
2. Verify all environment variables are correct
3. Test API endpoints individually
4. Check Google Sheets permissions

## Customization

### Colors

Update the color scheme in `page.tsx` by changing the gradient classes:

- Purple/Blue: `from-purple-900 via-blue-900 to-indigo-900`
- Orange/Pink: `from-orange-400 to-pink-500`

### Content

- Update headlines and copy in `page.tsx`
- Modify the 5 story types in the `storyTypes` array
- Change WhatsApp number and community details

### Styling

- Modify `globals.css` for custom animations
- Update Tailwind classes for different layouts
- Add custom fonts in the CSS

## Performance Optimization

1. Optimize images (use Next.js Image component)
2. Implement lazy loading for animations
3. Use CDN for static assets
4. Enable compression in production
5. Monitor Core Web Vitals

## Security Considerations

1. Rate limiting for form submissions
2. Email validation and sanitization
3. Secure environment variable storage
4. HTTPS in production
5. Regular dependency updates

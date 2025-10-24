# The Budding Storyteller - Landing Page

A high-converting landing page for the free ebook download "The Budding Storyteller: 5 Stories Your Business Needs to Tell to Sell".

## Features

- **Modern, responsive design** with purple/blue gradient theme
- **Email capture form** with validation and Google Sheets integration
- **Post-submission flow** with thank you modal and additional CTAs
- **WhatsApp community integration** for lead nurturing
- **Email automation** with download links
- **Analytics ready** with conversion tracking
- **Mobile-first design** with smooth animations

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Setup Requirements

### 1. Google Sheets API

- Create a Google Cloud project
- Enable Google Sheets API
- Create a service account
- Download credentials JSON
- Create a Google Sheet with the required columns
- Share the sheet with your service account

### 2. Email Service

Choose one:

- **EmailJS** (recommended for beginners)
- **Resend API** (for advanced users)

### 3. WhatsApp Integration

- Get your WhatsApp business number
- Add it to environment variables

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── submit-email/
│   │       └── route.ts          # API endpoint for email submissions
│   ├── download/
│   │   └── page.tsx              # Download page for ebook
│   ├── globals.css               # Global styles and animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main landing page
├── components/                   # Reusable components (if needed)
└── lib/                         # Utility functions (if needed)
```

## Key Components

### Hero Section

- Compelling headline and subheadline
- 3D ebook mockup with hover effects
- Email capture form with validation
- Loading states and error handling

### Value Proposition

- 5 story types with icons and descriptions
- Benefit-driven copy
- Smooth animations on scroll

### Post-Submission Flow

- Thank you modal with success animation
- Three CTA cards:
  - Free consultation booking
  - WhatsApp community join
  - Workshop waitlist signup

### Email Integration

- Google Sheets for data storage
- EmailJS for sending download links
- Unique download tokens
- Email template with branding

## Customization

### Colors

Update the gradient classes in `page.tsx`:

```tsx
// Main background
bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900

// CTA buttons
bg-gradient-to-r from-orange-400 to-pink-500
```

### Content

- Update headlines in `page.tsx`
- Modify the 5 story types in the `storyTypes` array
- Change WhatsApp number and community details

### Styling

- Custom animations in `globals.css`
- Tailwind classes for responsive design
- Framer Motion for smooth transitions

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Netlify

1. Build: `npm run build`
2. Deploy the `out` folder
3. Add environment variables

## Analytics & Tracking

The landing page is ready for:

- Google Analytics 4
- Facebook Pixel
- Conversion tracking
- UTM parameter tracking

## Performance

- Optimized images with Next.js Image component
- Lazy loading for animations
- Smooth scroll behavior
- Mobile-first responsive design

## Security

- Email validation and sanitization
- Rate limiting for form submissions
- Secure environment variable storage
- HTTPS in production

## Support

For issues or questions:

1. Check the browser console for errors
2. Verify all environment variables
3. Test API endpoints individually
4. Review the setup guide in `SETUP.md`

## License

This project is for educational and commercial use. Feel free to customize and deploy for your own ebook campaigns.

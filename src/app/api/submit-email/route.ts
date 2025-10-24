import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), ".env.local") });
config({ path: path.resolve(process.cwd(), ".env") });

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = "Sheet1"; // Use default sheet name

// Debug environment variables
console.log("🔍 Environment Variables Debug:");
console.log("SPREADSHEET_ID:", SPREADSHEET_ID ? "✅ Loaded" : "❌ Missing");
console.log(
  "GOOGLE_CLIENT_EMAIL:",
  process.env.GOOGLE_CLIENT_EMAIL ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "GOOGLE_PRIVATE_KEY:",
  process.env.GOOGLE_PRIVATE_KEY ? "✅ Loaded" : "❌ Missing"
);
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Loaded" : "❌ Missing");
console.log(
  "EMAIL_APP_PASSWORD:",
  process.env.EMAIL_APP_PASSWORD ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "BASE_URL:",
  process.env.NEXT_PUBLIC_BASE_URL ? "✅ Loaded" : "❌ Missing"
);
console.log(
  "All env keys:",
  Object.keys(process.env).filter(
    (key) =>
      key.includes("GOOGLE") || key.includes("EMAIL") || key.includes("BASE")
  )
);

// Debug private key format
const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;
console.log("🔍 Private Key Debug:");
console.log("Raw key length:", rawPrivateKey?.length);
console.log("Contains BEGIN:", rawPrivateKey?.includes("BEGIN"));
console.log("Contains END:", rawPrivateKey?.includes("END"));
console.log("First 50 chars:", rawPrivateKey?.substring(0, 50));
console.log(
  "Last 50 chars:",
  rawPrivateKey?.substring(rawPrivateKey.length - 50)
);

// Clean the private key
const cleanedPrivateKey = rawPrivateKey
  ?.replace(/\\n/g, "\n")
  .replace(/"/g, "")
  .trim();

console.log("🔍 Cleaned Private Key Debug:");
console.log("Cleaned key length:", cleanedPrivateKey?.length);
console.log("Cleaned first 50 chars:", cleanedPrivateKey?.substring(0, 50));
console.log(
  "Cleaned last 50 chars:",
  cleanedPrivateKey?.substring(cleanedPrivateKey.length - 50)
);

// Initialize Google Sheets API
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: cleanedPrivateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are present
    if (!SPREADSHEET_ID) {
      console.error("❌ GOOGLE_SHEETS_ID is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { email, source = "landing-page" } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Generate unique token and download link
    const token = generateToken();
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL}/download?token=${token}`;

    // Add to Google Sheets
    const timestamp = new Date().toISOString();
    const values = [[email, timestamp, "Yes", "No", "No", "No", source, token]];

    console.log("🔍 Saving to Google Sheets:");
    console.log("Email:", email);
    console.log("Token:", token);
    console.log("Download Link:", downloadLink);
    console.log("Values:", values);

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    console.log("✅ Successfully saved to Google Sheets");

    // Send email with download link (using EmailJS or similar service)
    await sendDownloadEmail(email, downloadLink);

    return NextResponse.json({
      success: true,
      message: "Email submitted successfully",
      downloadLink,
    });
  } catch (error) {
    console.error("Error submitting email:", error);
    return NextResponse.json(
      { error: "Failed to submit email" },
      { status: 500 }
    );
  }
}

function generateToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

async function sendDownloadEmail(email: string, downloadLink: string) {
  try {
    // Debug email configuration
    console.log("🔍 Email Configuration Debug:");
    console.log(
      "EMAIL_USER:",
      process.env.EMAIL_USER ? "✅ Set" : "❌ Missing"
    );
    console.log(
      "EMAIL_APP_PASSWORD:",
      process.env.EMAIL_APP_PASSWORD ? "✅ Set" : "❌ Missing"
    );

    // Create transporter using Gmail SMTP with proper configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 5000, // 5 seconds
      socketTimeout: 10000, // 10 seconds
    });

    // Test connection before sending
    console.log("🔍 Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    // Email template - Dark/Light mode compatible
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Free Ebook: The Story That Sells</title>
        <style>
          @media (prefers-color-scheme: dark) {
            .email-container {
              background: #1a1a1a !important;
            }
            .email-content {
              background: #2d2d2d !important;
              color: #e5e5e5 !important;
            }
            .email-text {
              color: #b3b3b3 !important;
            }
            .email-heading {
              color: #ffffff !important;
            }
            .email-feature-box {
              background: #3a3a3a !important;
              border: 1px solid #4a4a4a !important;
            }
            .email-feature-text {
              color: #d1d1d1 !important;
            }
            .email-footer {
              color: #888888 !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; background: #f8f9fa;">
        <div class="email-container" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #073D93 0%, #0D60D8 50%, #1781FF 100%); padding: 40px 20px; text-align: center;">
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 28px;">📖</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.2;">Your Free Ebook is Ready!</h1>
            <p style="color: #ABCDFF; margin: 12px 0 0 0; font-size: 16px; font-weight: 500;">The Story That Sells - Complete Framework</p>
          </div>
          
          <!-- Main Content -->
          <div class="email-content" style="padding: 40px; background: #ffffff;">
            <h2 class="email-heading" style="color: #073D93; font-size: 24px; margin: 0 0 20px 0; font-weight: 700;">Thank you for joining 2,500+ entrepreneurs!</h2>
            
            <p class="email-text" style="color: #4B5563; font-size: 16px; margin: 0 0 30px 0; line-height: 1.6;">
              You&apos;re about to get access to the exact framework that transformed a struggling startup into a $2M business in 18 months.
            </p>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="${downloadLink}" 
                 style="background: linear-gradient(135deg, #0D60D8 0%, #1781FF 100%); 
                        color: white; 
                        text-decoration: none; 
                        padding: 18px 36px; 
                        border-radius: 12px; 
                        font-weight: 600; 
                        font-size: 18px;
                        display: inline-block;
                        box-shadow: 0 6px 20px rgba(13, 96, 216, 0.4);
                        transition: all 0.3s ease;">
                📥 Download Your Free Ebook
              </a>
            </div>
            
            <!-- Features Box -->
            <div class="email-feature-box" style="background: #F9FAFB; padding: 24px; border-radius: 12px; margin: 30px 0; border: 1px solid #E5E7EB;">
              <h3 style="color: #073D93; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What&apos;s Inside:</h3>
              <ul class="email-feature-text" style="color: #4B5563; margin: 0; padding-left: 20px; list-style: none;">
                <li style="margin: 12px 0; padding-left: 20px; position: relative;">
                  <span style="position: absolute; left: 0; color: #0D60D8;">✓</span>
                  5 Proven Story Frameworks that convert
                </li>
                <li style="margin: 12px 0; padding-left: 20px; position: relative;">
                  <span style="position: absolute; left: 0; color: #0D60D8;">✓</span>
                  Real case studies from $2M+ businesses
                </li>
                <li style="margin: 12px 0; padding-left: 20px; position: relative;">
                  <span style="position: absolute; left: 0; color: #0D60D8;">✓</span>
                  Ready-to-use templates and scripts
                </li>
                <li style="margin: 12px 0; padding-left: 20px; position: relative;">
                  <span style="position: absolute; left: 0; color: #0D60D8;">✓</span>
                  Community access for ongoing support
                </li>
              </ul>
            </div>
            
            <!-- Social Proof -->
            <div style="background: linear-gradient(135deg, #073D93 0%, #0D60D8 100%); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <p style="color: white; margin: 0; font-size: 16px; font-weight: 500;">
                &ldquo;This framework helped me increase sales by 340% in just 6 months!&rdquo;
              </p>
              <p style="color: #ABCDFF; margin: 8px 0 0 0; font-size: 14px;">
                - Sarah M., E-commerce Founder
              </p>
            </div>
            
            <p class="email-text" style="color: #4B5563; font-size: 14px; margin: 30px 0 0 0; text-align: center; line-height: 1.5;">
              This download link is valid for 7 days. If you have any issues, reply to this email.
            </p>
          </div>
          
          <!-- Footer -->
          <div class="email-footer" style="background: #F8F9FA; padding: 24px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 12px;">
              © 2024 StorySell. All rights reserved.
            </p>
            <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
              You&apos;re receiving this because you signed up for our free ebook.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"StorySell" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "📖 Your Free Ebook: The Story That Sells",
      html: emailTemplate,
    });

    console.log(`✅ Download email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    // Don't throw error - we still want to save to spreadsheet
  }
}

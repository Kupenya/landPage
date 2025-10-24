import { config } from "dotenv";

// Load environment variables FIRST
config();

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SHEET_NAME = "Sheet1"; // Use default sheet name

// Initialize Google Sheets API
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n"
      ).replace(/"/g, ""),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    // Check if token exists in spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
    });

    const rows = response.data.values || [];
    console.log("🔍 Validation Debug:");
    console.log("Looking for token:", token);
    console.log("Total rows:", rows.length);
    console.log("Sample row:", rows[0]);

    const tokenRow = rows.find((row) => row[7] === token); // Column H contains tokens

    if (!tokenRow) {
      console.log("❌ Token not found in spreadsheet");
      return NextResponse.json({ valid: false }, { status: 404 });
    }

    console.log("✅ Token found:", tokenRow);

    // Check if token is expired (7 days)
    const createdAt = new Date(tokenRow[1]); // Column B contains timestamp
    const now = new Date();
    const daysDiff =
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysDiff > 7) {
      return NextResponse.json(
        { valid: false, expired: true },
        { status: 410 }
      );
    }

    // Get download count
    const downloadCount = parseInt(tokenRow[3]) || 0; // Column D contains download count

    return NextResponse.json({
      valid: true,
      downloadCount,
      email: tokenRow[0], // Column A contains email
    });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}

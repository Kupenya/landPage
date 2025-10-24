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

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    // Find the row with this token
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
    });

    const rows = response.data.values || [];
    const tokenRowIndex = rows.findIndex((row) => row[7] === token);

    if (tokenRowIndex === -1) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    // Update download count (Column D)
    const currentCount = parseInt(rows[tokenRowIndex][3]) || 0;
    const newCount = currentCount + 1;

    // Update the specific cell
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!D${tokenRowIndex + 1}`, // +1 because sheets are 1-indexed
      valueInputOption: "RAW",
      requestBody: {
        values: [[newCount.toString()]],
      },
    });

    // Update last download timestamp (Column E)
    const now = new Date().toISOString();
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!E${tokenRowIndex + 1}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[now]],
      },
    });

    return NextResponse.json({
      success: true,
      downloadCount: newCount,
    });
  } catch (error) {
    console.error("Download tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track download" },
      { status: 500 }
    );
  }
}

import { config } from "dotenv";

// Load environment variables FIRST
config();

import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

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
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    // Validate token first
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
    });

    const rows = response.data.values || [];
    const tokenRow = rows.find((row) => row[7] === token);

    if (!tokenRow) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    // Check if token is expired (7 days)
    const createdAt = new Date(tokenRow[1]);
    const now = new Date();
    const daysDiff =
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysDiff > 7) {
      return NextResponse.json({ error: "Token expired" }, { status: 410 });
    }

    // For now, we'll create a simple PDF content
    // In a real implementation, you would serve an actual PDF file
    const pdfContent = createSamplePDF();

    return new NextResponse(new Uint8Array(pdfContent), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="The-Story-That-Sells-Framework.pdf"',
        "Content-Length": pdfContent.length.toString(),
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

function createSamplePDF(): Buffer {
  // This is a simplified example - in production, you'd use a proper PDF library
  // like pdfkit, puppeteer, or serve an actual PDF file from your assets

  const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 24 Tf
100 700 Td
(The Story That Sells Framework) Tj
0 -50 Td
/F1 12 Tf
(Thank you for downloading our free ebook!) Tj
0 -30 Td
(This is a sample PDF. In production, you would serve) Tj
0 -20 Td
(a real PDF file with the complete framework.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000000525 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
625
%%EOF`;

  return Buffer.from(pdfContent, "utf-8");
}

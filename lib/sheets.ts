import { google } from "googleapis";
import { env, getServiceAccountKey } from "@/lib/env";
import type { RawSheetData } from "@/lib/content";

const SETTINGS_RANGE = "Settings!A:Z";
const HOURS_RANGE = "Hours!A:Z";
const SERVICES_RANGE = "Services!A:Z";
const PRICING_RANGE = "Pricing!A:Z";
const FAQS_RANGE = "FAQs!A:Z";

const rowsToObjects = (rows: string[][]): Record<string, string>[] => {
  if (rows.length === 0) return [];
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header) => header?.trim() ?? "");
  return dataRows
    .filter((row) => row.some((value) => value && value.trim() !== ""))
    .map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        if (!header) return;
        obj[header] = row[index]?.trim?.() ?? "";
      });
      return obj;
    });
};

const sheetToKeyValue = (rows: string[][]): Record<string, string> => {
  const objects = rowsToObjects(rows);
  const map: Record<string, string> = {};
  objects.forEach((row) => {
    if (row.key) {
      map[row.key] = row.value ?? "";
    }
  });
  return map;
};

export const fetchSheetContent = async (sheetId: string): Promise<RawSheetData> => {
  const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getServiceAccountKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    projectId: env.GOOGLE_SHEETS_PROJECT_ID
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: sheetId,
    ranges: [
      SETTINGS_RANGE,
      HOURS_RANGE,
      SERVICES_RANGE,
      PRICING_RANGE,
      FAQS_RANGE
    ]
  });

  const ranges = response.data.valueRanges ?? [];
  const [settingsRows, hoursRows, servicesRows, pricingRows, faqRows] = ranges.map(
    (range) => (range.values as string[][]) ?? []
  );

  return {
    settings: sheetToKeyValue(settingsRows ?? []),
    hours: rowsToObjects(hoursRows ?? []),
    services: rowsToObjects(servicesRows ?? []),
    pricing: rowsToObjects(pricingRows ?? []),
    faqs: rowsToObjects(faqRows ?? [])
  };
};
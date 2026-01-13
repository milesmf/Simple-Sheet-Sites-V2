import { z } from "zod";

const EnvSchema = z.object({
  ADMIN_TOKEN: z.string().min(1),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().min(1),
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: z.string().min(1),
  GOOGLE_SHEETS_PROJECT_ID: z.string().optional(),
  CACHE_TTL_SECONDS: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 300))
    .refine((value) => Number.isFinite(value) && value > 0, {
      message: "CACHE_TTL_SECONDS must be a positive number"
    })
});

export const env = EnvSchema.parse({
  ADMIN_TOKEN: process.env.ADMIN_TOKEN,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  GOOGLE_SHEETS_PROJECT_ID: process.env.GOOGLE_SHEETS_PROJECT_ID,
  CACHE_TTL_SECONDS: process.env.CACHE_TTL_SECONDS
});

export const getServiceAccountKey = (): string =>
  env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n");
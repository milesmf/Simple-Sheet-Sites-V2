import { z } from "zod";

export const SettingsSchema = z.object({
  businessName: z.string().min(1, "business_name is required"),
  phone: z.string().min(1),
  email: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroSubheadline: z.string().min(1),
  primaryCtaText: z.string().min(1),
  primaryCtaLink: z.string().min(1),
  accentColor: z.string().min(1),
  logoUrl: z.string().min(1),
  aboutHeadline: z.string().optional(),
  aboutBody: z.string().optional()
});

export const HoursSchema = z.object({
  day: z.string().min(1),
  open: z.string().optional(),
  close: z.string().optional(),
  closed: z.boolean().default(false)
});

export const ServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.string().optional(),
  featured: z.boolean().default(false)
});

export const PricingSchema = z.object({
  planName: z.string().min(1),
  price: z.string().min(1),
  billingPeriod: z.string().optional(),
  features: z.array(z.string()).default([]),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional()
});

export const FaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1)
});

export const SiteContentSchema = z.object({
  settings: SettingsSchema,
  hours: z.array(HoursSchema),
  services: z.array(ServiceSchema),
  pricing: z.array(PricingSchema),
  faqs: z.array(FaqSchema)
});

export type SiteSettings = z.infer<typeof SettingsSchema>;
export type SiteHours = z.infer<typeof HoursSchema>;
export type SiteService = z.infer<typeof ServiceSchema>;
export type SitePricing = z.infer<typeof PricingSchema>;
export type SiteFaq = z.infer<typeof FaqSchema>;
export type SiteContent = z.infer<typeof SiteContentSchema>;

export type RawSheetData = {
  settings: Record<string, string>;
  hours: Record<string, string>[];
  services: Record<string, string>[];
  pricing: Record<string, string>[];
  faqs: Record<string, string>[];
};

const truthy = (value?: string) =>
  value?.toLowerCase() === "true" || value === "1" || value === "yes";

export const normalizeContent = (raw: RawSheetData): SiteContent => {
  const settings = {
    businessName: raw.settings.business_name ?? "Your Business",
    phone: raw.settings.phone ?? "(000) 000-0000",
    email: raw.settings.email ?? "hello@example.com",
    address: raw.settings.address ?? "123 Main Street",
    city: raw.settings.city ?? "Your City",
    state: raw.settings.state ?? "ST",
    zip: raw.settings.zip ?? "00000",
    heroHeadline: raw.settings.hero_headline ?? "Quality service, done right",
    heroSubheadline:
      raw.settings.hero_subheadline ??
      "Reliable professionals serving your neighborhood.",
    primaryCtaText: raw.settings.primary_cta_text ?? "Request a quote",
    primaryCtaLink: raw.settings.primary_cta_link ?? "#contact",
    accentColor: raw.settings.accent_color ?? "#2563eb",
    logoUrl: raw.settings.logo_url ?? "https://placehold.co/80x80",
    aboutHeadline: raw.settings.about_headline,
    aboutBody: raw.settings.about_body
  };

  const hours = raw.hours
    .filter((row) => row.day)
    .map((row) => ({
      day: row.day ?? "",
      open: row.open,
      close: row.close,
      closed: truthy(row.closed)
    }));

  const services = raw.services
    .filter((row) => row.name && row.description)
    .map((row) => ({
      name: row.name ?? "",
      description: row.description ?? "",
      price: row.price,
      featured: truthy(row.featured)
    }));

  const pricing = raw.pricing
    .filter((row) => row.plan_name && row.price)
    .map((row) => ({
      planName: row.plan_name ?? "",
      price: row.price ?? "",
      billingPeriod: row.billing_period,
      features: row.features
        ? row.features
            .split("|")
            .map((feature) => feature.trim())
            .filter(Boolean)
        : [],
      ctaText: row.cta_text,
      ctaLink: row.cta_link
    }));

  const faqs = raw.faqs
    .filter((row) => row.question && row.answer)
    .map((row) => ({
      question: row.question ?? "",
      answer: row.answer ?? ""
    }));

  return SiteContentSchema.parse({
    settings,
    hours,
    services,
    pricing,
    faqs
  });
};

export const buildAboutCopy = (settings: SiteSettings) => {
  const location = [settings.city, settings.state].filter(Boolean).join(", ");
  return (
    settings.aboutBody ??
    `${settings.businessName} is proud to serve ${location || "our community"} with dependable service, transparent pricing, and a team that treats your property like their own. We believe in doing the job right the first time and standing behind our work.`
  );
};

export const buildAboutHeadline = (settings: SiteSettings) =>
  settings.aboutHeadline ?? `About ${settings.businessName}`;
import type { SiteHours, SiteSettings } from "@/lib/content";

const formatHours = (hours: SiteHours) => {
  if (hours.closed) return "Closed";
  if (hours.open && hours.close) return `${hours.open} - ${hours.close}`;
  return "By appointment";
};

type SiteFooterProps = {
  settings: SiteSettings;
  hours: SiteHours[];
};

export const SiteFooter = ({ settings, hours }: SiteFooterProps) => (
  <footer className="border-t border-slate-200 bg-slate-50">
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Contact</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <p>{settings.address}</p>
          <p>
            {settings.city}, {settings.state} {settings.zip}
          </p>
          <p>{settings.phone}</p>
          <p>{settings.email}</p>
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">Hours</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-600">
          {hours.map((item) => (
            <div key={item.day} className="flex items-center justify-between">
              <span>{item.day}</span>
              <span>{formatHours(item)}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900">Why choose us</h3>
        <p className="mt-4 text-sm text-slate-600">
          Locally owned, fully insured, and committed to doing the job right with
          upfront pricing and friendly support.
        </p>
      </div>
    </div>
    <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} {settings.businessName}. All rights reserved.
    </div>
  </footer>
);
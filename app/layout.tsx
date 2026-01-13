import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Simple Sheet Sites",
  description: "Multi-page business sites powered by Google Sheets"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("success");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">Send a message</h3>
      <p className="mt-2 text-sm text-slate-600">
        Tell us about your project and we will follow up with next steps.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Name
          </label>
          <input
            required
            id="name"
            name="name"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={4}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--accent-color, #2563eb)" }}
        >
          Send message
        </button>
      </form>
      {status === "success" && (
        <div className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Thanks! We received your message and will reply soon.
        </div>
      )}
    </div>
  );
};
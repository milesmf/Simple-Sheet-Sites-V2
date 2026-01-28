"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    // Simulate sending
    setTimeout(() => {
      setStatus("success");
    }, 500);
  };

  return (
    <div className="card p-8">
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-text-primary">Send a message</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Tell us about your project and we&apos;ll follow up with next steps.
        </p>
      </div>

      {status === "success" ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center message-success border-0">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">
            Message sent!
          </h4>
          <p className="text-text-secondary mb-6">
            Thanks for reaching out! We received your message and will reply soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="btn btn-secondary"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                required
                id="name"
                name="name"
                placeholder="Your name"
                className="input"
                disabled={status === "sending"}
              />
            </div>
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="input"
                disabled={status === "sending"}
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="phone">
              Phone <span className="text-text-muted font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 123-4567"
              className="input"
              disabled={status === "sending"}
            />
          </div>

          <div>
            <label className="label" htmlFor="subject">
              Subject
            </label>
            <input
              required
              id="subject"
              name="subject"
              placeholder="How can we help?"
              className="input"
              disabled={status === "sending"}
            />
          </div>

          <div>
            <label className="label" htmlFor="message">
              Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your project..."
              className="input resize-none"
              disabled={status === "sending"}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-4"
            style={{ backgroundColor: "var(--accent-color, #2563eb)" }}
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send message
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

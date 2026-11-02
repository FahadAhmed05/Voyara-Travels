"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck, Send } from "lucide-react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubscribed(true);
  };

  if (subscribed) {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm text-on-dark"
      >
        <CircleCheck
          className="mt-0.5 size-5 shrink-0 text-gold"
          aria-hidden="true"
        />
        <p>You&rsquo;re on the list. Expect your first travel note soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-full bg-white/10 p-1.5 focus-within:ring-2 focus-within:ring-gold">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={error !== null}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-on-dark/60"
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-white transition-colors hover:bg-teal-dark"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" className="mt-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </form>
  );
}

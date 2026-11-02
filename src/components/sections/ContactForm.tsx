"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { SelectField } from "@/components/booking/FormControls";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { destinations } from "@/data/destinations";
import { emptyContactValues, firstName, validateContact } from "@/lib/contact";
import type { ContactErrors, ContactValues } from "@/types";

const SUBMIT_DELAY_MS = 800;

const destinationOptions = [
  { value: "", label: "Not sure yet — surprise me" },
  ...destinations.map((d) => ({ value: d.name, label: d.name })),
];

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"editing" | "sending" | "sent">(
    "editing",
  );
  const [sentName, setSentName] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = (field: keyof ContactValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "editing") return;
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    timer.current = window.setTimeout(() => {
      setSentName(firstName(values.name));
      setValues(emptyContactValues);
      setStatus("sent");
    }, SUBMIT_DELAY_MS);
  };

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center gap-4 rounded-3xl bg-white p-8 shadow-soft md:p-10"
      >
        <CircleCheck className="size-10 text-teal" aria-hidden="true" />
        <h3 className="text-2xl font-semibold break-words">
          Thanks, {sentName} — your journey is on our desk.
        </h3>
        <p>We&rsquo;ll call you within one working day.</p>
        <Button variant="outline" onClick={() => setStatus("editing")}>
          Send another note
        </Button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white p-6 shadow-soft md:p-10"
    >
      <fieldset
        disabled={sending}
        className="grid min-w-0 gap-5 sm:grid-cols-2"
      >
        <legend className="sr-only">Tell us about your trip</legend>
        <TextField
          label="Name"
          value={values.name}
          onChange={update("name")}
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          label="Phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          autoComplete="tel"
          error={errors.phone}
        />
        <SelectField
          label="Where are you dreaming of?"
          value={values.destination}
          options={destinationOptions}
          onChange={update("destination")}
        />
        <TextField
          label="Message"
          value={values.message}
          onChange={update("message")}
          multiline
          required
          error={errors.message}
          className="sm:col-span-2"
        />
      </fieldset>

      <Button type="submit" size="lg" disabled={sending} className="mt-6">
        {sending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-5" aria-hidden="true" />
            Send my note
          </>
        )}
      </Button>
    </form>
  );
}

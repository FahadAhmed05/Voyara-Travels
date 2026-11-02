import type { ContactErrors, ContactValues } from "@/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,}$/;

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  message: "",
};

/** Required: name, email and message. Phone is optional but must look like one. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.trim() === "") {
    errors.name = "Please tell us your name.";
  }
  if (values.email.trim() === "") {
    errors.email = "Please share an email so we can reach you.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email doesn't look quite right.";
  }
  if (values.phone.trim() !== "" && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Please use digits only, like +92 300 1234567.";
  }
  if (values.message.trim() === "") {
    errors.message = "A line or two about your trip helps us start well.";
  }
  return errors;
}

export function firstName(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] ?? "";
}

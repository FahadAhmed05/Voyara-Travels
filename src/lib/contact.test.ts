import { describe, expect, it } from "vitest";
import { emptyContactValues, firstName, validateContact } from "@/lib/contact";

const valid = {
  name: "Ahmed Raza",
  email: "ahmed@example.com",
  phone: "",
  destination: "Dubai",
  message: "Four of us, mid-December.",
};

describe("validateContact", () => {
  it("accepts a complete form without a phone number", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("requires name, email and message", () => {
    const errors = validateContact(emptyContactValues);

    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("rejects a malformed email", () => {
    expect(validateContact({ ...valid, email: "ahmed@" }).email).toMatch(
      /doesn't look quite right/,
    );
  });

  it("checks the phone only when one is given", () => {
    expect(validateContact({ ...valid, phone: "abc" }).phone).toBeDefined();
    expect(
      validateContact({ ...valid, phone: "+92 300 1234567" }).phone,
    ).toBeUndefined();
  });

  it("treats whitespace-only fields as empty", () => {
    expect(validateContact({ ...valid, name: "   " }).name).toBeDefined();
  });
});

describe("firstName", () => {
  it("returns the first word of a full name", () => {
    expect(firstName("  Ahmed   Raza ")).toBe("Ahmed");
  });
});

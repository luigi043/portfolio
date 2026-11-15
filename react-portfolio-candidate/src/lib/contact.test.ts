import { validateContact, type ContactValues } from "@/lib/contact";

const validValues: ContactValues = {
  name: "Luiz",
  email: "luiz@example.com",
  enquiryType: "employment",
  message: "I would like to discuss a software developer role.",
};

describe("contact validation", () => {
  it("accepts a complete employment or freelance enquiry", () => {
    expect(validateContact(validValues)).toEqual({});
    expect(
      validateContact({ ...validValues, enquiryType: "freelance" }),
    ).toEqual({});
  });

  it("rejects whitespace-only required fields and an invalid email", () => {
    expect(
      validateContact({
        name: " ",
        email: "invalid",
        enquiryType: "",
        message: " ",
      }),
    ).toEqual({
      name: "Enter your name.",
      email: "Enter a valid email address.",
      enquiryType: "Choose employment or freelance.",
      message: "Add a short message so I have enough context to respond.",
    });
  });
});

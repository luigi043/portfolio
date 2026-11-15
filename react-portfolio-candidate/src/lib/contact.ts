export type EnquiryType = "employment" | "freelance" | "";

export type ContactValues = {
  name: string;
  email: string;
  enquiryType: EnquiryType;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!emailPattern.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (!values.enquiryType)
    errors.enquiryType = "Choose employment or freelance.";
  if (!values.message.trim()) {
    errors.message = "Add a short message so I have enough context to respond.";
  }

  return errors;
}

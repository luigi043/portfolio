"use client";

import { useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import {
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact";
import { trackApprovedEvent } from "@/lib/analytics";

const emptyValues: ContactValues = {
  name: "",
  email: "",
  enquiryType: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function updateValue<Key extends keyof ContactValues>(
    key: Key,
    value: ContactValues[Key],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setStatus("");

    const firstInvalid = (
      ["name", "email", "enquiryType", "message"] as const
    ).find((field) => nextErrors[field]);
    if (firstInvalid) {
      ({
        name: nameRef,
        email: emailRef,
        enquiryType: typeRef,
        message: messageRef,
      })[firstInvalid].current?.focus();
      return;
    }

    setSending(true);
    setStatus("Sending your message…");
    try {
      const response = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          enquiryType: values.enquiryType,
          message: values.message.trim(),
        }),
      });

      if (!response.ok) throw new Error("Formspree rejected the enquiry");
      setValues(emptyValues);
      setErrors({});
      setStatus("Message sent. Thank you — I will reply directly.");
      trackApprovedEvent("contact_success");
    } catch {
      setStatus(
        `The form could not send your message. Your draft is still here; email ${profile.email} instead.`,
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="contact-layout">
      <aside className="contact-context" aria-label="Contact details">
        <p className="contact-lead">
          Share the role, problem, or project context. I will reply directly and
          keep the next step practical.
        </p>
        <dl>
          <div>
            <dt>Based in</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Opportunities</dt>
            <dd>Remote, hybrid, or relocation</dd>
          </div>
          <div>
            <dt>Direct email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
        </dl>
      </aside>

      <form className="contact-form" noValidate onSubmit={submitContact}>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              ref={nameRef}
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              value={values.name}
              onChange={(event) => updateValue("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name ? (
              <p id="contact-name-error" className="field-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              ref={emailRef}
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => updateValue("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
            {errors.email ? (
              <p id="contact-email-error" className="field-error">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="field">
          <label htmlFor="contact-type">Enquiry type</label>
          <select
            ref={typeRef}
            id="contact-type"
            name="enquiryType"
            required
            value={values.enquiryType}
            onChange={(event) =>
              updateValue(
                "enquiryType",
                event.target.value as ContactValues["enquiryType"],
              )
            }
            aria-invalid={Boolean(errors.enquiryType)}
            aria-describedby={
              errors.enquiryType ? "contact-type-error" : undefined
            }
          >
            <option value="">Choose one</option>
            <option value="employment">Employment opportunity</option>
            <option value="freelance">Freelance enquiry</option>
          </select>
          {errors.enquiryType ? (
            <p id="contact-type-error" className="field-error">
              {errors.enquiryType}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={7}
            required
            value={values.message}
            onChange={(event) => updateValue("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
          />
          {errors.message ? (
            <p id="contact-message-error" className="field-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="form-footer">
          <button
            className="button button-primary"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending…" : "Send enquiry"}
          </button>
          <p role="status" aria-live="polite">
            {status}
          </p>
        </div>
      </form>
    </div>
  );
}

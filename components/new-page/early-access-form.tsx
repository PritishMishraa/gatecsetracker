"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  EARLY_ACCESS_STORAGE_KEY,
  EARLY_ACCESS_STORAGE_VERSION,
  GATE_YEAR_OPTIONS,
  parseStoredEarlyAccessSubmission,
  type StoredEarlyAccessSubmission,
  VALID_EMAIL_PATTERN,
} from "@/lib/early-access";

const EMAIL_ERROR_TIMEOUT_MS = 2000;

type EarlyAccessFormProps = {
  initialEmail: string;
};

type RegistrationFormProps = {
  email: string;
  name: string;
  gateYear: string;
  feedback: string;
  emailError: boolean;
  submitError: string | null;
  isSubmitting: boolean;
  onEmailChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onGateYearChange: (value: string) => void;
  onFeedbackChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function EarlyAccessForm({ initialEmail }: EarlyAccessFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [gateYear, setGateYear] = useState("");
  const [feedback, setFeedback] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let storedSubmission: StoredEarlyAccessSubmission | null = null;

    try {
      storedSubmission = parseStoredEarlyAccessSubmission(
        window.localStorage.getItem(EARLY_ACCESS_STORAGE_KEY),
      );
    } catch {
      storedSubmission = null;
    }

    if (!storedSubmission) {
      return;
    }

    const { email: storedEmail } = storedSubmission;

    setEmail((currentEmail) => currentEmail || storedEmail);
    setIsSuccess(true);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !VALID_EMAIL_PATTERN.test(email.trim())) {
      setEmailError(true);
      window.setTimeout(() => setEmailError(false), EMAIL_ERROR_TIMEOUT_MS);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          gateYear,
          feedback,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmitError(
          result?.error ?? "Could not save your request. Try again.",
        );
        return;
      }

      try {
        window.localStorage.setItem(
          EARLY_ACCESS_STORAGE_KEY,
          JSON.stringify({
            version: EARLY_ACCESS_STORAGE_VERSION,
            email: email.trim().toLowerCase(),
            submittedAt: new Date().toISOString(),
          }),
        );
      } catch {
        // Ignore storage failures and still show success once the DB write succeeds.
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Could not save your request. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return isSuccess ? (
    <EarlyAccessSuccess />
  ) : (
    <RegistrationForm
      email={email}
      name={name}
      gateYear={gateYear}
      feedback={feedback}
      emailError={emailError}
      submitError={submitError}
      isSubmitting={isSubmitting}
      onEmailChange={setEmail}
      onNameChange={setName}
      onGateYearChange={setGateYear}
      onFeedbackChange={setFeedback}
      onSubmit={handleSubmit}
    />
  );
}

function RegistrationForm({
  email,
  name,
  gateYear,
  feedback,
  emailError,
  submitError,
  isSubmitting,
  onEmailChange,
  onNameChange,
  onGateYearChange,
  onFeedbackChange,
  onSubmit,
}: RegistrationFormProps) {
  return (
    <form noValidate onSubmit={onSubmit} className="mx-auto w-full max-w-105">
      <div className="mb-7 sm:mb-8">
        <h2 className="mb-2 [font-family:var(--font-instrument-serif)] text-[24px] leading-[1.15] tracking-[-0.02em] text-[#0f1623] text-balance sm:text-[26px] sm:leading-tight">
          Register for early access
        </h2>
        <p className="text-[13.5px] leading-6 text-[#6b7583] text-pretty">
          Takes 30 seconds. Early birds get an exclusive discount at launch.
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-[12.5px] font-semibold tracking-[-0.01em] text-[#1e2633]"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={emailError}
          placeholder="you@example.com"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          className={[
            "min-h-11 w-full rounded-xl border px-3 py-2.5 text-[13.5px] outline-hidden transition-[border-color,box-shadow]",
            emailError
              ? "border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]"
              : "border-[#e4e7ec] focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]",
          ].join(" ")}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="gate-year"
          className="mb-2 block text-[12.5px] font-semibold tracking-[-0.01em] text-[#1e2633]"
        >
          GATE attempt year
        </label>
        <select
          id="gate-year"
          value={gateYear}
          onChange={(event) => onGateYearChange(event.target.value)}
          className="min-h-11 w-full rounded-xl border border-[#e4e7ec] bg-white px-3 py-2.5 pr-9 text-[13.5px] text-[#374151] outline-hidden transition-[border-color,box-shadow] focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
        >
          <option value="">Select your target year</option>
          {GATE_YEAR_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#e4e7ec]" />
        <span className="[font-family:var(--font-dm-mono)] text-[10px] uppercase tracking-[0.06em] text-[#cbd0d9]">
          optional
        </span>
        <div className="h-px flex-1 bg-[#e4e7ec]" />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block text-[12.5px] font-semibold tracking-[-0.01em] text-[#1e2633]"
        >
          Your name{" "}
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Arjun"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          className="min-h-11 w-full rounded-xl border border-[#e4e7ec] px-3 py-2.5 text-[13.5px] outline-hidden transition-[border-color,box-shadow] focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="feedback"
          className="mb-2 block text-[12.5px] font-semibold tracking-[-0.01em] text-[#1e2633]"
        >
          What would make this genuinely useful?
        </label>
        <textarea
          id="feedback"
          rows={4}
          placeholder="e.g. I wish I could mark specific videos as done without losing progress across devices..."
          value={feedback}
          onChange={(event) => onFeedbackChange(event.target.value)}
          className="min-h-24 w-full resize-y rounded-xl border border-[#e4e7ec] px-3 py-2.5 text-[13.5px] leading-6 outline-hidden transition-[border-color,box-shadow] focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
        />
      </div>

      {submitError ? (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[12.5px] leading-5 text-red-700">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative min-h-11 w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold tracking-[-0.01em] text-white shadow-[0_14px_28px_rgba(37,99,235,0.22)] transition-[transform,background-color,box-shadow] hover:-translate-y-px hover:bg-blue-700 hover:shadow-[0_18px_30px_rgba(37,99,235,0.3)] active:scale-[0.96] disabled:pointer-events-none"
      >
        {isSubmitting ? "Submitting..." : "Register for early access →"}
      </button>

      <p className="mt-2 text-center [font-family:var(--font-dm-mono)] text-[10.5px] text-[#9aa3b0]">
        {"// no spam. one email when it's ready."}
      </p>
    </form>
  );
}

function EarlyAccessSuccess() {
  return (
    <div className="mx-auto max-w-105 py-5 text-center">
      <div className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-full border border-blue-600/15 bg-blue-600/5">
        <svg
          viewBox="0 0 24 24"
          className="h-5.5 w-5.5 stroke-blue-600"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="mb-2 [font-family:var(--font-instrument-serif)] text-2xl text-[#0f1623]">
        You&apos;re on the list.
      </h2>

      <p className="text-[13.5px] leading-7 text-[#6b7583]">
        You&apos;ll be the first to know when GATE CSE Tracker is ready, along
        with your early access and discount code.
      </p>

      <p className="mt-5 [font-family:var(--font-instrument-serif)] text-[13px] italic text-[#374151]">
        Thanks for being here from the start. - Pritish
      </p>
    </div>
  );
}

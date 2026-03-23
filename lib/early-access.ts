export const VALID_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const GATE_YEAR_OPTIONS = [
  "GATE 2027",
  "GATE 2028",
  "Just exploring",
] as const;
export const EARLY_ACCESS_STORAGE_KEY = "gatecsetracker:early-access:v1";
export const EARLY_ACCESS_STORAGE_VERSION = 1;
export const MAX_NAME_LENGTH = 120;
export const MAX_FEEDBACK_LENGTH = 2000;

export type GateYearOption = (typeof GATE_YEAR_OPTIONS)[number];

export type EarlyAccessSubmission = {
  email: string;
  name?: string;
  gateYear?: string;
  feedback?: string;
};

export type StoredEarlyAccessSubmission = {
  version: typeof EARLY_ACCESS_STORAGE_VERSION;
  email: string;
  submittedAt: string;
};

export type NormalizedEarlyAccessSubmission = {
  email: string;
  name: string | null;
  gateYear: GateYearOption | null;
  feedback: string | null;
};

export function isValidGateYear(value: string): value is GateYearOption {
  return GATE_YEAR_OPTIONS.includes(value as GateYearOption);
}

export function normalizeEarlyAccessSubmission(
  input: EarlyAccessSubmission,
): NormalizedEarlyAccessSubmission {
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const gateYear =
    typeof input.gateYear === "string" ? input.gateYear.trim() : "";
  const feedback =
    typeof input.feedback === "string" ? input.feedback.trim() : "";

  if (!email || !VALID_EMAIL_PATTERN.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (name.length > MAX_NAME_LENGTH) {
    throw new Error("Name is too long.");
  }

  if (feedback.length > MAX_FEEDBACK_LENGTH) {
    throw new Error("Feedback is too long.");
  }

  if (gateYear && !isValidGateYear(gateYear)) {
    throw new Error("Please choose a valid GATE attempt year.");
  }

  const normalizedGateYear = gateYear ? (gateYear as GateYearOption) : null;

  return {
    email,
    name: name || null,
    gateYear: normalizedGateYear,
    feedback: feedback || null,
  };
}

export function parseStoredEarlyAccessSubmission(
  value: string | null,
): StoredEarlyAccessSubmission | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<StoredEarlyAccessSubmission>;

    if (
      parsed.version !== EARLY_ACCESS_STORAGE_VERSION ||
      typeof parsed.email !== "string" ||
      typeof parsed.submittedAt !== "string"
    ) {
      return null;
    }

    return {
      version: parsed.version,
      email: parsed.email,
      submittedAt: parsed.submittedAt,
    };
  } catch {
    return null;
  }
}

import "server-only";

import DodoPayments from "dodopayments";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getDodoEnvironment() {
  const environment = process.env.DODO_PAYMENTS_ENVIRONMENT;

  if (environment === "test_mode" || environment === "live_mode") {
    return environment;
  }

  return "test_mode";
}

export const premiumProductId = getRequiredEnv("DODO_PREMIUM_PRODUCT_ID");
export const dodoWebhookSecret =
  process.env.DODO_PAYMENTS_WEBHOOK_SECRET ?? null;

export const dodoPayments = new DodoPayments({
  bearerToken: getRequiredEnv("DODO_PAYMENTS_API_KEY"),
  environment: getDodoEnvironment(),
});

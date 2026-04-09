import "server-only";

import DodoPayments from "dodopayments";
import { env } from "@/env";

export const premiumProductId = env.DODO_PREMIUM_PRODUCT_ID;
export const dodoWebhookSecret = env.DODO_PAYMENTS_WEBHOOK_SECRET;

export const dodoPayments = new DodoPayments({
  bearerToken: env.DODO_PAYMENTS_API_KEY,
  environment: env.DODO_PAYMENTS_ENVIRONMENT,
});

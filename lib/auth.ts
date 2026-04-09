import {
  type DodoPaymentsPlugins,
  checkout,
  dodopayments,
  portal,
  webhooks,
} from "@dodopayments/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import db from "@/db";
import { env } from "@/env";
import { PREMIUM_PRODUCT_SLUG } from "@/lib/billing/constants";
import {
  dodoPayments,
  dodoWebhookSecret,
  premiumProductId,
} from "@/lib/billing/dodo";
import {
  handlePremiumDisputeOpened,
  handlePremiumDisputeResolved,
  handlePremiumPaymentProcessing,
  handlePremiumPaymentRevoked,
  handlePremiumPaymentSucceeded,
  handlePremiumRefundSucceeded,
} from "@/lib/billing/entitlements";

const dodoPlugins: DodoPaymentsPlugins = [
  checkout({
    products: [
      {
        productId: premiumProductId,
        slug: PREMIUM_PRODUCT_SLUG,
      },
    ],
    successUrl: "/billing/success",
    authenticatedUsersOnly: true,
  }),
  portal(),
  webhooks({
    webhookKey: dodoWebhookSecret,
    onPayload: async (payload) => {
      switch (payload.type) {
        case "payment.cancelled":
        case "payment.failed":
          await handlePremiumPaymentRevoked(payload);
          break;
        case "payment.processing":
          await handlePremiumPaymentProcessing(payload);
          break;
        case "payment.succeeded":
          await handlePremiumPaymentSucceeded(payload);
          break;
        case "refund.succeeded":
          await handlePremiumRefundSucceeded(payload);
          break;
        case "dispute.opened":
        case "dispute.accepted":
        case "dispute.lost":
          await handlePremiumDisputeOpened(payload);
          break;
        case "dispute.cancelled":
        case "dispute.won":
          await handlePremiumDisputeResolved(payload);
          break;
        default:
          break;
      }
    },
  }),
];

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: env.BETTER_AUTH_SECRET,
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    dodopayments({
      client: dodoPayments,
      createCustomerOnSignUp: true,
      use: dodoPlugins,
    }),
  ],
});

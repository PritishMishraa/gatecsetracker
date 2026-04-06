import "server-only";

import { and, eq } from "drizzle-orm";

import db from "@/db";
import { dodoWebhookEvent, premiumPurchase, user } from "@/db/schema";
import {
  PREMIUM_PURCHASE_SOURCE,
  PREMIUM_REFERENCE_METADATA_KEY,
  PREMIUM_SOURCE_METADATA_KEY,
} from "@/lib/billing/constants";
import { premiumProductId } from "@/lib/billing/dodo";

type AppUser = typeof user.$inferSelect;
type PaymentPayload = {
  created_at: Date;
  customer: {
    customer_id: string;
    email: string;
  };
  metadata: Record<string, unknown>;
  payment_id: string;
  payload_type: "Payment";
  product_cart: Array<{
    product_id: string;
    quantity: number;
  }> | null;
};

type PaymentSucceededPayload = {
  business_id: string;
  data: PaymentPayload;
  timestamp: Date;
  type: "payment.succeeded";
};

type PaymentRevokedPayload = {
  business_id: string;
  data: PaymentPayload;
  timestamp: Date;
  type: "payment.cancelled" | "payment.failed";
};

type PaymentProcessingPayload = {
  business_id: string;
  data: PaymentPayload;
  timestamp: Date;
  type: "payment.processing";
};

type RefundPayload = {
  created_at: Date;
  payment_id: string;
  payload_type: "Refund";
  refund_id: string;
};

type RefundSucceededPayload = {
  business_id: string;
  data: RefundPayload;
  timestamp: Date;
  type: "refund.succeeded";
};

type DisputePayload = {
  created_at: Date;
  dispute_id: string;
  payment_id: string;
  payload_type: "Dispute";
};

type DisputeRevokedPayload = {
  business_id: string;
  data: DisputePayload;
  timestamp: Date;
  type: "dispute.accepted" | "dispute.lost" | "dispute.opened";
};

type DisputeResolvedPayload = {
  business_id: string;
  data: DisputePayload;
  timestamp: Date;
  type: "dispute.cancelled" | "dispute.won";
};

type SupportedWebhookPayload =
  | DisputeResolvedPayload
  | DisputeRevokedPayload
  | PaymentProcessingPayload
  | PaymentRevokedPayload
  | PaymentSucceededPayload
  | RefundSucceededPayload;

function getWebhookEventObjectId(payload: SupportedWebhookPayload) {
  const data = payload.data as Record<string, unknown>;

  for (const key of [
    "payment_id",
    "refund_id",
    "dispute_id",
    "subscription_id",
    "license_key_id",
  ]) {
    const value = data[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return `${payload.type}:${payload.timestamp}`;
}

async function recordWebhookEvent(payload: SupportedWebhookPayload) {
  const result = await db
    .insert(dodoWebhookEvent)
    .values({
      eventType: payload.type,
      eventObjectId: getWebhookEventObjectId(payload),
      payloadType: payload.data.payload_type,
      occurredAt: new Date(payload.timestamp),
      payload,
    })
    .onConflictDoNothing()
    .returning({ eventType: dodoWebhookEvent.eventType });

  return result.length > 0;
}

async function syncDodoCustomerId(appUser: AppUser, dodoCustomerId: string) {
  if (!dodoCustomerId || appUser.dodoCustomerId === dodoCustomerId) {
    return;
  }

  await db
    .update(user)
    .set({
      dodoCustomerId,
      updatedAt: new Date(),
    })
    .where(eq(user.id, appUser.id));
}

async function findUserById(userId: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return result[0] ?? null;
}

async function findUserByDodoCustomerId(dodoCustomerId: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.dodoCustomerId, dodoCustomerId))
    .limit(1);

  return result[0] ?? null;
}

async function findUserByEmail(email: string) {
  const result = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return result[0] ?? null;
}

async function resolveUserForPayment(payment: PaymentPayload) {
  const metadataUserId =
    payment.metadata[PREMIUM_REFERENCE_METADATA_KEY] ??
    payment.metadata.referenceId;

  if (typeof metadataUserId === "string") {
    const appUser = await findUserById(metadataUserId);

    if (appUser) {
      await syncDodoCustomerId(appUser, payment.customer.customer_id);
      return appUser;
    }
  }

  const customerMatch = await findUserByDodoCustomerId(
    payment.customer.customer_id,
  );

  if (customerMatch) {
    return customerMatch;
  }

  const emailMatch = await findUserByEmail(payment.customer.email);

  if (emailMatch) {
    await syncDodoCustomerId(emailMatch, payment.customer.customer_id);
    return emailMatch;
  }

  return null;
}

function isPremiumPayment(payment: PaymentPayload) {
  const hasPremiumProduct = payment.product_cart?.some(
    (item) => item.product_id === premiumProductId,
  );
  const hasPremiumSource =
    payment.metadata[PREMIUM_SOURCE_METADATA_KEY] === PREMIUM_PURCHASE_SOURCE;

  return hasPremiumProduct || hasPremiumSource;
}

async function revokePremiumPurchase(
  paymentId: string,
  revokedReason: string,
  revokedAt: Date,
) {
  await db
    .update(premiumPurchase)
    .set({
      status: "revoked",
      revokedAt,
      revokedReason,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(premiumPurchase.paymentId, paymentId),
        eq(premiumPurchase.productId, premiumProductId),
      ),
    );
}

async function restorePremiumPurchase(paymentId: string) {
  await db
    .update(premiumPurchase)
    .set({
      status: "active",
      revokedAt: null,
      revokedReason: null,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(premiumPurchase.paymentId, paymentId),
        eq(premiumPurchase.productId, premiumProductId),
      ),
    );
}

export async function hasPremiumAccess(userId: string) {
  const result = await db
    .select({ paymentId: premiumPurchase.paymentId })
    .from(premiumPurchase)
    .where(
      and(
        eq(premiumPurchase.userId, userId),
        eq(premiumPurchase.productId, premiumProductId),
        eq(premiumPurchase.status, "active"),
      ),
    )
    .limit(1);

  return result.length > 0;
}

export async function handlePremiumPaymentSucceeded(
  payload: PaymentSucceededPayload,
) {
  if (!(await recordWebhookEvent(payload))) {
    return;
  }

  if (!isPremiumPayment(payload.data)) {
    return;
  }

  const appUser = await resolveUserForPayment(payload.data);

  if (!appUser) {
    console.error(
      "DodoPayments: could not match premium payment to an application user",
      {
        paymentId: payload.data.payment_id,
        customerId: payload.data.customer.customer_id,
        customerEmail: payload.data.customer.email,
      },
    );
    return;
  }

  await db
    .insert(premiumPurchase)
    .values({
      paymentId: payload.data.payment_id,
      userId: appUser.id,
      dodoCustomerId: payload.data.customer.customer_id,
      productId: premiumProductId,
      status: "active",
      grantedAt: payload.data.created_at,
    })
    .onConflictDoUpdate({
      target: premiumPurchase.paymentId,
      set: {
        userId: appUser.id,
        dodoCustomerId: payload.data.customer.customer_id,
        productId: premiumProductId,
        status: "active",
        grantedAt: payload.data.created_at,
        revokedAt: null,
        revokedReason: null,
        updatedAt: new Date(),
      },
    });
}

export async function handlePremiumPaymentRevoked(
  payload: PaymentRevokedPayload,
) {
  if (!(await recordWebhookEvent(payload))) {
    return;
  }

  await revokePremiumPurchase(
    payload.data.payment_id,
    payload.type,
    payload.data.created_at,
  );
}

export async function handlePremiumPaymentProcessing(
  payload: PaymentProcessingPayload,
) {
  await recordWebhookEvent(payload);
}

export async function handlePremiumRefundSucceeded(
  payload: RefundSucceededPayload,
) {
  if (!(await recordWebhookEvent(payload))) {
    return;
  }

  await revokePremiumPurchase(
    payload.data.payment_id,
    "refund.succeeded",
    payload.data.created_at,
  );
}

export async function handlePremiumDisputeOpened(
  payload: DisputeRevokedPayload,
) {
  if (!(await recordWebhookEvent(payload))) {
    return;
  }

  await revokePremiumPurchase(
    payload.data.payment_id,
    payload.type,
    payload.data.created_at,
  );
}

export async function handlePremiumDisputeResolved(
  payload: DisputeResolvedPayload,
) {
  if (!(await recordWebhookEvent(payload))) {
    return;
  }

  await restorePremiumPurchase(payload.data.payment_id);
}

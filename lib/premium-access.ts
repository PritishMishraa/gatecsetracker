import { hasPremiumAccess as getHasPremiumAccess } from "@/lib/billing/entitlements";
import { getServerSession } from "@/lib/session";

export async function hasPremiumAccess(userId: string) {
  try {
    return await getHasPremiumAccess(userId);
  } catch (error) {
    console.error("Failed to resolve premium access", error);
    return false;
  }
}

export async function getServerPremiumAccess() {
  const session = await getServerSession();

  if (!session?.user.id) {
    return {
      session,
      hasPremiumAccess: false,
    };
  }

  return {
    session,
    hasPremiumAccess: await hasPremiumAccess(session.user.id),
  };
}

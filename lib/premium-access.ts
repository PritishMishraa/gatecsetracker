import { eq } from "drizzle-orm";

import db from "@/db";
import { user } from "@/db/schema";
import { getServerSession } from "@/lib/session";

export async function hasPremiumAccess(userId: string) {
  try {
    const result = await db
      .select({ hasPremiumAccess: user.hasPremiumAccess })
      .from(user)
      .where(eq(user.id, userId))
      .limit(1);

    return result[0]?.hasPremiumAccess === true;
  } catch (error) {
    console.error("Failed to resolve premium access", error);
    return false;
  }
}

export async function getServerPremiumAccess() {
  const session = await getServerSession();

  return {
    session,
    hasPremiumAccess: session?.user.hasPremiumAccess ?? false,
  };
}

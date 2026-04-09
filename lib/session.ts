import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type AppSession = typeof auth.$Infer.Session | null;

export async function getServerSession(): Promise<AppSession> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";
import type { auth } from "@/lib/auth";

type SessionData = typeof auth.$Infer.Session | null;

type SessionContextType = {
  session: SessionData;
  isPending: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  isPending: true,
});

export function SessionProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: SessionData;
}) {
  const { data: clientSession, isPending } = useSession();

  const session = isPending ? initialSession : (clientSession as SessionData);
  const isLoading = isPending && !initialSession;

  return (
    <SessionContext value={{ session, isPending: isLoading }}>
      {children}
    </SessionContext>
  );
}

export function useAuthSession() {
  return useContext(SessionContext);
}

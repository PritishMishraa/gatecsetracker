"use client";

import { createContext, useContext } from "react";
import { useSession } from "@/lib/auth-client";
import type { AppSession } from "@/lib/session";

type SessionData = AppSession;

type SessionContextType = {
  session: SessionData;
  user: SessionData extends null
    ? null
    : NonNullable<SessionData>["user"] | null;
  isAuthenticated: boolean;
  hasPremiumAccess: boolean;
  isPending: boolean;
};

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
  hasPremiumAccess: false,
  isPending: true,
});

export function SessionProvider({
  children,
  initialSession,
  initialHasPremiumAccess,
}: {
  children: React.ReactNode;
  initialSession: SessionData;
  initialHasPremiumAccess: boolean;
}) {
  const { data: clientSession, isPending } = useSession();

  const session = isPending ? initialSession : (clientSession as SessionData);
  const user = session?.user ?? null;
  const isAuthenticated = Boolean(user);
  const hasPremiumAccess =
    Boolean(user?.id) && user?.id === initialSession?.user.id
      ? initialHasPremiumAccess
      : false;
  const isLoading = isPending && !initialSession;

  return (
    <SessionContext
      value={{
        session,
        user,
        isAuthenticated,
        hasPremiumAccess,
        isPending: isLoading,
      }}
    >
      {children}
    </SessionContext>
  );
}

export function useAuthSession() {
  return useContext(SessionContext);
}

export function usePremiumAccess() {
  const { hasPremiumAccess, isAuthenticated, isPending } = useAuthSession();

  return {
    hasPremiumAccess,
    isAuthenticated,
    isPending,
  };
}

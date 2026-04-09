import { dodopaymentsClient } from "@dodopayments/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [dodopaymentsClient()],
});

export const { deleteUser, signIn, signUp, signOut, useSession } = authClient;

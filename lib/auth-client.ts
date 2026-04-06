import { dodopaymentsClient } from "@dodopayments/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [dodopaymentsClient()],
});

export const { deleteUser, signIn, signUp, signOut, useSession } = authClient;

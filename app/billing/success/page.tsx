import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getServerPremiumAccess } from "@/lib/premium-access";

export default async function BillingSuccessPage() {
  const { session, hasPremiumAccess } = await getServerPremiumAccess();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="relative overflow-clip">
      <div className="paper-texture" />
      <div className="relative z-10 container mx-auto max-w-3xl px-4 py-16">
        <div className="bg-card border-border/40 rounded-4xl border p-8 text-center shadow-sm md:p-12">
          <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-[0.24em] uppercase">
            Dodo Payments
          </p>
          <h1 className="paper-hero-title mb-4 text-4xl tracking-tight md:text-5xl">
            {hasPremiumAccess
              ? "Premium access is active."
              : "Payment received. Finalizing access."}
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-base leading-relaxed font-light">
            {hasPremiumAccess
              ? "Your purchase has been confirmed through the verified webhook flow. Premium playlists are now unlocked on your account."
              : "Access is granted only after the verified Dodo webhook is processed. This usually takes a few seconds. Refresh this page if you completed checkout just now."}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/subject">Go to premium playlists</Link>
            </Button>
            {!hasPremiumAccess ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/billing/success">Refresh status</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

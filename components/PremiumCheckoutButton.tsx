"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAuthSession } from "@/components/SessionProvider";
import { Button } from "@/components/ui/button";
import {
  PREMIUM_PRODUCT_SLUG,
  PREMIUM_PURCHASE_SOURCE,
  PREMIUM_REFERENCE_METADATA_KEY,
  PREMIUM_SOURCE_METADATA_KEY,
} from "@/lib/billing/constants";
import { authClient } from "@/lib/auth-client";

type PremiumCheckoutButtonProps = React.ComponentProps<typeof Button>;

export function PremiumCheckoutButton({
  children,
  disabled,
  onClick,
  ...props
}: PremiumCheckoutButtonProps) {
  const router = useRouter();
  const { hasPremiumAccess, session } = useAuthSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    await onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    if (hasPremiumAccess) {
      router.push("/subject");
      return;
    }

    if (!session?.user.id) {
      router.push("/sign-in");
      return;
    }

    setIsRedirecting(true);

    const { data, error } = await authClient.dodopayments.checkoutSession({
      slug: PREMIUM_PRODUCT_SLUG,
      referenceId: session.user.id,
      metadata: {
        [PREMIUM_REFERENCE_METADATA_KEY]: session.user.id,
        [PREMIUM_SOURCE_METADATA_KEY]: PREMIUM_PURCHASE_SOURCE,
      },
    });

    if (error || !data?.url) {
      setIsRedirecting(false);
      toast.error(error?.message ?? "Could not start the Dodo checkout.");
      return;
    }

    window.location.href = data.url;
  }

  return (
    <Button
      {...props}
      disabled={disabled || isRedirecting}
      onClick={handleClick}
    >
      {isRedirecting ? <Loader2 className="size-4 animate-spin" /> : null}
      {children ?? "Buy Premium"}
    </Button>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { PremiumCheckoutButton } from "@/components/PremiumCheckoutButton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PlaylistList({
  slug,
  playlists,
  hasSession,
  hasPremiumAccess,
}: {
  slug: string;
  playlists: Playlist[];
  hasSession: boolean;
  hasPremiumAccess: boolean;
}) {
  const router = useRouter();
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false);

  function handlePlaylistClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    playlist: Playlist,
  ) {
    if (playlist.access !== "auth") return;

    if (hasPremiumAccess) return;

    e.preventDefault();

    if (!hasSession) {
      router.push("/sign-in");
      return;
    }

    setPremiumDialogOpen(true);
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {playlists.map((playlist) => (
          <Link
            key={playlist.slug}
            href={`/subject/${slug}/${playlist.slug}`}
            onClick={(e) => handlePlaylistClick(e, playlist)}
            className="group bg-card border-border/40 hover:border-border/80 block rounded-4xl border p-8 shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-foreground text-lg font-medium">
                {playlist.name}
              </h3>
              {playlist.access === "auth" && (
                <Badge className="border border-amber-500/25 bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>
            {playlist.channelName && (
              <p className="text-muted-foreground text-sm font-light">
                {playlist.channelName}
              </p>
            )}
          </Link>
        ))}
      </div>

      <Dialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Get access to premium playlists from top educators and accelerate
              your GATE preparation.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 rounded-2xl p-6 text-center">
            <p className="text-muted-foreground mb-1 text-sm">One-time</p>
            <p className="text-foreground text-4xl font-semibold tracking-tight">
              ₹799
            </p>
            <p className="text-muted-foreground mt-1 text-sm">
              Lifetime access to all premium playlists
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <PremiumCheckoutButton className="w-full rounded-full" size="lg">
              Buy Premium
            </PremiumCheckoutButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

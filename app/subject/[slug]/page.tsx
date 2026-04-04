import { notFound } from "next/navigation";

import subjects from "@/data/subjects.json";
import allPlaylists from "@/data/playlists.json";
import { getServerPremiumAccess } from "@/lib/premium-access";

import PlaylistList from "./PlaylistList";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const subjectData = subjects.find(
    (s: (typeof subjects)[number]) => s.slug === slug,
  );

  if (!subjectData) {
    notFound();
  }

  const playlists = (
    allPlaylists as Record<string, Playlist[]>
  )[subjectData.code];

  if (!playlists || playlists.length === 0) {
    notFound();
  }

  const hasPremiumPlaylists = playlists.some(
    (playlist) => playlist.access === "auth",
  );
  const { session, hasPremiumAccess } = hasPremiumPlaylists
    ? await getServerPremiumAccess()
    : { session: null, hasPremiumAccess: false };

  return (
    <div className="relative overflow-clip">
      <div className="paper-texture" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 py-12">
        <div className="bg-card border-border/40 mb-8 rounded-4xl border p-8 shadow-sm md:p-12">
          <h1 className="paper-hero-title mb-4 text-4xl tracking-tight md:text-5xl">
            {subjectData.name}
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Select a playlist to start tracking
          </p>
        </div>

        <PlaylistList
          slug={slug}
          playlists={playlists}
          hasSession={Boolean(session)}
          hasPremiumAccess={hasPremiumAccess}
        />
      </div>
    </div>
  );
}

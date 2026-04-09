import { notFound, redirect } from "next/navigation";

import subjects from "@/data/subjects.json";
import allPlaylists from "@/data/playlists.json";
import { getServerPremiumAccess } from "@/lib/premium-access";

import SubjectContent from "./SubjectContent";

const playlistDataModules = {
  a: () => import("@/data/a.json"),
  algo: () => import("@/data/algo.json"),
  cd: () => import("@/data/cd.json"),
  cn: () => import("@/data/cn.json"),
  coa: () => import("@/data/coa.json"),
  cp: () => import("@/data/cp.json"),
  dbms: () => import("@/data/dbms.json"),
  dl: () => import("@/data/dl.json"),
  dm: () => import("@/data/dm.json"),
  "dm-gate-wallah": () => import("@/data/dm-gate-wallah.json"),
  ds: () => import("@/data/ds.json"),
  em: () => import("@/data/em.json"),
  os: () => import("@/data/os.json"),
  toc: () => import("@/data/toc.json"),
} as Record<string, () => Promise<{ default: Video[] }>>;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; playlist: string }>;
}) {
  const { slug, playlist: playlistSlug } = await params;

  const subjectData = subjects.find(
    (s: (typeof subjects)[number]) => s.slug === slug,
  );

  if (!subjectData) {
    notFound();
  }

  const playlists = (
    allPlaylists as Record<string, Playlist[]>
  )[subjectData.code];

  if (!playlists) {
    notFound();
  }

  const playlist = playlists.find((p) => p.slug === playlistSlug);

  if (!playlist) {
    notFound();
  }

  if (playlist.access === "auth") {
    const { session, hasPremiumAccess } = await getServerPremiumAccess();
    if (!session) {
      redirect("/sign-in");
    }
    if (!hasPremiumAccess) {
      redirect(`/subject/${slug}`);
    }
  }

  const loadData = playlistDataModules[playlist.dataFile];

  if (!loadData) {
    notFound();
  }

  const data = (await loadData()).default;

  return (
    <SubjectContent
      subject={subjectData.name}
      subjectCode={`${subjectData.code}-${playlist.slug}`}
      initialData={data}
    />
  );
}

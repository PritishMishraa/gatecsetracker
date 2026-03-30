import { notFound } from "next/navigation";

import subjects from "@/data/subjects.json";

import SubjectContent from "./SubjectContent";

const subjectDataModules = {
  a: () => import("@/data/a.json"),
  algo: () => import("@/data/algo.json"),
  cd: () => import("@/data/cd.json"),
  cn: () => import("@/data/cn.json"),
  coa: () => import("@/data/coa.json"),
  cp: () => import("@/data/cp.json"),
  dbms: () => import("@/data/dbms.json"),
  dl: () => import("@/data/dl.json"),
  dm: () => import("@/data/dm.json"),
  ds: () => import("@/data/ds.json"),
  em: () => import("@/data/em.json"),
  os: () => import("@/data/os.json"),
  toc: () => import("@/data/toc.json"),
} as Record<string, () => Promise<{ default: Video[] }>>;

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

  const loadData = subjectDataModules[subjectData.code];

  if (!loadData) {
    notFound();
  }

  const data = (await loadData()).default;

  return (
    <SubjectContent
      subject={subjectData.name}
      subjectCode={subjectData.code}
      initialData={data}
    />
  );
}

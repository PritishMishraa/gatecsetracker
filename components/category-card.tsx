"use client";

import Link from "next/link";

export default function CategoryCard({
  name,
  description,
  icon,
  slug,
  href,
}: {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  pattern?: { y: number; squares: [number, number][] };
}) {
  const destination = href ?? `/subject/${slug}`;

  return (
    <Link
      href={destination}
      className="group bg-card border-border/40 hover:border-border/80 block rounded-4xl border p-8 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="bg-background text-foreground mb-6 flex h-12 w-12 items-center justify-center rounded-full">
        {icon}
      </div>
      <h3 className="text-foreground mb-2 text-lg font-medium">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed font-light">
        {description}
      </p>
    </Link>
  );
}

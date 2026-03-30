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
      className="group block bg-card rounded-[2rem] border border-border/40 p-8 shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200"
    >
      <div className="w-12 h-12 bg-background rounded-full mb-6 flex items-center justify-center text-foreground">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 text-foreground">{name}</h3>
      <p className="text-sm text-muted-foreground font-light leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

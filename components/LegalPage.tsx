import Link from "next/link";
import type { ReactNode } from "react";

type LegalSection = {
  title: string;
  content: ReactNode;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  effectiveDate: string;
  sections: LegalSection[];
};

export function LegalPage({
  eyebrow,
  title,
  description,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <main className="relative overflow-clip">
      <div className="paper-texture" />

      <section className="relative z-10 mx-auto max-w-4xl px-4 pt-24 pb-20 md:px-6">
        <div className="bg-card border-border/60 rounded-[2rem] border p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] md:p-12">
          <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
            {eyebrow}
          </p>

          <h1 className="mb-4 text-4xl leading-tight font-normal tracking-tight md:text-5xl">
            {title}
          </h1>

          <p className="text-muted-foreground max-w-3xl text-base leading-8 font-light md:text-lg">
            {description}
          </p>

          <div className="bg-background border-border/60 mt-8 inline-flex rounded-full border px-4 py-2 text-sm">
            Effective date: {effectiveDate}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-24 md:px-6">
        <article className="bg-card border-border/60 rounded-[2rem] border p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] md:p-12">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl leading-tight font-normal tracking-tight md:text-3xl">
                  {section.title}
                </h2>
                <div className="text-muted-foreground space-y-4 text-[15px] leading-8 font-light md:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="border-border/60 mt-12 border-t pt-8 text-sm">
            <Link href="/" className="hover:text-foreground transition-colors">
              Back to home
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

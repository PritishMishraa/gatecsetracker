import Link from "next/link";
import { EarlyAccessForm } from "./early-access-form";
import { EarlyAccessHero } from "./early-access-hero";

type EarlyAccessPageProps = {
  initialEmail: string;
};

export function EarlyAccessPage({ initialEmail }: EarlyAccessPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0f1623] [font-family:var(--font-dm-sans)] text-white">
      <PageBackground />

      <div className="relative z-10 grid min-h-screen grid-rows-[auto_1fr_auto]">
        <EarlyAccessNav />

        <main className="grid md:grid-cols-[minmax(0,1fr)_500px]">
          <EarlyAccessHero />

          <aside className="order-first flex flex-col justify-center border-b border-white/10 bg-white px-5 py-8 text-[#0f1623] shadow-[0_18px_40px_rgba(15,22,35,0.28)] sm:px-7 sm:py-10 md:order-0 md:border-t-0 md:border-b-0 md:border-l md:px-11 md:py-14 md:shadow-none">
            <div className="mx-auto w-full max-w-110 md:max-w-none">
              <EarlyAccessForm initialEmail={initialEmail} />
            </div>
          </aside>
        </main>

        <EarlyAccessFooter />
      </div>
    </div>
  );
}

function PageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_10%,rgba(37,99,235,0.13)_0%,transparent_70%),radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(37,99,235,0.07)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[28px_28px]" />
    </div>
  );
}

function EarlyAccessNav() {
  return (
    <nav className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6 md:px-12">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-blue-600 [font-family:var(--font-dm-mono)] text-xs font-bold text-white">
          GC
        </div>
        <span className="text-sm font-semibold tracking-[-0.01em] text-white/75">
          GATE CSE Tracker
        </span>
      </Link>

      <span className="shrink-0 rounded border border-blue-500/25 bg-blue-500/10 px-2 py-1 [font-family:var(--font-dm-mono)] text-[10px] tracking-[0.08em] text-blue-400 uppercase">
        Early Access
      </span>
    </nav>
  );
}

function EarlyAccessFooter() {
  return (
    <footer className="flex flex-col gap-1 border-t border-white/10 px-5 py-4 text-center [font-family:var(--font-dm-mono)] text-[10.5px] text-white/25 sm:px-6 md:flex-row md:items-center md:justify-between md:px-12 md:text-left">
      <span>© 2026 Pritish Mishra</span>
      <Link href="/" className="hover:text-white/50">
        gatecsetracker.vercel.app
      </Link>
    </footer>
  );
}

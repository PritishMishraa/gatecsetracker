import { EARLY_ACCESS_FEATURES } from "./constants";

export function EarlyAccessHero() {
  return (
    <section className="hidden flex-col justify-center md:flex md:px-14 md:py-18">
      <div className="mb-6 inline-flex items-center gap-2 [font-family:var(--font-dm-mono)] text-[10.5px] tracking-[0.12em] text-blue-400 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        Coming back. Better.
      </div>

      <h1 className="mb-5 max-w-[11ch] [font-family:var(--font-instrument-serif)] text-[clamp(2rem,10vw,3.375rem)] leading-[1.02] tracking-[-0.02em] text-balance md:mb-6 md:max-w-[12ch] md:leading-[1.1]">
        Track your prep.
        <br />
        <span className="bg-linear-to-br from-blue-300 to-blue-600 bg-clip-text text-transparent italic">
          Actually finish it.
        </span>
      </h1>

      <p className="mb-10 max-w-120 text-[14px] leading-7 text-pretty text-white/55 sm:text-[15px] sm:leading-8 md:mb-12 md:max-w-105">
        GATE CSE Tracker is being rebuilt from scratch{" "}
        <strong className="font-medium text-white/80">
          with cleaner UI, curated resources, real progress tracking,
        </strong>{" "}
        and sync across devices. Register now for early access and a launch
        discount.
      </p>

      <p className="mb-3 [font-family:var(--font-dm-mono)] text-[10px] tracking-[0.14em] text-white/30 uppercase">
        What&apos;s coming
      </p>

      <div className="max-w-105 overflow-hidden rounded-[18px] border border-white/10 bg-white/2 shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
        {EARLY_ACCESS_FEATURES.map((feature, index) => (
          <div
            key={feature}
            className="flex gap-3 border-b border-white/5 px-3.5 py-3 transition-colors last:border-b-0 hover:bg-white/3 sm:gap-4 sm:px-4"
          >
            <span className="min-w-5 pt-0.5 [font-family:var(--font-dm-mono)] text-[11px] text-white/20">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[13px] leading-6 text-white/60 sm:text-[13.5px]">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Crown,
  ListChecks,
  ListVideo,
  Star,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const subjects = [
  { name: "Operating Systems", progress: 82, tone: "strong" },
  { name: "DBMS", progress: 68, tone: "warm" },
  { name: "Computer Networks", progress: 51, tone: "calm" },
  { name: "Algorithms", progress: 37, tone: "strong" },
];

const premiumFeatures = [
  {
    title: "Calendar Planning",
    description:
      "Block subjects across the month, keep revision windows visible, and stop overloading one week before a mock.",
    icon: CalendarDays,
  },
  {
    title: "Custom YouTube Playlists",
    description:
      "Attach your own playlist to each subject, compare channels, and keep every lecture sequence in one place.",
    icon: ListVideo,
  },
  {
    title: "Study Command Center",
    description:
      "See timeline, pending topics, revisions due, and your next best study move — without jumping across pages.",
    icon: Crown,
  },
];

const planDays = [
  { day: "Mon", subject: "OS", state: "Lecture + notes" },
  { day: "Tue", subject: "DBMS", state: "Revision sprint" },
  { day: "Wed", subject: "CN", state: "PYQ block" },
  { day: "Thu", subject: "Algo", state: "Weak topics" },
  { day: "Fri", subject: "COA", state: "Mock follow-up" },
];

const faqs = [
  {
    question: "What does premium unlock?",
    answer:
      "Premium at ₹799 adds the planning and organization layer: calendar view, custom YouTube playlists, richer subject timelines, and guided study structure.",
  },
  {
    question: "Will free users still be able to track subjects?",
    answer:
      "Yes. Core subject tracking remains free and accessible. Premium adds the planning, scheduling, and personalized resource management layer on top.",
  },
  {
    question: "Is this built specifically for GATE CSE?",
    answer:
      "Yes. Every subject, channel recommendation, and planning feature is designed around the GATE CSE syllabus and the way Indian students actually prepare.",
  },
];

export default async function Home() {
  const stars = await fetch(
    "https://api.github.com/repos/PritishMishraa/gatecsetracker",
    {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    },
  )
    .then(async (res) => {
      if (!res.ok) return 1200;
      const data = (await res.json()) as { stargazers_count?: number };
      return data.stargazers_count ?? 1200;
    })
    .catch(() => 1200);

  return (
    <main className="relative overflow-clip">
      <div className="paper-texture" />

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 pb-32 text-center">
        <h1 className="paper-hero-title mb-6 max-w-[18ch] text-5xl leading-[1.08] tracking-tight md:text-7xl">
          Track every subject,
          <br />
          plan every revision,
          <br />
          own your GATE prep.
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed font-light md:text-xl">
          A calmer study dashboard for Indian students — subject progress,
          lecture tracking, calendar planning, and a clear path to exam day.
        </p>
        <div className="mb-20 flex items-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base shadow-sm"
          >
            <Link href="/subject">Start tracking now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-card border-border hover:bg-accent/50 rounded-full px-8 text-base"
          >
            <Link href="#premium">See premium</Link>
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-card border-border/60 w-full rounded-4xl border p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
          <div className="bg-background border-border/40 rounded-3xl border p-6 md:p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                  Overall completion
                </p>
                <p className="text-4xl font-semibold tracking-tight">61%</p>
              </div>
              <div className="text-muted-foreground flex items-center gap-6 text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-3.5 fill-current" />
                  {stars.toLocaleString()} stars
                </span>
                <span>13 subjects</span>
              </div>
            </div>

            <div className="mb-8 grid gap-3">
              {subjects.map((s) => (
                <div
                  key={s.name}
                  className="border-border/60 bg-card/80 rounded-2xl border p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <p className="font-medium">{s.name}</p>
                    <span className="text-sm font-semibold">{s.progress}%</span>
                  </div>
                  <Progress
                    value={s.progress}
                    className={`bg-muted/50 h-1.5 subject-progress-${s.tone}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
                This week&apos;s plan
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {planDays.map((d) => (
                  <div
                    key={d.day}
                    className="border-border/50 bg-card/60 rounded-2xl border p-4"
                  >
                    <span className="text-muted-foreground text-[0.65rem] font-bold tracking-widest uppercase">
                      {d.day}
                    </span>
                    <p className="mt-1 font-semibold">{d.subject}</p>
                    <p className="text-muted-foreground text-sm">{d.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-card/50 border-border/50 relative z-10 border-y px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="bg-background border-border/50 rounded-[3rem] border p-12 text-center md:p-24">
            <h2 className="mx-auto mb-6 max-w-2xl text-4xl leading-tight font-normal tracking-tight md:text-5xl">
              Finally, a study tracker built for your exam.
            </h2>
            <p className="text-muted-foreground mx-auto mb-16 max-w-xl text-lg leading-relaxed font-light">
              Subject tracking, lecture organization, and revision planning in
              one place — designed around the way GATE aspirants actually study.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-card border-border/40 rounded-4xl border p-8 text-left shadow-sm">
                <div className="bg-background mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="mb-3 text-xl font-normal">Subject Progress</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Track lectures watched, PYQs solved, and revision rounds per
                  subject. See where you stand at a glance without spreadsheet
                  chaos.
                </p>
              </div>
              <div className="bg-card border-border/40 rounded-4xl border p-8 text-left shadow-sm">
                <div className="bg-background mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                  <span className="text-xl">📺</span>
                </div>
                <h3 className="mb-3 text-xl font-normal">Lecture Channels</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  Browse curated YouTube channels per subject. Compare teaching
                  styles and pick what works for you — all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium ── */}
      <section
        id="premium"
        className="relative z-10 mx-auto max-w-5xl px-4 py-32"
      >
        <div className="mb-16 text-center">
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl leading-tight font-normal tracking-tight md:text-5xl">
            Premium: built for aspirants
            <br />
            who want structure.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed font-light">
            The ₹799 plan adds the organization layer — calendar planning,
            custom playlists, and guided study flow for serious aspirants.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {premiumFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-card border-border/40 rounded-4xl border p-8 shadow-sm"
              >
                <div className="bg-background mb-6 flex h-12 w-12 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </div>
                <h3 className="mb-3 text-xl font-normal">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <div className="bg-card border-border/40 rounded-4xl border p-8 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] md:p-12">
          <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-widest uppercase">
            Launch pricing
          </p>
          <p className="paper-hero-title mb-4 text-6xl tracking-tight md:text-7xl">
            ₹799
          </p>
          <p className="text-muted-foreground mx-auto mb-8 max-w-lg leading-relaxed font-light">
            One focused upgrade for students who want the planner, playlist
            organization, and deeper study structure.
          </p>
          <div className="text-muted-foreground mb-8 flex flex-col items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2">
              <ListChecks className="size-4" /> Subject timeline and calendar
              view
            </span>
            <span className="inline-flex items-center gap-2">
              <ListChecks className="size-4" /> Custom YouTube playlist support
            </span>
            <span className="inline-flex items-center gap-2">
              <ListChecks className="size-4" /> Guided revision planning
            </span>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base shadow-sm"
          >
            <Link href="/subject">Explore free tracking first</Link>
          </Button>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 py-24">
        <h2 className="mb-10 text-center text-3xl font-normal tracking-tight md:text-4xl">
          Common questions
        </h2>
        <div className="bg-card border-border/40 overflow-hidden rounded-4xl border shadow-sm">
          <Accordion type="single" collapsible className="px-6">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-5 text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-4xl font-normal tracking-tight md:text-5xl">
            Ready to start tracking?
          </h2>
          <p className="text-muted-foreground mb-10 text-lg font-light">
            Join students who are already organizing their GATE prep.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 text-base shadow-sm"
          >
            <Link href="/subject">
              Open your dashboard
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

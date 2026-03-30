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
      <section className="relative z-10 pt-24 pb-32 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
        <h1 className="paper-hero-title text-5xl md:text-7xl tracking-tight leading-[1.08] mb-6 max-w-[18ch]">
          Track every subject,
          <br />
          plan every revision,
          <br />
          own your GATE prep.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed">
          A calmer study dashboard for Indian students — subject progress,
          lecture tracking, calendar planning, and a clear path to exam day.
        </p>
        <div className="flex items-center gap-4 mb-20">
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
            className="rounded-full px-8 text-base bg-card border-border hover:bg-accent/50"
          >
            <Link href="#premium">See premium</Link>
          </Button>
        </div>

        {/* Dashboard Preview */}
        <div className="w-full bg-card rounded-[2rem] p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border/60">
          <div className="bg-background rounded-[1.5rem] p-6 md:p-8 border border-border/40">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Overall completion
                </p>
                <p className="text-4xl font-semibold tracking-tight">61%</p>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-3.5 fill-current" />
                  {stars.toLocaleString()} stars
                </span>
                <span>13 subjects</span>
              </div>
            </div>

            <div className="grid gap-3 mb-8">
              {subjects.map((s) => (
                <div
                  key={s.name}
                  className="rounded-2xl border border-border/60 bg-card/80 p-4"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="font-medium">{s.name}</p>
                    <span className="text-sm font-semibold">{s.progress}%</span>
                  </div>
                  <Progress
                    value={s.progress}
                    className={`h-1.5 bg-muted/50 subject-progress-${s.tone}`}
                  />
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                This week&apos;s plan
              </p>
              <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
                {planDays.map((d) => (
                  <div
                    key={d.day}
                    className="rounded-2xl border border-border/50 bg-card/60 p-4"
                  >
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
                      {d.day}
                    </span>
                    <p className="font-semibold mt-1">{d.subject}</p>
                    <p className="text-sm text-muted-foreground">{d.state}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative z-10 py-24 px-4 bg-card/50 border-y border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background rounded-[3rem] p-12 md:p-24 text-center border border-border/50">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-6 max-w-2xl mx-auto leading-tight">
              Finally, a study tracker built for your exam.
            </h2>
            <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto font-light leading-relaxed">
              Subject tracking, lecture organization, and revision planning in
              one place — designed around the way GATE aspirants actually study.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-[2rem] text-left shadow-sm border border-border/40">
                <div className="w-12 h-12 bg-background rounded-full mb-6 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-normal mb-3">Subject Progress</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Track lectures watched, PYQs solved, and revision rounds per
                  subject. See where you stand at a glance without spreadsheet
                  chaos.
                </p>
              </div>
              <div className="bg-card p-8 rounded-[2rem] text-left shadow-sm border border-border/40">
                <div className="w-12 h-12 bg-background rounded-full mb-6 flex items-center justify-center">
                  <span className="text-xl">📺</span>
                </div>
                <h3 className="text-xl font-normal mb-3">Lecture Channels</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
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
        className="relative z-10 py-32 px-4 max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Premium: built for aspirants
            <br />
            who want structure.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            The ₹799 plan adds the organization layer — calendar planning,
            custom playlists, and guided study flow for serious aspirants.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {premiumFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-card p-8 rounded-[2rem] border border-border/40 shadow-sm"
              >
                <div className="w-12 h-12 bg-background rounded-full mb-6 flex items-center justify-center">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-normal mb-3">{f.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <div className="bg-card rounded-[2rem] p-8 md:p-12 border border-border/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Launch pricing
          </p>
          <p className="paper-hero-title text-6xl md:text-7xl tracking-tight mb-4">
            ₹799
          </p>
          <p className="text-muted-foreground font-light max-w-lg mx-auto mb-8 leading-relaxed">
            One focused upgrade for students who want the planner, playlist
            organization, and deeper study structure.
          </p>
          <div className="flex flex-col items-center gap-3 mb-8 text-sm text-muted-foreground">
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
      <section className="relative z-10 py-24 px-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-10 text-center">
          Common questions
        </h2>
        <div className="bg-card rounded-[2rem] border border-border/40 shadow-sm overflow-hidden">
          <Accordion type="single" collapsible className="px-6">
            {faqs.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="text-base hover:no-underline py-5">
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
      <section className="relative z-10 py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">
            Ready to start tracking?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 font-light">
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

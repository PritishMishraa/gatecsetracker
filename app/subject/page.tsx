import { Subjects } from "@/components/Subjects";

const Home = () => {
  return (
    <div className="relative overflow-clip">
      <div className="paper-texture" />
      <div className="relative z-10 container mx-auto max-w-5xl px-4 pt-16 pb-24">
        <div className="mb-16 text-center">
          <h1 className="paper-hero-title mb-4 text-5xl tracking-tight md:text-6xl">
            Subjects
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Select a subject to get started
          </p>
        </div>
        <Subjects />
      </div>
    </div>
  );
};

export default Home;

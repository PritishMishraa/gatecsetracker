import { Subjects } from "@/components/Subjects";

const Home = () => {
  return (
    <div className="relative overflow-clip">
      <div className="paper-texture" />
      <div className="relative z-10 container max-w-5xl mx-auto pt-16 pb-24 px-4">
        <div className="text-center mb-16">
          <h1 className="paper-hero-title text-5xl md:text-6xl tracking-tight mb-4">
            Subjects
          </h1>
          <p className="text-lg text-muted-foreground font-light">
            Select a subject to get started
          </p>
        </div>
        <Subjects />
      </div>
    </div>
  );
};

export default Home;

import { Subjects } from "@/components/Subjects";

const Home = () => {
  const subjects = require("../../data/subjects.json");

  return (
    <div className="container flex flex-col items-center justify-center gap-12 mt-6 md:mt-10 w-full">
      <div className="relative isolate overflow-hidden mt-12 bg-primary-foreground border px-4 md:px-8 py-12 text-center rounded-3xl w-full">
        <h1 className="text-4xl md:text-7xl font-bold text-left">Subjects</h1>
        <p className="text-xl md:text-2xl text-left mt-2 text-white/60">
          Select a subject to get started
        </p>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#0061ff"></stop>
              <stop offset="1" stopColor="#60efff"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
      <Subjects />
    </div>
  );
};

export default Home;

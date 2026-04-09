import React from "react";
import { Button } from "./ui/button";
import { Balancer } from "react-wrap-balancer";

const Meteors = ({ stars }: { stars: number }) => {
  const meteorsData = [
    { left: -47, delay: 0.477302, duration: 3 },
    { left: -196, delay: 0.721956, duration: 2 },
    { left: -139, delay: 0.635347, duration: 2 },
    { left: -201, delay: 0.790141, duration: 8 },
    { left: 382, delay: 0.57702, duration: 5 },
    { left: -127, delay: 0.74778, duration: 2 },
    { left: 229, delay: 0.309663, duration: 3 },
    { left: 63, delay: 0.356933, duration: 6 },
    { left: 399, delay: 0.574186, duration: 3 },
    { left: 108, delay: 0.591709, duration: 2 },
    { left: 161, delay: 0.457191, duration: 5 },
    { left: -53, delay: 0.741664, duration: 7 },
    { left: -41, delay: 0.6042, duration: 4 },
    { left: 359, delay: 0.370395, duration: 4 },
    { left: 331, delay: 0.402273, duration: 7 },
    { left: -165, delay: 0.594254, duration: 7 },
    { left: 148, delay: 0.563339, duration: 8 },
    { left: 81, delay: 0.271407, duration: 5 },
    { left: 310, delay: 0.736792, duration: 7 },
    { left: -211, delay: 0.396247, duration: 9 },
  ];

  return (
    <div className="bg-primary-foreground relative flex h-96 w-full items-center justify-center overflow-hidden rounded-3xl border text-center">
      {meteorsData.map((meteor, index) => (
        <span
          key={index}
          className="animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-215 rounded-[9999px] bg-white shadow-[0_0_0_1px_#ffffff10]"
          style={{
            top: "-5px",
            left: `${meteor.left}px`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "50px",
              height: "1px",
              background: "linear-gradient(90deg, white, black)",
            }}
          ></div>
        </span>
      ))}
      <div className="z-10 space-y-6">
        <p>
          <Balancer className="z-10 justify-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            It&apos;s Open Source!
          </Balancer>
        </p>
        <Button
          className="rounded-full ring-white hover:ring-4"
          variant="secondary"
        >
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full px-5 py-2 text-sm"
            href="https://github.com/PritishMishraa/gatecsetracker"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{stars}</span>
            </p>
          </a>
        </Button>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 z-1 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
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
  );
};

export default Meteors;

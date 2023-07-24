import React from "react";
import { Button } from "./ui/button";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";

const WelcomeBox = () => {
  return (
    <div className="relative isolate overflow-hidden bg-primary-foreground border px-6 py-24 text-center rounded-3xl sm:px-16 w-full my-auto h-[500px]">
      <h2>
        <Balancer className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to GATE CSE Tracker
        </Balancer>
      </h2>
      <p>
        <Balancer className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
          GATE CSE Tracker is a platform to help you track your progress and
          achieve success in the GATE CSE Exam
        </Balancer>
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/subject">
          <Button className="rounded-3xl">Get Started</Button>
        </Link>
      </div>
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
          fill-opacity="0.7"
        ></circle>
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stop-color="#0061ff"></stop>
            <stop offset="1" stop-color="#60efff"></stop>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WelcomeBox;

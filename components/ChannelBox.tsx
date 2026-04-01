import React from "react";
import { Balancer } from "react-wrap-balancer";
import InfiniteMarquee from "./InfiniteMarquee";

const channelNames = [
  "KNOWLEDGE GATE",
  "Unacademy Computer Science",
  "GATE CSE LECTURES BY AMIT KHURANA",
  "GATE Wallah",
];

const ChannelBox = () => {
  return (
    <div className="w-full">
      <div className="p-2 md:hidden">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Multiple Channels
        </h2>
        <p>
          <Balancer className="text-muted-foreground max-w-xl text-lg leading-8">
            Choose whos best for you
          </Balancer>
        </p>
      </div>
      <div className="bg-primary-foreground relative isolate my-auto flex h-96 w-full justify-around overflow-hidden rounded-3xl border px-6 text-center sm:px-16">
        <div className="my-auto hidden md:flex md:flex-col">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Multiple Channels
          </h2>
          <p>
            <Balancer className="text-muted-foreground mx-auto max-w-xl text-lg leading-8">
              Choose whos best for you
            </Balancer>
          </p>
        </div>
        <div className="flex flex-col">
          <InfiniteMarquee data={channelNames} />
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute top-1/2 left-1/2 -z-10 h-256 w-5xl -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)]"
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
    </div>
  );
};

export default ChannelBox;

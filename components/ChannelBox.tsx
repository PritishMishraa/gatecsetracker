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
          <Balancer className="max-w-xl text-lg leading-8 text-muted-foreground">
            Choose whos best for you
          </Balancer>
        </p>
      </div>
      <div className="relative isolate overflow-hidden bg-primary-foreground border px-6 text-center rounded-3xl sm:px-16 w-full my-auto flex h-96 justify-around">
        <div className="hidden md:flex md:flex-col my-auto">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            Multiple Channels
          </h2>
          <p>
            <Balancer className="mx-auto max-w-xl text-lg leading-8 text-muted-foreground">
              Choose whos best for you
            </Balancer>
          </p>
        </div>
        <div className="flex flex-col">
          <InfiniteMarquee data={channelNames} />
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

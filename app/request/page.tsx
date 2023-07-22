"use client";

import React, { useState, useEffect } from "react";
import { Balancer } from "react-wrap-balancer";

const Request = () => {
  const targetDate = new Date("2023-07-30");
  const [timeRemaining, setTimeRemaining] = useState(() =>
    calculateTimeRemaining()
  );

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-center mx-auto">
      <Balancer>
        {timeRemaining && (
          <h1 className="text-9xl font-bold">
            {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}
            m {timeRemaining.seconds}s
          </h1>
        )}
      </Balancer>
    </div>
  );
};

export default Request;

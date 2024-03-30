"use client"
import React, {useEffect} from 'react'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ISPage() {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date("2024-04-02") - +new Date();
    let timeLeft: {} = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft as TimeLeft;
  }
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
      <div
          className="h-screen flex justify-center items-center px-2 bg-gradient-to-b from-sky-600 via-orange-700 to-white">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">

          <div className="py-4 px-6">
            <h2 className="text-4xl font-bold text-gray-800 text-center">Coming Soon</h2>
            <p className="mt-2 text-lg text-gray-600">We are working hard to bring you the information of <a
                href="https://instagram.com/ispresuniv" className="text-gray-500 underline hover:text-gray-700">PUMA
              Information System</a> Page. Stay
              tuned!</p>
          </div>

          <div className="py-4 px-6">
            <p className="mt-2 text-lg text-gray-600">This Page will be live in</p>
            <div className="flex justify-center items-center space-x-4 mt-4">
              <div className="text-xl font-bold text-gray-800">{timeLeft.days} Days</div>
              <div className="text-xl font-bold text-gray-800">{timeLeft.hours} Hours</div>
              <div className="text-xl font-bold text-gray-800">{timeLeft.minutes} Minutes</div>
              <div className="text-xl font-bold text-gray-800">{timeLeft.seconds} Seconds</div>
            </div>
          </div>

        </div>
      </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const calculateTimeLeft = (): TimeLeft => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isMounted]);

  if (!isMounted || !timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <div className="bg-cream border-2 border-true-black rounded-lg p-6 animate-pulse">
              <div className="h-16 bg-true-black/10 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
      {timeUnits.map((unit, index) => (
        <div key={index} className="text-center">
          <div className="bg-cream border-2 border-true-black rounded-lg p-3 sm:p-6">
            <div className="font-display text-3xl sm:text-5xl md:text-6xl">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs sm:text-sm font-medium mt-1 sm:mt-2 text-true-black/70">
              {unit.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

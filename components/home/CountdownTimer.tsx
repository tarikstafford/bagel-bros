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
      <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="aspect-square border-3 border-true-black bg-cream/50 animate-pulse"></div>
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
    <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
      {timeUnits.map((unit, index) => (
        <div
          key={index}
          className="relative aspect-square border-brutal bg-cream group hover:bg-bagel-tan transition-colors duration-300"
        >
          {/* Time Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <div className="font-display text-4xl sm:text-5xl lg:text-6xl leading-none">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-wider mt-2 opacity-60">
              {unit.label}
            </div>
          </div>

          {/* Pulsing Indicator for Seconds */}
          {unit.label === 'Secs' && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-bagel-tan rounded-full animate-pulse"></div>
          )}
        </div>
      ))}
    </div>
  );
}

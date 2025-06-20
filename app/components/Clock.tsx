'use client';

import { useEffect, useState } from 'react';
import { spaceMono } from '../fonts';
import '../components/Clock.scss';

export default function Clock({ className = '' }: { className?: string }) {
  const [time, setTime] = useState({ hours: '--', minutes: '--' });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime({ hours: h, minutes: m });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`container ${className} ${spaceMono.className}`}>
      <div className="hours">{time.hours}</div>
      <div className="minutes">{time.minutes}</div>
    </div>
  );
}

'use client';
import { useEffect, useState, useRef } from 'react';
import { spaceMono } from '@/app/fonts';
import Portfolio from '@/app/assets/logo.svg';
import './Clock.scss';

export default function Clock() {
    const [time, setTime] = useState({ hours: '--', minutes: '--' });
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<SVGSVGElement>(null);
    const modulRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const calculateOffset = () => {
            if (containerRef.current && logoRef.current && modulRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const logoRect = logoRef.current.getBoundingClientRect();
                const modulRect = modulRef.current.getBoundingClientRect();
                const offset = containerRect.width - modulRect.width - (logoRect.left - containerRect.left) * 2;
                containerRef.current.style.setProperty('--modul-offset', `${offset}px`);
            }
        };
        calculateOffset();
        window.addEventListener('resize', calculateOffset);
        return () => window.removeEventListener('resize', calculateOffset);
    }, []);

    return (
        <div className="clock" ref={containerRef}>
            <Portfolio className="logo" ref={logoRef} />
            <div ref={modulRef}>
                <div className={`container modul ${spaceMono.className}`}>
                    <div className="hours">{time.hours}</div>
                    <div className="minutes">{time.minutes}</div>
                </div>
            </div>
        </div>
    );
}

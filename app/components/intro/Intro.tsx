"use client";

import React, { useEffect, useRef, useState } from "react";
import "./Intro.scss";

const paths = [
  { d: "M40 10L50 20.0909V39.9091L40 50V10Z" },
  { d: "M0 20L27 50H40L13 20H0Z" },
  { d: "M0 0H41L50 10H10L0 0Z" },
];
const animationDuration = 1000;
const slideUpDelay = 1500;
const Intro: React.FC = () => {
    const [fill, setFill] = useState(false);
    const [shrink, setShrink] = useState(false);
    const [slideUp, setSlideUp] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [checked, setChecked] = useState(false);
    const pathsRef = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        if (sessionStorage.getItem('introSeen') === 'true') {
            setHidden(true);
        }
        setChecked(true);
    }, []);

    useEffect(() => {
        if (!checked || hidden) return;
        const start = performance.now();
        const animate = (now: number) => {
        const progress = Math.min((now - start) / animationDuration, 1);
        pathsRef.current.forEach((path) => {
            if (path) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length * (1 - progress)}`;
            }
        });
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
        };
        requestAnimationFrame(animate);
        const fillTimer = setTimeout(() => setFill(true), animationDuration);
        const shrinkTimer = setTimeout(() => setShrink(true), animationDuration + slideUpDelay - 300);
        const slideTimer = setTimeout(() => {
        setSlideUp(true);
        setTimeout(() => {
            setHidden(true);
            sessionStorage.setItem('introSeen', 'true');
        }, 1000);
        }, animationDuration + slideUpDelay);
        return () => {
            clearTimeout(fillTimer);
            clearTimeout(shrinkTimer);
            clearTimeout(slideTimer);
        };
    }, [checked, hidden]);

    if (hidden) return null;
    return (
        <div className={`intro ${slideUp ? "slideUp" : ""}`}>
            <svg
                viewBox="0 0 50 50"
                aria-label="Intro animation"
                role="img"
                className={`logo ${shrink ? "shrink" : ""}`}
            >
                <defs>
                {paths.map(({ d }, i) => (
                    <path key={i} id={`path${i}`} d={d} />
                ))}
                </defs>
                {paths.map(({ d }, i) => (
                <path
                    key={i}
                    ref={(el) => {
                    pathsRef.current[i] = el;
                    }}
                    d={d}
                    className={`path ${fill ? "filled" : ""}`}
                />
                ))}
            </svg>
        </div>
    );
};
export default Intro;
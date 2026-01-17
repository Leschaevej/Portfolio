"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/assets/logo.svg";
import { BREAKPOINTS, ANIMATION } from "@/app/constants";
import "./Header.scss";

const MIN_SIZE = { width: 150, height: 50 };
const NAV_LINKS = [
    { href: '#project', label: 'Projets' },
    { href: '#about', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
];
export default function Header() {
    const pathname = usePathname();
    const [menuState, setMenuState] = useState<"visible" | "pushingUp" | "hidden" | "pushingInFromTop">("visible");
    const [closeState, setCloseState] = useState<"hidden" | "pushingDown" | "visible" | "pushingInFromBottom">("hidden");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [linksState, setLinksState] = useState<'hidden' | 'showing' | 'hiding'>('hidden');
    const [maxSize, setMaxSize] = useState({ width: 600, height: 500 });
    const [minPos, setMinPos] = useState({ top: 50, right: 50 });
    const [maxPos, setMaxPos] = useState({ top: 40, right: 40 });
    const [logoTapped, setLogoTapped] = useState(false);
    const [modalSize, setModalSize] = useState(MIN_SIZE);
    const [modalPos, setModalPos] = useState({ top: 50, right: 50 });
    useEffect(() => {
        function updateSizes() {
            const width = window.innerWidth;
            if (width < BREAKPOINTS.MOBILE) {
                setMaxSize({ width: 280, height: 300 });
                setMinPos({ top: 30, right: 30 });
                setMaxPos({ top: 20, right: 20 });
            } else if (width < BREAKPOINTS.DESKTOP) {
                setMaxSize({ width: 400, height: 300 });
                setMinPos({ top: 50, right: 50 });
                setMaxPos({ top: 40, right: 40 });
            } else {
                setMaxSize({ width: 600, height: 500 });
                setMinPos({ top: 50, right: 50 });
                setMaxPos({ top: 40, right: 40 });
            }
        }
        updateSizes();
        window.addEventListener("resize", updateSizes);
        return () => window.removeEventListener("resize", updateSizes);
    }, []);
    function animateModal(opening: boolean, duration = ANIMATION.DURATION, callback?: () => void) {
        setIsAnimating(true);
        const startTime = performance.now();
        function step(time: number) {
            const elapsed = time - startTime;
            let progress = Math.min(elapsed / duration, 1);
            progress = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;
            if (!opening) progress = 1 - progress;
            const width = MIN_SIZE.width + (maxSize.width - MIN_SIZE.width) * progress;
            const height = MIN_SIZE.height + (maxSize.height - MIN_SIZE.height) * progress;
            const top = minPos.top + (maxPos.top - minPos.top) * progress;
            const right = minPos.right + (maxPos.right - minPos.right) * progress;
            setModalSize({ width, height });
            setModalPos({ top, right });
            if (elapsed < duration) {
                requestAnimationFrame(step);
            } else {
                setIsAnimating(false);
                if (!opening) {
                    setIsModalOpen(false);
                    setModalSize(MIN_SIZE);
                    setModalPos(minPos);
                }
                if (callback) callback();
            }
        }
        requestAnimationFrame(step);
    }
    const toggleModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true);
            setMenuState("pushingUp");
            setCloseState("pushingInFromBottom");
            setLinksState('hidden');
            animateModal(true, 500, () => {
                setMenuState("hidden");
                setCloseState("visible");
                setLinksState('showing');
            });
        } else {
            setLinksState('hiding');
            setTimeout(() => {
                setCloseState("pushingDown");
                setMenuState("pushingInFromTop");
                animateModal(false, 500, () => {
                    setCloseState("hidden");
                    setMenuState("visible");
                    setLinksState('hidden');
                });
            }, ANIMATION.DURATION);
        }
    };
    const handleLogoTouchStart = () => {
        setLogoTapped(true);
        setTimeout(() => setLogoTapped(false), ANIMATION.DURATION);
    };
    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    return (
        <header className="header">
            <Link href="/" className="logo-link" onClick={handleLogoClick}>
                <Logo
                    className={`logo ${logoTapped ? "tapped" : ""}`}
                    onTouchStart={handleLogoTouchStart}
                    role="img"
                    aria-label="Logo"
                />
            </Link>
            <div className="button-container">
                {menuState !== "hidden" && (
                    <button
                        className={`menu ${menuState === "pushingUp" ? "pushing-up" : ""} ${menuState === "pushingInFromTop" ? "push-in-from-top" : ""}`}
                        onClick={toggleModal}
                        type="button"
                    >
                        <span>MENU</span>
                    </button>
                )}
                {closeState !== "hidden" && (
                    <button
                        className={`close ${closeState === "pushingDown" ? "pushing-down" : ""} ${closeState === "pushingInFromBottom" ? "push-in-from-bottom" : ""}`}
                        onClick={toggleModal}
                        type="button"
                    >
                        <span>CLOSE</span>
                    </button>
                )}
            </div>
            {(isModalOpen || isAnimating) && (
                <div className="overlay" onClick={toggleModal}>
                    <div
                        className={`modal ${isModalOpen ? "modal-open" : ""}`}
                        style={{
                            width: modalSize.width,
                            height: modalSize.height,
                            top: modalPos.top,
                            right: modalPos.right,
                            zIndex: 5,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className={linksState === 'showing' ? "show-links" : linksState === 'hiding' ? "hide-links" : ""}>
                            {NAV_LINKS.map(({ href, label }) => (
                                <div key={href} className="link-wrapper">
                                    <a href={href} onClick={toggleModal}>{label}</a>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
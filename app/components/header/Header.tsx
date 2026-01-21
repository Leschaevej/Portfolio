"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/app/assets/logo.svg";
import { ANIMATION } from "@/app/constants";
import "./Header.scss";

const NAV_LINKS = [
    { href: '#project', label: 'Projets' },
    { href: '#about', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
];
export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [logoTapped, setLogoTapped] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const toggle = () => setIsOpen(!isOpen);
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }
            if (e.key === "Tab" && menuRef.current) {
                const focusable = menuRef.current.querySelectorAll<HTMLElement>("button, a");
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);
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
        <header>
            <Link href="/" className="link" onClick={handleLogoClick}>
                <Logo
                    className={`logo ${logoTapped ? "tapped" : ""}`}
                    onTouchStart={handleLogoTouchStart}
                    role="img"
                    aria-label="Logo"
                />
            </Link>
            <div className={`menu ${isOpen ? "open" : ""}`} ref={menuRef}>
                <button onClick={toggle} type="button">MENU</button>
                <nav>
                    <div className="inner">
                        {NAV_LINKS.map(({ href, label }) => (
                            <a key={href} href={href} onClick={toggle}>{label}</a>
                        ))}
                    </div>
                </nav>
            </div>
            {isOpen && <div className="backdrop" onClick={toggle} />}
        </header>
    );
}
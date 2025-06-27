'use client';
import React, { useEffect, useState, useRef } from "react";
import './Footer.scss';

export default function Footer() {
    const [visible, setVisible] = useState(false);
    const footerVisible = useRef(false);
    const isOnContactSection = useRef(false);
    useEffect(() => {
        function onWheel(e: WheelEvent) {
            const contactSection = document.getElementById('contact');
            if (!contactSection) return;
            const rect = contactSection.getBoundingClientRect();
            const visibleThreshold = 20;
            const isContactVisible = rect.bottom > visibleThreshold && rect.top < window.innerHeight - visibleThreshold;
            if (!isContactVisible) {
                setVisible(false);
                footerVisible.current = false;
                isOnContactSection.current = false;
                return;
            }
            isOnContactSection.current = true;
            if (e.deltaY > 0) {
                if (!footerVisible.current) {
                setVisible(true);
                footerVisible.current = true;
                }
            } else if (e.deltaY < 0) {
                if (footerVisible.current) {
                setVisible(false);
                footerVisible.current = false;
                e.preventDefault();
                e.stopPropagation();
                }
            }
        }
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);
    return (
        <footer className={`footer ${visible ? 'visible' : ''}`}>
        <p className='name'>JIMMY<br />LESCHAEVE</p>
        <p className='copyright'>©copyright 2025</p>
        </footer>
    );
}
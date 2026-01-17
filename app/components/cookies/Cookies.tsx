"use client";

import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/next';
import './Cookies.scss';

interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
}
export default function Cookies() {
    const [showModal, setShowModal] = useState(false);
    const [isEntering, setIsEntering] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>({
        essential: true,
        analytics: true
    });
    const showModalWithAnimation = () => {
        setShowModal(true);
        setIsEntering(true);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsEntering(false);
            });
        });
    };
    const closeModalWithAnimation = () => {
        setIsExiting(true);
        setTimeout(() => {
            setShowModal(false);
            setShowContent(false);
            setIsExiting(false);
        }, 400);
    };
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        const hasVisited = sessionStorage.getItem('hasVisited');
        const introSeen = sessionStorage.getItem('introSeen');
        if (consent) {
            try {
                const savedPreferences = JSON.parse(consent);
                const currentTime = Date.now();
                const thirteenMonthsInMs = 13 * 30 * 24 * 60 * 60 * 1000;
                if (savedPreferences.timestamp && (currentTime - savedPreferences.timestamp) > thirteenMonthsInMs) {
                    localStorage.removeItem('cookieConsent');
                    const delay = !hasVisited && !introSeen ? 3500 : 100;
                    setTimeout(() => showModalWithAnimation(), delay);
                } else {
                    setPreferences({
                        essential: savedPreferences.essential || true,
                        analytics: savedPreferences.analytics || false
                    });
                    setAnalyticsEnabled(savedPreferences.analytics === true);
                }
            } catch {
                localStorage.removeItem('cookieConsent');
                const delay = !hasVisited && !introSeen ? 3500 : 100;
                setTimeout(() => showModalWithAnimation(), delay);
            }
        } else {
            const delay = !hasVisited && !introSeen ? 3500 : 100;
            setTimeout(() => showModalWithAnimation(), delay);
        }
        const handleOpenModal = (event: Event) => {
            showModalWithAnimation();
            const customEvent = event as CustomEvent;
            if (customEvent.detail?.mode === 'manage') {
                setShowContent(true);
            } else {
                setShowContent(false);
            }
        };
        window.addEventListener('openCookieModal', handleOpenModal);
        return () => {
            window.removeEventListener('openCookieModal', handleOpenModal);
        };
    }, []);
    const saveConsent = (analyticsAccepted: boolean) => {
        const consentData = {
            essential: true,
            analytics: analyticsAccepted,
            timestamp: Date.now()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consentData));
        setAnalyticsEnabled(analyticsAccepted);
        closeModalWithAnimation();
    };
    const handleAcceptAll = () => {
        saveConsent(true);
    };
    const handleAcceptMinimum = () => {
        saveConsent(false);
    };
    const handleManage = () => {
        setShowContent(true);
    };
    const handleSavePreferences = () => {
        saveConsent(preferences.analytics);
    };
    return (
        <>
            {analyticsEnabled && <Analytics />}
            {showModal && (
                <div className="overlay">
                    <div className={`modal ${isEntering ? 'entering' : ''} ${isExiting ? 'exiting' : ''}`}>
                        <div className="header">
                            <h2>Gestion des cookies</h2>
                            <p>Ce site utilise des cookies pour mesurer son audience via Vercel Analytics. Aucune donnée personnelle n&apos;est collectée à des fins publicitaires.</p>
                        </div>
                        {showContent && (
                            <div className="content">
                                <div className="item">
                                    <div className="top">
                                        <h3>Essentiels</h3>
                                        <div className="switch">
                                            <span className="text">Toujours actifs</span>
                                        </div>
                                    </div>
                                    <p>Nécessaires au fonctionnement du site (préférences, session). Aucune donnée personnelle stockée.</p>
                                </div>
                                <div className="item">
                                    <div className="top">
                                        <h3>Statistiques</h3>
                                        <div className="switch">
                                            <span className="text">{preferences.analytics ? 'Activé' : 'Désactivé'}</span>
                                            <div
                                                className={`toggle ${preferences.analytics ? 'enabled' : ''}`}
                                                onClick={() => setPreferences(prev => ({ ...prev, analytics: !prev.analytics }))}
                                            >
                                                <div className="dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Permettent de mesurer l&apos;audience du site de manière anonyme (Vercel Analytics).</p>
                                </div>
                            </div>
                        )}
                        <div className="actions">
                            {!showContent ? (
                                <>
                                    <button onClick={handleAcceptAll} className="accept">
                                        Accepter tout
                                    </button>
                                    <button onClick={handleAcceptMinimum} className="minimum">
                                        Refuser
                                    </button>
                                    <button onClick={handleManage} className="manage">
                                        Gérer
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleSavePreferences} className="save">
                                    Sauvegarder mes préférences
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
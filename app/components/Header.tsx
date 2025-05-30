"use client";

import { useState } from 'react';
import { FaLinkedin, FaGithub, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { pacifico } from '@/app/fonts';
import './Header.scss';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <header className="header">
            <div className={`logo ${pacifico.className}`}>Jim.</div>
            
            <button className="menuLogo" onClick={() => setIsModalOpen(true)} aria-label="Ouvrir le menu">
                <FaBars />
            </button>

            <div className="content">
                <nav>
                    <a href="#section2">À propos</a>
                    <a href="#section4">Projets</a>
                    <a href="#section6">Contact</a>
                </nav>
                <div className="separator"></div>
                <div className="options">
                    <FaMoon className="icon" />
                </div>
                <div className="separator"></div>
                <div className="links">
                    <a
                        href="https://github.com/Leschaevej"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="icon-link"
                    >
                        <FaGithub className="icon" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jimmy-leschaeve-11728a168"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="icon-link"
                    >
                        <FaLinkedin className="icon" />
                    </a>
                </div>
            </div>

            {isModalOpen && (
                <div className="menuModal" onClick={() => setIsModalOpen(false)}>
                    <div className="mobilContent" onClick={(e) => e.stopPropagation()}>
                        <nav>
                            <a href="#section2" onClick={() => setIsModalOpen(false)}>À propos</a>
                            <a href="#section4" onClick={() => setIsModalOpen(false)}>Projets</a>
                            <a href="#section6" onClick={() => setIsModalOpen(false)}>Contact</a>
                        </nav>
                        <div className="linksOption">
                            <FaMoon className="icon" />
                            <a href="https://github.com/Leschaevej" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="icon" />
                            </a>
                            <a href="https://www.linkedin.com/in/jimmy-leschaeve-11728a168" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="icon" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
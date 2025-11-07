'use client';

import React, { useState } from "react";
import Card from "./components/Card";
import projets from "../app/projects.json";
import Contact from './components/Contact';
import Clock from './components/Clock';
import Meteo from './components/Meteo';
import Contribution from './components/Contribution';
import Technology from './components/Technology';
import GitHub from '../app/assets/github.svg';
import LinkedIn from '../app/assets/linkedin.svg';
import Portfolio from '../app/assets/logo.svg';
import Skybound from '../app/assets/skyboundStudio.svg';
import Cloud1 from '../app/assets/cloud1.svg';
import Cloud2 from '../app/assets/cloud2.svg';
import RocketIcon from '../app/assets/rocket.svg';
import RocketFire from '../app/assets/fire.svg';
import Moon from '../app/assets/moon.svg';

export default function Home() {
    const scrollToSection = (id: string) => {
        if (window.location.hash !== `#${id}`) {
            window.location.hash = `#${id}`;
        }
        const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
    };

    const [aboutTapped, setAboutTapped] = useState(false);
    const [contactTapped, setContactTapped] = useState(false);

    const handleAboutTouchStart = () => {
        setAboutTapped(true);
        setTimeout(() => setAboutTapped(false), 500);
    };

    const handleContactTouchStart = () => {
        setContactTapped(true);
        setTimeout(() => setContactTapped(false), 500);
    };

    const [githubTapped, setGithubTapped] = useState(false);
    const [linkedinTapped, setLinkedinTapped] = useState(false);
    const [portfolioTapped, setPortfolioTapped] = useState(false);
    const [skyboundTapped, setSkyboundTapped] = useState(false);

    const handleGithubTouchStart = () => {
        setGithubTapped(true);
        setTimeout(() => setGithubTapped(false), 500);
    };

    const handleLinkedinTouchStart = () => {
        setLinkedinTapped(true);
        setTimeout(() => setLinkedinTapped(false), 500);
    };

    const handlePortfolioTouchStart = () => {
        setPortfolioTapped(true);
        setTimeout(() => setPortfolioTapped(false), 500);
    };

    const handleSkyboundTouchStart = () => {
        setSkyboundTapped(true);
        setTimeout(() => setSkyboundTapped(false), 500);
    };

    return (
        <main>
            <div id="home" className="section">
                <div className="introduction">
                    <h1>Hello world !<br />Moi c'est <span>Jimmy</span></h1>
                    <p>Développeur Fullstack créatif, je donne vie à des interfaces épurées et des logiciels optimisés.<br/>Mon objectif : l'efficacité au service de l'innovation.</p>
                </div>
                <div className="link">
                    <div className="shortcuts">
                        <button
                            type="button"
                            onClick={() => scrollToSection("project")}
                            className="primary"
                            >
                            <span>Projet</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("about")}
                            onTouchStart={handleAboutTouchStart}
                            className={aboutTapped ? "tapped" : ""}
                            >
                            <span>A Propos</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("contact")}
                            onTouchStart={handleContactTouchStart}
                            className={contactTapped ? "tapped" : ""}
                            >
                            <span>Contact</span>
                        </button>
                    </div>
                    <div className="socials">
                        <a
                            href="https://github.com/Leschaevej?tab=repositories"
                            className={`github ${githubTapped ? "tapped" : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            onTouchStart={handleGithubTouchStart}
                        >
                            <GitHub />
                        </a>
                        <a
                            href="https://linkedin.com/in/jimmy-leschaeve-11728a168/"
                            className={`linkedin ${linkedinTapped ? "tapped" : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            onTouchStart={handleLinkedinTouchStart}
                        >
                            <LinkedIn />
                        </a>
                        <a
                            href="https://jimmyhub.fr"
                            className={`portfolio ${portfolioTapped ? "tapped" : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Portfolio"
                            onTouchStart={handlePortfolioTouchStart}
                        >
                            <Portfolio />
                        </a>
                        <a
                            href="https://skyboundstudio.fr"
                            className={`skybound ${skyboundTapped ? "tapped" : ""}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Skybound Studio"
                            onTouchStart={handleSkyboundTouchStart}
                        >
                            <Skybound />
                        </a>
                    </div>
                </div>
            </div>
            <div id="project" className="section">
                <div className="haloWrapper">
                    <div className="halo"></div>
                </div>
                <h2>Mes projets</h2>
                <div className="cards">
                    {projets.map((projet, index) => (
                        <Card
                        key={index}
                        title={projet.title}
                        imageSrc={projet.imageSrc}
                        modalImageSrc={projet.modalImageSrc}
                        githubLink={projet.githubLink}
                        pdfLink={projet.pdfLink}
                        description={projet.description}
                        />
                    ))}
                </div>
            </div>
            <div id="about" className="section">
                <div className="haloWrapper">
                    <div className="halo"></div>
                </div>
                <h2>À propos</h2>
                <div className="content">
                    <div className="left">
                        <div className="introduction">
                            <p>
                                Loin des sentiers battus.<br/>Mon terrain de jeu, c'est le développement full-stack allié à la créativité du design.<br/>Plus qu'un simple codeur, je suis un véritable passionné de tech qui aime transformer les idées en interfaces élégantes et des systèmes ultra-fluides.<br/>Ma soif d'apprendre ne s'arrête jamais, et c'est elle qui nourrit  mon approche de l'innovation.
                            </p>
                        </div>
                        <div className="link">
                            <div className="shortcuts">
                                <button type="button" onClick={() => window.open("/cv.pdf", "_blank")}><span>Télécharger mon CV</span></button>
                            </div>
                            <div className="socials">
                                <a
                                    href="https://github.com/Leschaevej?tab=repositories"
                                    className={`github ${githubTapped ? "tapped" : ""}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    onTouchStart={handleGithubTouchStart}
                                >
                                    <GitHub />
                                </a>
                                <a
                                    href="https://linkedin.com/in/jimmy-leschaeve-11728a168/"
                                    className={`linkedin ${linkedinTapped ? "tapped" : ""}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    onTouchStart={handleLinkedinTouchStart}
                                >
                                    <LinkedIn />
                                </a>
                                <a
                                    href="https://jimmyleschaeve.fr"
                                    className={`portfolio ${portfolioTapped ? "tapped" : ""}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Portfolio"
                                    onTouchStart={handlePortfolioTouchStart}
                                >
                                    <Portfolio />
                                </a>
                                <a
                                    href="https://skyboundstudio.fr"
                                    className={`skybound ${skyboundTapped ? "tapped" : ""}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Skybound Studio"
                                    onTouchStart={handleSkyboundTouchStart}
                                >
                                    <Skybound />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="gadget">
                            <div className="rocket">
                                <Cloud1 className="cloud cloud1" />
                                <Cloud2 className="cloud cloud2" />
                                <div className="rocketWrapper">
                                    <RocketIcon className="rocketIcon" />
                                    <RocketFire className="rocketFire" />
                                </div>
                                <Moon className="moon" />
                            </div>
                            <div className="meteoClock">
                                <div className="clock">
                                    <Portfolio className="logo"/>
                                    <Clock className="modul" />
                                </div>
                                <div className="meteo">
                                    <Meteo />
                                </div>
                            </div>
                        </div>
                        <div className="contribution">
                            <Contribution />
                        </div>
                    </div>
                </div>
            </div>
            <div id="technology" className="section">
                <Technology />
            </div>
            <div id="contact" className="section">
                <div className="box">
                    <h2>Besoin d'un partenaire pour votre projet web ?</h2>
                    <p className="pub">Explorez l'étendue de nos services et transformez votre vision digitale avec <span>Skybound Studio</span>.</p>
                    <p className="direct">Vous préférez un contact direct ?<br/>Laissez-nous votre e-mail, nous reviendrons vers vous !</p>
                    <Contact />
                </div>
            </div>
        </main>
    );
}
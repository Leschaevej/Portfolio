'use client';

import React from "react";
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
  return (
    <main>
        <div id="home" className="section">
                <h1>Hello world !<br />Moi c'est <span>Jimmy</span></h1>
                <p>Développeur Fullstack créatif, je donne vie à des interfaces épurées et des logiciels optimisés. Mon objectif : l'efficacité au service de l'innovation.</p>
            <div className="shortcuts">
                <button type="button" className="primary" onClick={() => window.location.hash = '#projet'}><span>Projet</span></button>
                <button type="button" onClick={() => window.location.hash = '#aPropos'}><span>A Propos</span></button>
                <button type="button" onClick={() => window.location.hash = '#contact'}><span>Contact</span></button>
            </div>
            <div className="socials">
                <a href="https://github.com/Leschaevej?tab=repositories" className="github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHub />
                </a>
                <a href="https://linkedin.com/in/jimmy-leschaeve-11728a168/" className="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedIn />
                </a>
                <a href="https://jimmyleschaeve.fr" className="portfolio" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                    <Portfolio />
                </a>
                <a href="https://skyboundstudio.fr" className="skybound" target="_blank" rel="noopener noreferrer" aria-label="Skybound Studio">
                    <Skybound />
                </a>
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
                    <p>
                        Loin des sentiers battus.
                    </p>
                    <p>
                        Mon terrain de jeu, c'est le développement full-stack allié à la créativité du design.
                    </p>
                    <p>
                        Plus qu'un simple codeur, je suis un véritable passionné de tech qui aime transformer les idées en interfaces élégantes et des systèmes ultra-fluides.
                    </p>
                    <p>
                        Ma soif d'apprendre ne s'arrête jamais, et c'est elle qui nourrit  mon approche de l'innovation.
                    </p>
                    <div className="shortcuts">
                        <button type="button" onClick={() => window.open("/CV.pdf", "_blank")}><span>Télécharger mon CV</span></button>
                    </div>
                    <div className="socials">
                        <a href="https://github.com/Leschaevej?tab=repositories" className="github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GitHub />
                        </a>
                        <a href="https://linkedin.com/in/jimmy-leschaeve-11728a168/" className="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedIn />
                        </a>
                        <a href="https://jimmyleschaeve.fr" className="portfolio" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                            <Portfolio />
                        </a>
                        <a href="https://skyboundstudio.fr" className="skybound" target="_blank" rel="noopener noreferrer" aria-label="Skybound Studio">
                            <Skybound />
                        </a>
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
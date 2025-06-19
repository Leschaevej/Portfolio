'use client';

import React from "react";
import Card from "./components/Card";
import projets from "../app/projects.json";
import Contact from './components/Contact';
import GitHub from '../app/assets/github.svg';
import LinkedIn from '../app/assets/linkedin.svg';
import Portfolio from '../app/assets/logo.svg';
import Skybound from '../app/assets/skyboundStudio.svg';


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
        <div id="projet" className="section">
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
        <div id="aPropos" className="section">
            <div className="haloWrapper">
                <div className="halo"></div>
            </div>
            <h2>À propos</h2>
        </div>
        <div id="contact" className="section">
            <Contact />
        </div>
    </main>
  );
}
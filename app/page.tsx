'use client';

import React from "react";
import Card from "./components/Card";
import Contact from './components/Contact';
import GitHub from '../app/assets/Github.svg';
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
            <a href="https://github.com/ton-pseudo" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHub />
            </a>
            <a href="https://linkedin.com/in/ton-profil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedIn />
            </a>
            <a href="https://tonportfolio.com" target="_blank" rel="noopener noreferrer" aria-label="Portfolio">
                <Portfolio />
            </a>
            <a href="https://skyboundstudio.com" target="_blank" rel="noopener noreferrer" aria-label="Skybound Studio">
                <Skybound />
            </a>
        </div>
        </div>
        <div id="aPropos" className="section">
            <h2>À propos</h2>
        </div>
        <div id="projet" className="section">
            <h2>Mes projets</h2>
            <div className="cards">
                <Card
                title="Mon Vieux Grimoire"
                imageSrc="/grimoire.png"
                modalImageSrc="/grimoireMore.png"
                githubLink="https://github.com/Leschaevej/Mon-Vieux-Grimoire"
                pdfLink="/grimoireFull.pdf"
                modalContent={
                    <>
                    <h3>Projet React / Node.js / MongoDB</h3>
                    <p>Interface utilisateur claire et API rapide, conçues pour une expérience optimale.</p>
                    <p>Le problème était de sécuriser l’authentification des utilisateurs, la solution a été d’utiliser bcrypt pour hasher les mots de passe et jsonwebtoken pour gérer les connexions.</p>
                    </>
                }
                />
                <Card
                title="Kasa"
                imageSrc="/kasa.png"
                modalImageSrc="/kasaMore.png"
                githubLink="https://github.com/Leschaevej/Kasa"
                pdfLink="/kasaFull.pdf"
                modalContent={
                    <>
                    <h3>Kasa : application de location immobilière</h3>
                    <p>Front dynamique développé avec React et styles modernes en Sass.</p>
                    <p>Le problème était de comprendre comment gérer les routes dynamiques avec React Router, la solution a été de m’appuyer sur la documentation et de faire des tests pour bien structurer mes routes.</p>
                    </>
                }
                />
                <Card
                title="Nina Carducci"
                imageSrc="/carducci.png"
                modalImageSrc="/carducciMore.png"
                githubLink="https://github.com/Leschaevej/Nina-Carducci"
                pdfLink="/carducciFull.pdf"
                modalContent={
                    <>
                    <h3>Nina Carducci : projet web de contenus interactifs</h3>
                    <p>HTML, CSS, JavaScript pour une expérience fluide et immersive.</p>
                    <p>Le problème, était que le site chargeait lentement à cause des images, la solution a été de les compresser, de les passer en format WebP et d’activer le chargement différé.</p>
                    </>
                }
                />
                <Card
                title="Sophie Bluel"
                imageSrc="/bluel.png"
                modalImageSrc="/bluelMore.png"
                githubLink="https://github.com/Leschaevej/Sophie-Bluel"
                pdfLink="/bluelFull.pdf"
                modalContent={
                    <>
                    <h3>Sophie Bluel : application backend axée API et gestion des données</h3>
                    <p>Node.js et JavaScript garantissent robustesse et scalabilité.</p>
                    <p>Le problème, était d’afficher les projets depuis une API, la solution a été d’utiliser fetch() pour récupérer les données et les afficher dynamiquement avec JavaScript.</p>
                    </>
                }
                />
            </div>
        </div>
        <div id="contact" className="section">
            <h2>Contactez-moi</h2>
            <Contact />
        </div>
    </main>
  );
}
'use client';

import React from "react";
import Card from "./components/Card";
import Contact from './components/Contact';
import { FaArrowUp  } from 'react-icons/fa';

export default function Home() {
  return (
    <main>
        <div id="section1" className="section">
            <div className="textBlock">
                <div className="hello">
                    <p>
                        Hello world !<br />
                        Moi c'est Jimmy.
                    </p>
                </div>
                <h1>Web developer</h1>
                <p>Je donne vie à vos idées sur le web.</p>
            </div>
            <div className="buttons">
                <button type="button" onClick={() => window.location.hash = '#section6'}>
                    Contactez-moi
                </button>
                <button type="button" onClick={() => window.open('https://github.com/Leschaevej', '_blank')}>
                    Voir sur GitHub
                </button>
                <button type="button" onClick={() => window.open('/CV.pdf', '_blank')}>
                    Télécharger mon CV
                </button>
            </div>
        </div>
        <div id="section2" className="section">
            <h2>À propos</h2>
            <p>
                Développeur web diplômé de l’école OpenClassrooms
            </p>
            <p>
                Je suis à l’aise dans des environnements qui bougent,<br/>
                où il faut comprendre vite et s’adapter.
            </p>
            <p>
                J’aime apprendre, résoudre des problèmes concrets,<br/>
                et faire avancer les projets avec efficacité.
            </p>
            <p>
                Autonome et rigoureux, je sais prendre des initiatives<br/>
                sans perdre de vue l’objectif commun.
            </p>
            <p>
                J’accorde de l’importance au détail, au travail bien fait,<br/>
                et à une collaboration simple et fluide.
            </p>
            <p>
                <strong>Mon but :</strong> livrer des solutions claires, utiles, et toujours<br/>
                alignées avec les besoins réels.
            </p>
        </div>
        <div id="section3" className="section">
            <h2>J'adore travailler avec ...</h2>
            <div className="skills">
                <div className="skill">
                    <img src={"/react.png"} alt="React.js" />
                    <h3>React.js</h3>
                    <div className="skillDescription">
                        <p>Bonne maitrise de React.js et Next.js pour créer des sites rapides et modernes, en utilisant le rendu côté serveur et la génération statique pour de meilleures performances.</p>
                    </div>
                </div>
                <div className="skill">
                    <img src={"/node.png"} alt="Node.js" />
                    <h3>Node.js</h3>
                    <div className="skillDescription">
                        <p>A laise avec Node.js pour développer des API simples et efficaces, en assurant la connexion entre le front et la base de données.</p>
                    </div>
                </div>
                <div className="skill">
                    <img src={"/sass.png"} alt="Sass" />
                    <h3>Sass</h3>
                    <div className="skillDescription">
                        <p>Utilisation régulière de Sass pour structurer mes styles de manière claire et réutilisable, avec un souci de propreté dans le code CSS.</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="section4" className="section">
            <h2>Mes projets</h2>
            <div className="cards">
                <Card
                title="Mon Vieux Grimoire"
                imageSrc="/grimoire.png"
                modalImageSrc="/grimoireMore.png"
                githubLink="https://github.com/Leschaevej/Mon-Vieux-Grimoire"
                pdfLink="/grimoireFull.pdf"
                logos={["/react.png", "/node.png", "/mongodb.png"]}
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
                logos={["/react.png", "/sass.png"]}
                modalContent={
                    <>
                    <h3>Kasa : application de location immobilière</h3>
                    <p>Front dynamique développé avec React et styles modernes en Sass.</p>
                    <p>Le problème était de comprendre comment gérer les routes dynamiques avec React Router, la solution a été de m’appuyer sur la documentation et de faire des tests pour bien structurer mes routes.</p>
                    </>
                }
                />
            </div>
        </div>
        <div id="section5" className="section">
            <h2>Voila la suite</h2>
            <div className="cards">
                <Card
                title="Nina Carducci"
                imageSrc="/carducci.png"
                modalImageSrc="/carducciMore.png"
                githubLink="https://github.com/Leschaevej/Nina-Carducci"
                pdfLink="/carducciFull.pdf"
                logos={["/html.png", "/css.png", "/javascript.png"]}
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
                logos={["/javascript.png", "/node.png"]}
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
        <div id="section6" className="section">
            <h2>Contactez-moi</h2>
            <Contact />
            <button
                className="top"
                aria-label="Retour en haut de la page"
                onClick={() => {
                    const section = document.getElementById('section1');
                    if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                >
                <FaArrowUp className="icon" />
            </button>
        </div>
    </main>
  );
}
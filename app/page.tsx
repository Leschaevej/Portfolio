'use client';

import { useState, useEffect } from "react";
import './page.scss';
import Carousel from "./components/carousel/Carousel";
import projets from "../app/projects.json";
import Contact from './components/contact/Contact';
import Clock from './components/clock/Clock';
import Meteo from './components/meteo/Meteo';
import Contribution from './components/contribution/Contribution';
import Technology from './components/technology/Technology';
import Social from './components/social/Social';
import Cloud1 from '../app/assets/cloud1.svg';
import Cloud2 from '../app/assets/cloud2.svg';
import RocketIcon from '../app/assets/rocket.svg';
import RocketFire from '../app/assets/fire.svg';
import Moon from '../app/assets/moon.svg';

export default function Home() {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 769);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <main>
            <div id="home" className="section">
                <div className="introduction">
                    <h1>Hello world !<br />Moi c'est <span>Jimmy</span></h1>
                    <p>Développeur Fullstack créatif, je donne vie à des interfaces épurées et des logiciels optimisés.<br/>Mon objectif : l'efficacité au service de l'innovation.</p>
                </div>
                <div className="link">
                    <div className="shortcuts">
                        <a href="#project" className="primary">
                            <span>Projet</span>
                        </a>
                        <a href="#about">
                            <span>A Propos</span>
                        </a>
                        <a href="#contact">
                            <span>Contact</span>
                        </a>
                    </div>
                    <Social />
                </div>
            </div>
            <div id="project" className="section">
                <h2>Mes projets</h2>
                <Carousel projects={projets} />
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
                            <Social />
                        </div>
                    </div>
                    <div className="right">
                        {isDesktop && (
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
                                <Clock />
                                <div className="meteo">
                                    <Meteo />
                                </div>
                            </div>
                        )}
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
                    <h3>Besoin d'un partenaire pour votre projet web ?</h3>
                    <p className="pub">Explorez l'étendue de nos services et transformez votre vision digitale avec <span>Skybound Studio</span>.</p>
                    <p className="direct">Vous préférez un contact direct ?<br/>Laissez-nous votre e-mail, nous reviendrons vers vous !</p>
                    <Contact />
                </div>
            </div>
        </main>
    );
}
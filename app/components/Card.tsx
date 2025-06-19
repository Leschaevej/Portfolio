import React, { useState, useRef } from "react";
import { FaGithub, FaDownload } from "react-icons/fa";
import CardSVG from '../assets/card.svg';
import "./Card.scss";

type CardProps = {
    title: string;
    imageSrc: string;
    modalImageSrc?: string;
    description: string;
    githubLink?: string;
    pdfLink?: string;
};

const Card: React.FC<CardProps> = ({
    title,
    imageSrc,
    modalImageSrc,
    description,
    githubLink,
    pdfLink,
}) => {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`cardContainer ${flipped ? "flipped" : ""}`}
            onClick={() => setFlipped(!flipped)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === "Enter" && setFlipped(!flipped)}
            aria-label={`Afficher détails de ${title}`}
            >
            <div className="card front">
                <CardSVG className="svgBorder" />
                <img src={imageSrc} alt={title} className="cardImage" />
            </div>

            <div className="card back">
                <CardSVG className="svgBorder" />
                <div className="content">
                    <div className="logoWrapper">
                        <img src={modalImageSrc || imageSrc} alt={title} className="logo" />
                    </div>
                    <p>{description}</p>
                    <div className="footer">
                        {githubLink && (
                        <a href={githubLink} target="_blank" rel="noopener noreferrer" aria-label="Voir le code source GitHub">
                            <FaGithub size={24} />
                        </a>
                        )}
                        {pdfLink && (
                        <a href={pdfLink} target="_blank" rel="noopener noreferrer" aria-label="Télécharger PDF">
                            <FaDownload size={24} />
                        </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
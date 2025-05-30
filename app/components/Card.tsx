import React, { useState } from "react"; 
import { FaArrowLeft, FaGithub, FaDownload } from "react-icons/fa";
import "./Card.scss";

type CardProps = {
    title: string;
    imageSrc: string;
    logos?: string[];
    modalContent?: React.ReactNode;
    modalImageSrc?: string;
    githubLink?: string;
    pdfLink?: string;
};

const Card: React.FC<CardProps> = ({
    title,
    imageSrc,
    logos = [],
    modalContent,
    modalImageSrc,
    githubLink,
    pdfLink,
    }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
        <div className="card">
            <div className="logo" onClick={handleOpenModal} style={{ cursor: "pointer" }}>
                <img src={imageSrc} alt={title} />
            </div>
            <div className="languages">
            {logos.map((logo, index) => {
                const fileName = logo.split("/").pop() || "";
                const altText = fileName.split(".")[0].replace(/[-_]/g, " ");
                return <img key={index} src={logo} alt={altText} className="language" />;
            })}
            </div>
        </div>

        {showModal && (
            <div className="overlay" onClick={handleCloseModal}>
                <div className="content" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
                    <div className="backLogo">
                        <button onClick={handleCloseModal} className="back" aria-label="Fermer la modale">
                            <FaArrowLeft />
                        </button>
                        <div className="modalLogo">
                            <img src={imageSrc} alt={title} />
                        </div>
                    </div>
                    {modalImageSrc && (
                        <div className="image">
                            <img src={modalImageSrc} alt={`${title} more`} />
                        </div>
                    )}
                    {modalContent ? (
                        <div className="text">{modalContent}</div>
                        ) : (
                        <p>Aucun détail disponible.</p>
                    )}
                    <div className="languagesLink">
                        {logos.length > 0 && (
                            <div className="langs">
                            <h4>Langages utilisés :</h4>
                            <div className="list">
                                {logos.map((logo, index) => {
                                const fileName = logo.split("/").pop() || "";
                                const altText = fileName.split(".")[0].replace(/[-_]/g, " ");
                                return (
                                    <div key={index} className="item">
                                    <img src={logo} alt={altText} className="lang" />
                                    <span>{altText}</span>
                                    </div>
                                );
                                })}
                            </div>
                            </div>
                        )}
                        <div className="links">
                            {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link"
                                aria-label="Voir le code source sur GitHub"
                            >
                                <FaGithub className="icon" />
                            </a>
                            )}
                            {pdfLink && (
                            <a
                                href={pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pdf-link"
                                aria-label="Télécharger le PDF du projet"
                            >
                                <FaDownload className="icon" />
                            </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default Card;
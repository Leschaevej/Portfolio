import React, { useState } from "react";
import { FaGithub, FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Carousel.scss";

type Project = {
    title: string;
    imageSrc: string;
    description: string;
    longDescription?: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    pdfLink?: string;
};
type CarouselProps = {
    projects: Project[];
};
const Carousel: React.FC<CarouselProps> = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);
    const handlePrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection("right");
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
            setIsAnimating(false);
            setAnimationDirection(null);
        }, 800);
    };
    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection("left");
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
            setIsAnimating(false);
            setAnimationDirection(null);
        }, 800);
    };
    const handleDotClick = (index: number) => {
        if (index === currentIndex || isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection(index > currentIndex ? "left" : "right");
        setTimeout(() => {
            setCurrentIndex(index);
            setIsAnimating(false);
            setAnimationDirection(null);
        }, 800);
    };
    const currentProject = projects[currentIndex];
    const nextIndex = animationDirection === "left"
        ? (currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
        : (currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    const nextProject = isAnimating ? projects[nextIndex] : null;
    const renderProject = (project: Project, index: number, animClass: string, direction?: number) => {
        const style = direction ? { transform: `translateX(${direction * 150}%)`, opacity: 0 } : {};
        return (
            <div key={`project-${index}`} className={`content ${animClass}`} style={style}>
                <div className="image">
                    <img
                        src={project.imageSrc}
                        alt={project.title}
                    />
                </div>
                <div className="info">
                    <div className="header">
                        <h3>{project.title}</h3>
                        <div className="number">
                            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </div>
                    </div>
                    <p className="description">
                        {project.longDescription || project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="techs">
                            {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="links">
                        {project.githubLink && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link"
                                aria-label="Voir le code source"
                            >
                                <FaGithub size={20} />
                                <span>Code source</span>
                            </a>
                        )}
                        {project.liveLink && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link primary"
                                aria-label="Voir le projet en ligne"
                            >
                                <span>Voir le projet</span>
                            </a>
                        )}
                        {project.pdfLink && (
                            <a
                                href={project.pdfLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link"
                                aria-label="Télécharger PDF"
                            >
                                <FaDownload size={18} />
                                <span>Documentation</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="carousel">
            <div className="wrapper">
                {renderProject(
                    currentProject,
                    currentIndex,
                    isAnimating ? "exit" : "",
                    isAnimating ? (animationDirection === "left" ? -1 : 1) : undefined
                )}
                {nextProject && renderProject(
                    nextProject,
                    nextIndex,
                    "enter",
                    animationDirection === "left" ? 1 : -1
                )}
            </div>
            <div className="controls">
                <button
                    className="nav prev"
                    onClick={handlePrevious}
                    aria-label="Projet précédent"
                >
                    <FaChevronLeft />
                </button>
                <div className="dots">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === (isAnimating ? nextIndex : currentIndex) ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Aller au projet ${index + 1}`}
                        />
                    ))}
                </div>
                <button
                    className="nav next"
                    onClick={handleNext}
                    aria-label="Projet suivant"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};
export default Carousel;
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Carousel.scss";

type Project = {
    title: string;
    imageSrc: string;
    description?: string;
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
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const minSwipeDistance = 50;
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
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (isAnimating) return;
        setTouchEnd(e.targetTouches[0].clientX);
        if (touchStart !== null) {
            const diff = touchStart - e.targetTouches[0].clientX;
            setDragOffset(-diff);
        }
    };
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || isAnimating) {
            setDragOffset(0);
            return;
        }
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        setDragOffset(0);
        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setTouchEnd(null);
        setTouchStart(e.clientX);
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || isAnimating) return;
        setTouchEnd(e.clientX);
        if (touchStart !== null) {
            const diff = touchStart - e.clientX;
            setDragOffset(-diff);
        }
    };
    const onMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (!touchStart || !touchEnd || isAnimating) {
            setDragOffset(0);
            return;
        }
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        setDragOffset(0);
        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };
    const onMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setDragOffset(0);
        }
    };
    const currentProject = projects[currentIndex];
    const nextIndex = animationDirection === "left"
        ? (currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
        : (currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    const nextProject = isAnimating ? projects[nextIndex] : null;
    const renderProject = (project: Project, index: number, animClass: string, direction?: number) => {
        const baseTransform = direction ? `translateX(${direction * 150}%)` : '';
        const dragTransform = dragOffset !== 0 && !direction ? `translateX(${dragOffset}px)` : '';
        const transform = dragTransform || baseTransform;
        const opacity = direction ? 0 : (dragOffset !== 0 ? 1 - Math.abs(dragOffset) / 500 : 1);
        const style = {
            transform: transform || undefined,
            opacity,
            transition: dragOffset !== 0 ? 'none' : undefined
        };
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
                        {project.description}
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
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                            aria-label="Voir le projet en ligne"
                        >
                            <span>Voir le projet</span>
                        </a>
                </div>
            </div>
        );
    };
    return (
        <div className="carousel">
            <div
                className="wrapper"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
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
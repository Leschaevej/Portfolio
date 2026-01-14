import React, { useState, useRef, useEffect } from "react";
import "./Technology.scss";
import Frontend from "../../assets/frontend.svg";
import Backend from "../../assets/backend.svg";
import Deployment from "../../assets/deployment.svg";
import Design from "../../assets/design.svg";
import Tools from "../../assets/tools.svg";
import Ai from "../../assets/ai.svg";

type TechId = "Frontend" | "Backend" | "Deployment" | "Design" | "Tools" | "Ai";
const techItems: {
  title: TechId;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  className: string;
}[] = [
  { title: "Frontend", Icon: Frontend, className: "frontend" },
  { title: "Backend", Icon: Backend, className: "backend" },
  { title: "Deployment", Icon: Deployment, className: "deployment" },
  { title: "Design", Icon: Design, className: "design" },
  { title: "Tools", Icon: Tools, className: "tools" },
  { title: "Ai", Icon: Ai, className: "ai" },
];
const techImages: Record<TechId, string[]> = {
    Frontend: [
        "/technology/frontend/javascript.webp",
        "/technology/frontend/typescript.webp",
        "/technology/frontend/tailwind.webp",
        "/technology/frontend/react.webp",
        "/technology/frontend/next.webp",
    ],
    Backend: [
        "/technology/backend/mongodb.webp",
        "/technology/backend/node.webp",
        "/technology/backend/mongoose.webp",
        "/technology/backend/express.webp",
    ],
    Deployment: [
        "/technology/deployment/docker.webp",
        "/technology/deployment/aws.webp",
        "/technology/deployment/vercel.webp",
        "/technology/deployment/cloudinary.webp",
        "/technology/deployment/githubaction.webp",
    ],
    Design: [
        "/technology/design/figma.webp",
        "/technology/design/photoshop.webp",
        "/technology/design/lightroom.webp",
        "/technology/design/canva.webp",
    ],
    Tools: [
        "/technology/tools/git.webp",
        "/technology/tools/github.webp",
        "/technology/tools/postman.webp",
        "/technology/tools/vscode.webp",
    ],
    Ai: [
        "/technology/ai/gemini.webp",
        "/technology/ai/huggingface.webp",
        "/technology/ai/tensorflow.webp",
        "/technology/ai/openai.webp",
    ],
};
export default function Technology() {
    const [selected, setSelected] = useState<TechId | null>(null);
    const [closingId, setClosingId] = useState<TechId | null>(null);
    const [isClosingImages, setIsClosingImages] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const [gridHeight, setGridHeight] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<TechId | null>(null);
    const [unhoveredCard, setUnhoveredCard] = useState<TechId | null>(null);
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
    const gridRef = useRef<HTMLDivElement | null>(null);
    const bottomRow: TechId[] = ["Frontend", "Backend", "Deployment"];
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 1025);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".card") && selected) {
            handleCardClose(selected);
        }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [selected]);
    const getImageListPositionClass = (): string => {
        const id = selected ?? closingId;
        if (!id) return "";
        if (isMobile) {
        return ["Backend", "Design", "Ai"].includes(id) ? "imageLeft" : "imageRight";
        }
        return bottomRow.includes(id) ? "imageBottom" : "imageTop";
    };
    const handleCardClose = (id: TechId) => {
        setClosingId(id);
        setIsClosingImages(true);
        setShowImages(false);
        setGridHeight(null);
        const card = document.querySelector(`.card.active .wrapper svg`) as HTMLElement;
        if (card) {
        card.classList.remove("techIn");
        void card.offsetWidth;
        card.classList.add("techOut");
        }
        const delay = 600 + (techImages[id].length - 1) * 100;
        setTimeout(() => {
        setSelected(null);
        setClosingId(null);
        setIsClosingImages(false);
        }, delay);
    };
    const handleCardClick = (title: TechId) => {
        if (selected === title) {
        handleCardClose(title);
        } else {
        setSelected(title);
        setClosingId(null);
        setIsClosingImages(false);
        setShowImages(false);
        setTimeout(() => {
            if (gridRef.current) {
                const gridRect = gridRef.current.getBoundingClientRect();
                const cards = Array.from(gridRef.current.querySelectorAll('.card'));
                if (isMobile) {
                    const clickedCardIndex = cards.findIndex(c => c.querySelector('h3')?.textContent === title);
                    const clickedCol = clickedCardIndex % 2;
                    const targetCol = clickedCol === 0 ? 1 : 0;
                    const targetCards = cards.filter((_, idx) => idx % 2 === targetCol);
                    if (targetCards.length > 0) {
                        const centerY = gridRect.height / 2;
                        const firstCard = targetCards[0].getBoundingClientRect();
                        const centerX = firstCard.left - gridRect.left + firstCard.width / 2;
                        setImagePosition({
                            top: centerY,
                            left: centerX
                        });
                    }
                } else {
                    const clickedCardIndex = cards.findIndex(c => c.querySelector('h3')?.textContent === title);
                    const clickedRow = Math.floor(clickedCardIndex / 3);
                    const targetRow = clickedRow === 0 ? 1 : 0;
                    const targetCards = cards.filter((_, idx) => {
                        const row = Math.floor(idx / 3);
                        return row === targetRow;
                    });
                    if (targetCards.length > 0) {
                        const firstCard = targetCards[0].getBoundingClientRect();
                        const centerY = firstCard.top - gridRect.top + firstCard.height / 2;
                        const centerX = gridRect.width / 2;
                        setImagePosition({
                            top: centerY,
                            left: centerX
                        });
                    }
                }
            }
        }, 100);
        setTimeout(() => setShowImages(true), 500);
        setTimeout(() => {
            const card = document.querySelector(`.card.active`);
            if (card) {
            card.classList.remove("glowOut");
            card.classList.add("glowIn");
            }
        }, 0);
        if (gridRef.current) {
            setGridHeight(gridRef.current.scrollHeight);
        }
        }
    };
    const currentId = selected ?? closingId;
    const currentImageList = currentId ? techImages[currentId] : [];
    return (
        <div
        className="grid"
        ref={gridRef}
        style={gridHeight ? { minHeight: gridHeight } : undefined}
        >
        {techItems.map(({ title, Icon, className }) => {
            const isSelected = selected === title;
            const isClosing = closingId === title;
            const isOther = selected !== null && selected !== title && !isClosing;
            const isHovered = hoveredCard === title;
            const isUnhovered = unhoveredCard === title;
            return (
            <div
                key={title}
                className={`card
                ${isOther ? "fadeOut" : "fadeIn"}
                ${(isSelected || isClosing) ? "active" : ""}
                ${isSelected ? "glowIn" : ""}
                ${isClosing ? "glowOut isClosing" : ""}
                ${selected === title ? "pulse" : ""}
                ${isHovered ? "boxShadowIn" : ""}
                ${isUnhovered ? "boxShadowOut" : ""}
                `}
                onClick={() => handleCardClick(title)}
                onMouseEnter={() => {
                setHoveredCard(title);
                setUnhoveredCard(null);
                }}
                onMouseLeave={() => {
                setHoveredCard(null);
                setUnhoveredCard(title);
                setTimeout(() => setUnhoveredCard(null), 500);
                }}
            >
                <h3>{title}</h3>
                <div className="wrapper">
                <Icon
                    className={`${className} ${
                    isSelected ? "techIn" : isClosing ? "techOut" : ""
                    }`}
                />
                </div>
            </div>
            );
        })}
        {(showImages || isClosingImages) && currentId && (
            <div
            className={`image-list ${getImageListPositionClass()} ${
                isClosingImages ? "closing" : ""
            }`}
            style={{
                top: `${imagePosition.top}px`,
                left: `${imagePosition.left}px`,
                transform: 'translate(-50%, -50%)'
            }}
            >
            {currentImageList.map((src, i) => (
                <img
                key={i}
                src={src}
                alt={`${currentId} logo ${i}`}
                style={{ "--i": i } as React.CSSProperties}
                />
            ))}
            </div>
        )}
        </div>
    );
}
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import "./Technology.scss";
import Frontend from "@/app/assets/frontend.svg";
import Backend from "@/app/assets/backend.svg";
import Deployment from "@/app/assets/deployment.svg";
import Design from "@/app/assets/design.svg";
import Tools from "@/app/assets/tools.svg";
import Ai from "@/app/assets/ai.svg";
import { BREAKPOINTS, ANIMATION } from "@/app/constants";

type TechId = "Frontend" | "Backend" | "Deployment" | "Design" | "Tools" | "Ai";
const TECH_ITEMS: { title: TechId; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { title: "Frontend", Icon: Frontend },
    { title: "Backend", Icon: Backend },
    { title: "Deployment", Icon: Deployment },
    { title: "Design", Icon: Design },
    { title: "Tools", Icon: Tools },
    { title: "Ai", Icon: Ai },
];
const TECH_IMAGES: Record<TechId, string[]> = {
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
const BOTTOM_ROW: TechId[] = ["Frontend", "Backend", "Deployment"];
export default function Technology() {
    const [selected, setSelected] = useState<TechId | null>(null);
    const [closingId, setClosingId] = useState<TechId | null>(null);
    const [isClosingImages, setIsClosingImages] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const [gridHeight, setGridHeight] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });
    const gridRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < BREAKPOINTS.DESKTOP);
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
        return BOTTOM_ROW.includes(id) ? "imageBottom" : "imageTop";
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
        const delay = 600 + (TECH_IMAGES[id].length - 1) * 100;
        setTimeout(() => {
            setSelected(null);
            setClosingId(null);
            setIsClosingImages(false);
        }, delay);
    };
    const calculateImagePosition = (title: TechId) => {
        if (!gridRef.current) return;
        const gridRect = gridRef.current.getBoundingClientRect();
        const cards = Array.from(gridRef.current.querySelectorAll('.card'));
        const clickedCardIndex = cards.findIndex(c => c.querySelector('h3')?.textContent === title);

        if (isMobile) {
            const clickedCol = clickedCardIndex % 2;
            const targetCol = clickedCol === 0 ? 1 : 0;
            const targetCards = cards.filter((_, idx) => idx % 2 === targetCol);
            if (targetCards.length > 0) {
                const firstCard = targetCards[0].getBoundingClientRect();
                setImagePosition({
                    top: gridRect.height / 2,
                    left: firstCard.left - gridRect.left + firstCard.width / 2
                });
            }
        } else {
            const clickedRow = Math.floor(clickedCardIndex / 3);
            const targetRow = clickedRow === 0 ? 1 : 0;
            const targetCards = cards.filter((_, idx) => Math.floor(idx / 3) === targetRow);
            if (targetCards.length > 0) {
                const firstCard = targetCards[0].getBoundingClientRect();
                setImagePosition({
                    top: firstCard.top - gridRect.top + firstCard.height / 2,
                    left: gridRect.width / 2
                });
            }
        }
    };
    const handleCardClick = (title: TechId) => {
        if (selected === title) {
            handleCardClose(title);
            return;
        }
        setSelected(title);
        setClosingId(null);
        setIsClosingImages(false);
        setShowImages(false);
        setTimeout(() => calculateImagePosition(title), 100);
        setTimeout(() => setShowImages(true), ANIMATION.DURATION);
        if (gridRef.current) {
            setGridHeight(gridRef.current.scrollHeight);
        }
    };
    const currentId = selected ?? closingId;
    const currentImageList = currentId ? TECH_IMAGES[currentId] : [];
    return (
        <div className="grid" ref={gridRef} style={gridHeight ? { minHeight: gridHeight } : undefined}>
            {TECH_ITEMS.map(({ title, Icon }) => {
                const isSelected = selected === title;
                const isClosing = closingId === title;
                const isOther = selected !== null && selected !== title && !isClosing;
                return (
                    <div
                        key={title}
                        className={`card ${isOther ? "fadeOut" : "fadeIn"} ${(isSelected || isClosing) ? "active" : ""} ${isSelected ? "glowIn pulse" : ""} ${isClosing ? "glowOut isClosing" : ""}`}
                        onClick={() => handleCardClick(title)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardClick(title); } }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                    >
                        <h3>{title}</h3>
                        <div className="wrapper">
                            <Icon className={`${title.toLowerCase()} ${isSelected ? "techIn" : isClosing ? "techOut" : ""}`} />
                        </div>
                    </div>
                );
            })}
            {(showImages || isClosingImages) && currentId && (
                <div
                    className={`image-list ${getImageListPositionClass()} ${isClosingImages ? "closing" : ""}`}
                    style={{ top: imagePosition.top, left: imagePosition.left, transform: 'translate(-50%, -50%)' }}
                >
                    {currentImageList.map((src, i) => {
                        const techName = src.split('/').pop()?.replace('.webp', '') ?? '';
                        return (
                            <Image
                                key={src}
                                src={src}
                                alt={`Logo ${techName}`}
                                width={100}
                                height={100}
                                loading="lazy"
                                style={{ "--i": i } as React.CSSProperties}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
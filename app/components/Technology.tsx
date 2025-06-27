import React, { useState, useRef, useEffect } from "react";
import "./Technology.scss";
import Frontend from "../assets/frontend.svg";
import Backend from "../assets/backend.svg";
import Deployment from "../assets/deployment.svg";
import Design from "../assets/design.svg";
import Tools from "../assets/tools.svg";
import Ai from "../assets/ai.svg";

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
const pngLists: Record<TechId, string[]> = {
    Frontend: [
        "/technology/frontend/javascript.png",
        "/technology/frontend/typescript.png",
        "/technology/frontend/tailwind.png",
        "/technology/frontend/react.png",
        "/technology/frontend/next.png",
    ],
    Backend: [
        "/technology/backend/mongodb.png",
        "/technology/backend/node.png",
        "/technology/backend/mongoose.png",
        "/technology/backend/express.png",
    ],
    Deployment: [
        "/technology/deployment/docker.png",
        "/technology/deployment/aws.png",
        "/technology/deployment/vercel.png",
        "/technology/deployment/cloudinary.png",
        "/technology/deployment/githubaction.png",
        "/technology/deployment/netifly.png",
    ],
    Design: [
        "/technology/design/figma.png",
        "/technology/design/photoshop.png",
        "/technology/design/lightroom.png",
        "/technology/design/canva.png",
    ],
    Tools: [
        "/technology/tools/git.png",
        "/technology/tools/github.png",
        "/technology/tools/postman.png",
        "/technology/tools/vscode.png",
    ],
    Ai: [
        "/technology/ai/gemini.png",
        "/technology/ai/huggingface.png",
        "/technology/ai/tensorflow.png",
        "/technology/ai/openai.png",
    ],
};
export default function Technology() {
    const [selected, setSelected] = useState<TechId | null>(null);
    const [closingId, setClosingId] = useState<TechId | null>(null);
    const [isClosingPng, setIsClosingPng] = useState(false);
    const [showPngs, setShowPngs] = useState(false);
    const [gridHeight, setGridHeight] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
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
    const getPngListPositionClass = (): string => {
        const id = selected ?? closingId;
        if (!id) return "";
        if (isMobile) {
        return ["Backend", "Design", "Ai"].includes(id) ? "pngLeft" : "pngRight";
        }
        return bottomRow.includes(id) ? "pngBottom" : "pngTop";
    };
    const handleCardClose = (id: TechId) => {
    setClosingId(id);
    setIsClosingPng(true);
    setShowPngs(false);
    setGridHeight(null);
    const card = document.querySelector(`.card.active .wrapper svg`) as HTMLElement;
    if (card) {
        card.classList.remove("techOut");
        void card.offsetWidth;
        card.classList.add("techOut");
    }
    const delay = 600 + (pngLists[id].length - 1) * 100;
    setTimeout(() => {
        setSelected(null);
        setClosingId(null);
        setIsClosingPng(false);
    }, delay);
    };
    const handleCardClick = (title: TechId) => {
        if (selected === title) {
        handleCardClose(title);
        } else {
        setSelected(title);
        setClosingId(null);
        setIsClosingPng(false);
        setShowPngs(false);
        setTimeout(() => setShowPngs(true), 500);
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
    const currentPngList = currentId ? pngLists[currentId] : [];
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
            return (
                <div
                    key={title}
                    className={`card
                        ${isOther ? "fadeOut" : "fadeIn"}
                        ${(isSelected || isClosing) ? "active" : ""}
                        ${isSelected ? "glowIn" : ""}
                        ${isClosing ? "glowOut" : ""}
                        ${selected === title ? "pulse" : ""}
                    `}
                    onClick={() => handleCardClick(title)}
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
        {(showPngs || isClosingPng) && currentId && (
            <div
            className={`png ${getPngListPositionClass()} ${
                isClosingPng ? "falling" : ""
            }`}
            >
            {currentPngList.map((src, i) => (
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
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./Technology.scss";
import Frontend from "@/app/assets/frontend.svg";
import Backend from "@/app/assets/backend.svg";
import Deployment from "@/app/assets/deployment.svg";
import Design from "@/app/assets/design.svg";
import Tools from "@/app/assets/tools.svg";
import Ai from "@/app/assets/ai.svg";

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
export default function Technology() {
    const [selected, setSelected] = useState<TechId | null>(null);
    const [imagesVisible, setImagesVisible] = useState(false);
    useEffect(() => {
        if (!selected) return;
        const timer = setTimeout(() => setImagesVisible(true), 50);
        return () => clearTimeout(timer);
    }, [selected]);
    useEffect(() => {
        if (!selected) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (!(e.target as HTMLElement).closest(".card")) {
                setImagesVisible(false);
                setTimeout(() => setSelected(null), 300);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [selected]);
    const handleCardClick = (title: TechId) => {
        if (selected === title) {
            setImagesVisible(false);
            setTimeout(() => setSelected(null), 300);
        } else {
            setSelected(title);
        }
    };
    const currentIndex = selected ? TECH_ITEMS.findIndex(t => t.title === selected) : -1;
    return (
        <div className="grid">
            {TECH_ITEMS.map(({ title, Icon }) => (
                <div
                    key={title}
                    className={`card ${selected && selected !== title ? "hidden" : ""}`}
                    onClick={() => handleCardClick(title)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleCardClick(title); } }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={selected === title}
                >
                    <h3>{title}</h3>
                    <div className="wrapper">
                        <Icon className={title.toLowerCase()} />
                    </div>
                </div>
            ))}
            {selected && (
                <div className={`image-list ${imagesVisible ? "visible" : ""}`} data-index={currentIndex}>
                    {TECH_IMAGES[selected].map((src, i) => (
                        <Image
                            key={src}
                            src={src}
                            alt={src.split('/').pop()?.replace('.webp', '') ?? ''}
                            width={100}
                            height={100}
                            loading="lazy"
                            unoptimized
                            style={{ "--i": i } as React.CSSProperties}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
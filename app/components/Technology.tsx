import React, { useState, useRef } from "react";
import "./Technology.scss";
import Frontend from "../assets/frontend.svg";
import Backend from "../assets/backend.svg";
import Deployment from "../assets/deployment.svg";
import Design from "../assets/design.svg";
import Tools from "../assets/tools.svg";
import Ai from "../assets/ai.svg";

const techItems = [
  { title: "Frontend", Icon: Frontend },
  { title: "Backend", Icon: Backend },
  { title: "Deployment", Icon: Deployment },
  { title: "Design", Icon: Design },
  { title: "Tools", Icon: Tools },
  { title: "Ai", Icon: Ai },
];

type TechId = 'Frontend' | 'Backend' | 'Deployment' | 'Design' | 'Tools' | 'Ai';

const pngLists: Record<TechId, string[]> = {
  Frontend: [
    '/technology/frontend/html.png',
    '/technology/frontend/css.png',
    '/technology/frontend/javascript.png',
    '/technology/frontend/typescript.png',
    '/technology/frontend/tailwind.png',
    '/technology/frontend/sass.png',
    '/technology/frontend/reactrouter.png',
    '/technology/frontend/react.png',
    '/technology/frontend/next.png',
  ],
  Backend: [
    '/technology/backend/mongoose.png',
    '/technology/backend/mongodb.png',
    '/technology/backend/node.png',
    '/technology/backend/express.png',
  ],
  Deployment: [
    '/technology/deployment/docker.png',
    '/technology/deployment/aws.png',
    '/technology/deployment/vercel.png',
    '/technology/deployment/cloudinary.png',
    '/technology/deployment/githubaction.png',
    '/technology/deployment/netifly.png',
  ],
  Design: [
    '/technology/design/figma.png',
    '/technology/design/photoshop.png',
    '/technology/design/lightroom.png',
    '/technology/design/canva.png',
  ],
  Tools: [
    '/technology/tools/git.png',
    '/technology/tools/github.png',
    '/technology/tools/postman.png',
    '/technology/tools/vscode.png',
  ],
  Ai: [
    '/technology/ai/gemini.png',
    '/technology/ai/huggingface.png',
    '/technology/ai/tensorflow.png',
    '/technology/ai/openai.png',
  ],
};

export default function Technology() {
  const [hovered, setHovered] = useState<TechId | null>(null);
  const [gridHeight, setGridHeight] = useState<number | null>(null);

  const cardRefs = useRef<Record<TechId, HTMLDivElement | null>>({} as Record<TechId, HTMLDivElement | null>);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const bottomRow: TechId[] = ['Frontend', 'Backend', 'Deployment'];

  function handleMouseEnter(title: TechId) {
    if (gridRef.current) {
      setGridHeight(gridRef.current.getBoundingClientRect().height);
    }
    setHovered(title);
  }

  function handleMouseLeave() {
    setHovered(null);
    setGridHeight(null);
  }

  function handleCardMouseLeave(e: React.MouseEvent<HTMLDivElement>, title: TechId) {
    const toElement = e.relatedTarget as HTMLElement | null;

    if (toElement && typeof toElement.classList !== 'undefined' && toElement.classList.contains('card')) {
        return;
    }
    setHovered(null);
    setGridHeight(null);
  }

  function setRef(title: TechId) {
    return (el: HTMLDivElement | null) => {
      cardRefs.current[title] = el;
    };
  }

  function getPngListPositionClass(): string {
    if (!hovered) return '';
    return bottomRow.includes(hovered) ? 'pngBottom' : 'pngTop';
  }

  return (
    <div
      className="grid"
      ref={gridRef}
      onMouseLeave={handleMouseLeave}
      style={gridHeight ? { minHeight: gridHeight } : undefined}
    >
      {techItems.map(({ title, Icon }) => (
        <div
          key={title}
          className={`card ${hovered && hovered !== title ? "hidden" : ""} ${hovered === title ? "active" : ""}`}
          onMouseEnter={() => handleMouseEnter(title as TechId)}
          onMouseLeave={(e) => handleCardMouseLeave(e, title as TechId)}
          ref={setRef(title as TechId)}
        >
          <h3>{title}</h3>
          <div className="wrapper">
            <Icon />
          </div>
        </div>
      ))}

      {hovered && (
        <div className={`png ${getPngListPositionClass()}`}>
          {pngLists[hovered].map((src, i) => (
            <img src={src} alt="" key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import "./Header.scss";

export default function Header() {
  const [menuState, setMenuState] = useState<
    "visible" | "pushingUp" | "hidden" | "pushingInFromTop"
  >("visible");
  const [closeState, setCloseState] = useState<
    "hidden" | "pushingDown" | "visible" | "pushingInFromBottom"
  >("hidden");

  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMenuLeaving, setIsMenuLeaving] = useState(false);

  const [isCloseHovered, setIsCloseHovered] = useState(false);
  const [isCloseLeaving, setIsCloseLeaving] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const minSize = { width: 150, height: 50 };
  const maxSize = { width: 600, height: 500 };
  const minPos = { top: 50, right: 50 };
  const maxPos = { top: 40, right: 40 };

  const [modalSize, setModalSize] = useState(minSize);
  const [modalPos, setModalPos] = useState(minPos);

  function animateModal(
    opening: boolean,
    duration = 500,
    callback?: () => void
  ) {
    setIsAnimating(true);
    const startTime = performance.now();

    function step(time: number) {
      const elapsed = time - startTime;
      let progress = Math.min(elapsed / duration, 1);

      // easing easeInOutQuad
      progress =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      if (!opening) progress = 1 - progress;

      const width = minSize.width + (maxSize.width - minSize.width) * progress;
      const height =
        minSize.height + (maxSize.height - minSize.height) * progress;

      const top = minPos.top + (maxPos.top - minPos.top) * progress;
      const right = minPos.right + (maxPos.right - minPos.right) * progress;

      setModalSize({ width, height });
      setModalPos({ top, right });

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
        if (!opening) {
          setIsModalOpen(false);
          setModalSize(minSize);
          setModalPos(minPos);
        }
        if (callback) callback();
      }
    }

    requestAnimationFrame(step);
  }

  const toggleModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      setMenuState("pushingUp");
      setCloseState("pushingInFromBottom");
      setShowLinks(false);

      animateModal(true, 500, () => {
        setMenuState("hidden");
        setCloseState("visible");
        setShowLinks(true);
      });
    } else {
      setShowLinks(false);

      setTimeout(() => {
        setCloseState("pushingDown");
        setMenuState("pushingInFromTop");

        animateModal(false, 500, () => {
          setCloseState("hidden");
          setMenuState("visible");
        });
      }, 400);
    }
  };

  const handleMenuMouseEnter = () => {
    setIsMenuLeaving(false);
    setIsMenuHovered(true);
  };
  const handleMenuMouseLeave = () => {
    setIsMenuHovered(false);
    setIsMenuLeaving(true);
    setTimeout(() => setIsMenuLeaving(false), 700);
  };

  const handleCloseMouseEnter = () => {
    setIsCloseLeaving(false);
    setIsCloseHovered(true);
  };
  const handleCloseMouseLeave = () => {
    setIsCloseHovered(false);
    setIsCloseLeaving(true);
    setTimeout(() => setIsCloseLeaving(false), 700);
  };

  return (
    <header className="header">
      <Logo className="logo" />
      <div className="button-container">
        {menuState !== "hidden" && (
          <button
            className={`
              menu
              ${menuState === "pushingUp" ? "pushing-up" : ""}
              ${menuState === "pushingInFromTop" ? "push-in-from-top" : ""}
              ${isMenuHovered ? "hovered" : ""}
              ${isMenuLeaving ? "leaving" : ""}
            `}
            onClick={toggleModal}
            onMouseEnter={handleMenuMouseEnter}
            onMouseLeave={handleMenuMouseLeave}
            type="button"
          >
            <span>MENU</span>
          </button>
        )}
        {closeState !== "hidden" && (
          <button
            className={`
              close
              ${closeState === "pushingDown" ? "pushing-down" : ""}
              ${closeState === "pushingInFromBottom" ? "push-in-from-bottom" : ""}
              ${isCloseHovered ? "hovered" : ""}
              ${isCloseLeaving ? "leaving" : ""}
            `}
            onClick={toggleModal}
            onMouseEnter={handleCloseMouseEnter}
            onMouseLeave={handleCloseMouseLeave}
            type="button"
          >
            <span>CLOSE</span>
          </button>
        )}
      </div>

      {(isModalOpen || isAnimating) && (
        <div className="overlay" onClick={toggleModal}>
          <div
            className="modal"
            style={{
              width: modalSize.width + "px",
              height: modalSize.height + "px",
              top: modalPos.top + "px",
              right: modalPos.right + "px",
              position: "absolute",
              borderRadius: "30px",
              transformOrigin: "top right",
              overflow: "hidden",
              transition: isAnimating ? "none" : "all 0.3s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
                <nav className={showLinks ? "show-links" : "hide-links"}>
                    <div className="link-wrapper">
                        <a href="#projet" onClick={toggleModal}>Projets</a>
                    </div>
                    <div className="link-wrapper">
                        <a href="#aPropos" onClick={toggleModal}>À propos</a>
                    </div>
                    <div className="link-wrapper">
                        <a href="#contact" onClick={toggleModal}>Contact</a>
                    </div>
                </nav>
            </div>
        </div>
      )}
    </header>
  );
}
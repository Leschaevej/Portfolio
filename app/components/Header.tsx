"use client";
import React, { useState, useEffect } from "react";
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
  const [minSize, setMinSize] = useState({ width: 150, height: 50 });
  const [maxSize, setMaxSize] = useState({ width: 600, height: 500 });
  const [minPos, setMinPos] = useState({ top: 50, right: 50 });
  const [maxPos, setMaxPos] = useState({ top: 40, right: 40 });
  const [logoTapped, setLogoTapped] = useState(false);

  useEffect(() => {
    function updateSizes() {
      const width = window.innerWidth;
      if (width < 480) {
        setMinSize({ width: 150, height: 50 });
        setMaxSize({ width: 280, height: 300 });
        setMinPos({ top: 30, right: 30 });
        setMaxPos({ top: 20, right: 20 });
      } else if (width < 1025) {
        setMinSize({ width: 150, height: 50 });
        setMaxSize({ width: 400, height: 300 });
        setMinPos({ top: 50, right: 50 });
        setMaxPos({ top: 40, right: 40 });
      } else {
        setMinSize({ width: 150, height: 50 });
        setMaxSize({ width: 600, height: 500 });
        setMinPos({ top: 50, right: 50 });
        setMaxPos({ top: 40, right: 40 });
      }
    }
    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const [modalSize, setModalSize] = useState(minSize);
  const [modalPos, setModalPos] = useState(minPos);

  function animateModal(opening: boolean, duration = 500, callback?: () => void) {
    setIsAnimating(true);
    const startTime = performance.now();

    function step(time: number) {
      const elapsed = time - startTime;
      let progress = Math.min(elapsed / duration, 1);
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

  const handleLogoTouchStart = () => {
    setLogoTapped(true);
    setTimeout(() => {
      setLogoTapped(false);
    }, 500);
  };

  return (
    <header className="header">
      <a href="#home">
        <Logo
          className={`logo ${logoTapped ? "tapped" : ""}`}
          onTouchStart={handleLogoTouchStart}
          role="img"
          aria-label="Logo"
          tabIndex={0}
        />
      </a>

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
            className={`modal ${isModalOpen ? "modal-open" : ""}`}
            style={{
              width: modalSize.width,
              height: modalSize.height,
              top: modalPos.top,
              right: modalPos.right,
              zIndex: 5,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className={showLinks ? "show-links" : "hide-links"}>
              <div className="link-wrapper">
                <a href="#project" onClick={toggleModal}>
                  Projets
                </a>
              </div>
              <div className="link-wrapper">
                <a href="#about" onClick={toggleModal}>
                  À propos
                </a>
              </div>
              <div className="link-wrapper">
                <a href="#contact" onClick={toggleModal}>
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

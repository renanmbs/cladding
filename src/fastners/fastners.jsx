import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./fastners.css";
import { fastenerData } from "./fastners_choices";

// --- Utility to structure a single description string (Updated for brevity/fixed height) ---
const structureDescription = (description) => {
  if (!description) return { main: "", features: "" }; // Removed 'detail'

  // Split description by sentences/phrases
  // eslint-disable-next-line no-useless-escape
  const sentences = description.split(/(\. *|; *)/g).filter(s => s.trim().length > 0 && !s.match(/[\.;]/));

  // 1. Main Description: Summarize aggressively for fixed height
  let main = sentences.slice(0, 1).join(". ") + (sentences.length > 0 ? "." : "");
  if (main.length > 200) {
      main = main.substring(0, 200).trim() + "...";
  }

  // 2. Features/Details: Summarize second part
  const detailSentences = sentences.slice(1);
  let features = detailSentences.slice(0, 2).join(". ") + (detailSentences.length > 1 ? "." : "");
  if (features.length > 200) {
      features = features.substring(0, 200).trim() + "...";
  }

  return {
    main: main || "No main description available.",
    features: features || "Key features not specified."
  };
};

export default function Fasteners() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const nextSlide = useCallback(
    () => setCurrent((prev) => (prev + 1) % fastenerData.length),
    []
  );

  const prevSlide = useCallback(
    () => setCurrent((prev) => (prev - 1 + fastenerData.length) % fastenerData.length),
    []
  );

  // --- Preload next 2 images for smoother transitions ---
  useEffect(() => {
    if (!fastenerData.length) return;
    [1, 2].forEach((offset) => {
      const nextIndex = (current + offset) % fastenerData.length;
      const img = new Image();
      img.src = fastenerData[nextIndex]?.image || "";
    });
  }, [current]);

  // eslint-disable-next-line
  const { title, description, image, link } = fastenerData[current];
  const structuredInfo = useMemo(() => structureDescription(description), [description]);

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKey = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  return (
    <div className="section2 panels-section">
      <div className="divider-container">
        <div className="line"></div>
        <div className="text">
          <h3>TYPES OF FASTENERS</h3>
        </div>
        <div className="line"></div>
      </div>

      <div className="panel-card-wrapper">
        <button
          className="nav-arrow left"
          onClick={prevSlide}
          aria-label="Previous Fastener"
        >
          ◀
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="panel-card cards2"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="panel-info">
              <h3>{title}</h3>

              <p className="main-description">{structuredInfo.main}</p>

              {structuredInfo.features && (
                <p className="key-features-paragraph">{structuredInfo.features}</p>
              )}

              <a href={link}>SEE PRODUCTS FOR THIS ANCHOR →</a>
            </div>

            <div className="panel-image">
              <motion.div
                className="image-wrapper"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hovered ? "hover" : "main"}
                    src={
                      hovered && fastenerData[current].hoverImage
                        ? fastenerData[current].hoverImage
                        : fastenerData[current].image
                    }
                    className="fastener-image"
                    alt={title}
                    draggable="false"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => (e.currentTarget.src = "/fallback.png")}
                  />
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="nav-arrow right"
          onClick={nextSlide}
          aria-label="Next Fastener"
        >
          ▶
        </button>
      </div>

      <div className="carousel-dots">
        {fastenerData.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
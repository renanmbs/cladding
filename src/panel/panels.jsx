// Panels.js (Revised)

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./panels.css";
import { panelData } from "./panels_choices";

// --- Utility Function to Structure the Description (Revised for brevity) ---
const structureDescription = (description) => {
  if (!description) return { main: "", features: "" };

  // Split description by sentences/phrases
  // eslint-disable-next-line no-useless-escape
  const sentences = description.split(/(\. *|; *)/g).filter(s => s.trim().length > 0 && !s.match(/[\.;]/));

  // 1. Main Description: Use the first sentence or up to the first 40 words.
  let main = sentences.slice(0, 1).join(". ") + (sentences.length > 0 ? "." : "");

  // 2. Features/Details (The rest of the text, summarized)
  const detailSentences = sentences.slice(1);
  let features = detailSentences.slice(0, 2).join(". ") + (detailSentences.length > 1 ? "." : "");

  return {
    main: main || "No main description available.",
    features: features || "Key features not specified."
  };
};

export default function Panels() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % panelData.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + panelData.length) % panelData.length);

  useEffect(() => {
    // eslint-disable-next-line
    const preloadNext = [1, 2].map(offset => {
      const nextIndex = (current + offset) % panelData.length;
      const img = new Image();
      img.src = panelData[nextIndex].image;
      return img;
    });
  }, [current]);

  const { title, description, image, link } = panelData[current];

  // --- New: Use the utility function to split the single description string ---
  const structuredInfo = useMemo(() => structureDescription(description), [description]);

  return (
    <div className="section2 panels-section">
      <div className="divider-container">
        <div className="line"></div>
        <div className="text">
          <h3>WHAT PANELS ARE YOU USING?</h3>
        </div>
        <div className="line"></div>
      </div>

      <div className="panel-card-wrapper">
        <button
          className="nav-arrow left"
          onClick={prevSlide}
          aria-label="Previous Panel"
        >
          ◀
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="panel-card"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="panel-info">
              <h3>{title}</h3>

              {/* Display the dynamically extracted main description */}
              <p className="main-description">
                {structuredInfo.main}
              </p>

              {/* Display the key features paragraph */}
              {structuredInfo.features && (
                <p className="key-features-paragraph">
                  {structuredInfo.features}
                </p>
              )}

              <a href={link}>SEE PRODUCTS FOR THIS PANEL →</a>
            </div>
            <div className="panel-image">
              <img
                src={image}
                alt={title}
                draggable="false"
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="nav-arrow right"
          onClick={nextSlide}
          aria-label="Next Panel"
        >
          ▶
        </button>
      </div>

      <div className="carousel-dots">
        {panelData.map((_, i) => (
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
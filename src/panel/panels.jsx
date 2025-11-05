// Panels.js (Revised)

import React, { useState, useEffect, useMemo } from "react"; // Added useMemo
import { motion, AnimatePresence } from "framer-motion";
import "./panels.css";
import { panelData } from "./panels_choices";

// --- Utility Function to Structure the Description ---
const structureDescription = (description) => {
  if (!description) return { main: "", features: [], detail: "" };

  const sentences = description.split(/\. *|; */g).filter(s => s.trim().length > 0);

  // 1. Main Description: Use the first one or two sentences.
  const main = sentences.slice(0, 2).join(". ") + (sentences.length > 0 ? "." : "");

  // 2. Features/Details (The rest of the text)
  const detailSentences = sentences.slice(2);

  // This logic is a placeholder. For truly good UX, you should update panelData
  // to have a dedicated 'features' array. For now, we'll keep the full
  // text to split visually.

  // Split the remaining text into three sections for visual flow:
  // For simplicity, we'll split the remaining text into 3 parts.
  const featureCandidate = detailSentences.slice(0, 3).join(". ") + (detailSentences.length > 0 ? "." : "");
  const detailCandidate = detailSentences.slice(3).join(". ") + (detailSentences.length > 3 ? "." : "");


  // *** IMPORTANT: The best UI/UX fix is to update your panelData to this structure:
  // {
  //   title: "GFRC & Fiber Cement/Concrete ",
  //   shortDescription: "Glass fiber reinforced concrete (GFRC) panels are mainly used in exterior building façades and as architectural precast concrete.",
  //   keyFeatures: [
  //     "Material Composite: Portland cement, fine aggregate, water, acrylic copolymer, and alkali-resistant glass fiber.",
  //     "Core Material: Fiber cement is reinforced with cellulose fibers.",
  //     "Primary Use: Exterior building façades and architectural precast concrete."
  //   ],
  //   detailDescription: "It is a composite of materials such as Portland cement, fine aggregate, water...",
  //   image: "/Panel/GFRC.png",
  //   link: ""
  // }
  // Since you haven't, we will dynamically split the single string:

  return {
    main: main,
    features: featureCandidate,
    detail: detailCandidate
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

              {/* Display a dynamic bulleted list (using the middle part of the split) */}
              {/* NOTE: If the middle part is just text, it's better to show it as a paragraph too */}
              {structuredInfo.features && (
                <p className="key-features-paragraph">
                  {structuredInfo.features}
                </p>
              )}

              {/* The longer, detailed composition info */}
              <p className="composition-detail">
                {structuredInfo.detail}
              </p>

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
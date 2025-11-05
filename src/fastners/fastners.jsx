import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./fastners.css";
import { fastenerData } from "./fastners_choices";

// --- Utility to structure a single description string ---
const structureDescription = (description) => {
  if (!description) return { main: "", features: "", detail: "" };

  const sentences = description.split(/\. *|; */g).filter((s) => s.trim().length > 0);
  const main = sentences.slice(0, 2).join(". ") + (sentences.length > 0 ? "." : "");
  const features = sentences.slice(2, 5).join(". ") + (sentences.length > 2 ? "." : "");
  const detail = sentences.slice(5).join(". ") + (sentences.length > 5 ? "." : "");

  return { main, features, detail };
};

export default function Fasteners() {
  const [current, setCurrent] = useState(0);

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
    [1, 2].forEach((offset) => {
      const nextIndex = (current + offset) % fastenerData.length;
      const img = new Image();
      img.src = fastenerData[nextIndex].image;
    });
  }, [current]);

  const { title, description, image, link } = fastenerData[current];
  const structuredInfo = useMemo(() => structureDescription(description), [description]);

  // --- Keyboard navigation ---
  useEffect(() => {
    const handleKey = (e) => {
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
            className="panel-card"
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

              {structuredInfo.detail && (
                <p className="composition-detail">{structuredInfo.detail}</p>
              )}

              <a href={link}>SEE PRODUCTS FOR THIS ANCHOR →</a>
            </div>

            <div className="panel-image">
              <motion.img
                src={image}
                alt={title}
                draggable="false"
                loading="lazy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                onError={(e) => (e.currentTarget.src = "/fallback.png")}
              />
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

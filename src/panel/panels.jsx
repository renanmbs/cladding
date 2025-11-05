import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./panels.css";
import { panelData } from "./panels_choices";
// Import the Magnifier component
import Magnifier from "../magnifier/magnifier"; // Adjust path if necessary

export default function Panels() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % panelData.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + panelData.length) % panelData.length);

  // Preloading image for next slide
  useEffect(() => {
    const nextIndex = (current + 1) % panelData.length;
    const preload = new Image();
    preload.src = panelData[nextIndex].image;
  }, [current]);

  const { title, description, image, link } = panelData[current];

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
              <p>{description}</p>
              <a href={link}>SEE PRODUCTS FOR THIS PANEL →</a>
            </div>
            {/* 💡 Replaced <img> with Magnifier component */}
            <div className="panel-image">
              <Magnifier 
                src={image} 
                alt={title} 
                zoom={2} 
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
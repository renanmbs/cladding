import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./fastners.css";
import { fastenerData } from "./fastners_choices";

export default function Panels() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % fastenerData.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + fastenerData.length) % fastenerData.length);

  // Auto-slide (optional)
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 60000);
    return () => clearInterval(timer);
  }, []);

  const { title, description, image, link } = fastenerData[current];

  return (
    <div className="section panels-section">
      <div className="divider-container">
        <div className="line"></div>
        <div className="text">
          <h3>Types of fasteners</h3>
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
              <a href={link}>SEE PRODUCTS FOR THIS ANCHOR →</a>
            </div>
            <div className="panel-image">
              <img src={image} alt={title} draggable="false" />
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

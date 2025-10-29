import React from 'react';
import '../fastners/fastners.css'; // Optional CSS module for styling

export default function Fasteners() {
  return (
    <div className="section fasteners-section">
      <h2>Types of Fasteners</h2>
      <div className="fastener-card">
        <div className="fastener-info">
          <h3>KEIL ANCHORS</h3>
          <p>
            The Keil Anchor is a high-quality concealed undercut anchor designed for panels without adhesives. Whether your panel is made from porcelain, stone, fiber cement, or other materials, the Keil Anchors are one of few concealed undercut anchors that dock.
          </p>
          {/* <a href="#">See Products for This Anchor</a> */}
        </div>
      </div>
      <div className="carousel-dots">● ○ ○</div>
    </div>
  );
}

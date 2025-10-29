import React from 'react';
import "../panel/panels.css"; // Optional CSS module for styling

export default function Panels() {
  return (
    <div className="section panels-section">
      <h2>What Panels Are You Using?</h2>
      <div className="panel-card">
        <div className="panel-info">
          <h3>HPL / PHENOLIC</h3>
          <p>
            Panels consisting of a core made with resin and high-density thermosetting cellulose fibers. 
            Over this compact core, different materials of various finishes are used.
          </p>
          {/* <a href="#">See Products for This Panel</a> */}
        </div>
      </div>
      {/* Optionally add a carousel/slider dots */}
      <div className="carousel-dots">● ○ ○</div>
    </div>
  );
}

import React, { useRef, useEffect, useState, useCallback } from 'react';
import logo from './image/Monarch Metal White Transparent.png';
import logo2 from "./image/Monarch Metal White Transparent.png";
import './App.css';
// import Lenis from '@studio-freight/lenis'; // REMOVED LENIS
import { motion } from 'framer-motion';
import Panels from './panel/panels.jsx';
import Cladding from './cladding/cladding.jsx';
import Fasteners from './fastners/fastners.jsx';

function App() {
  const [sectionsRendered, setSectionsRendered] = useState(false);
  const [lastClickedSection, setLastClickedSection] = useState(null);

  const panelsRef = useRef(null);
  const claddingRef = useRef(null);
  const fastenersRef = useRef(null);
  const menuRef = useRef(null);
  // const lenisRef = useRef(null); // REMOVED LENIS REF

  // REMOVED LENIS SETUP useEffect (Lines 35-50 in your original code)

  // Scroll effect after a section is chosen
  useEffect(() => {
    // Moved sectionRefs inside the effect to fix the exhaustive-deps warning
    const sectionRefs = {
      panels: panelsRef,
      cladding: claddingRef,
      fasteners: fastenersRef,
    };

    if (!lastClickedSection) return;
    const targetRef = sectionRefs[lastClickedSection];
    if (!targetRef.current) return;

    // USE NATIVE SCROLL: This is more reliable than custom scroll libraries 
    // immediately after an element is mounted to the DOM.
    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start' // Ensure it aligns to the top of the viewport
    });

  }, [lastClickedSection, sectionsRendered]); // Simplified dependency array (Refs are stable)

  // Start button handler
  const handleStart = useCallback((sectionKey) => {
    setSectionsRendered(true);
    setLastClickedSection(sectionKey);
  }, []);

  // Scroll-to-top handler
const handleBackToMenu = useCallback(() => {
  if (menuRef.current) {
    menuRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // Delay the reset to let scroll finish smoothly
  setTimeout(() => {
    setSectionsRendered(false);
    setLastClickedSection(null);
  }, 600); // 0.6s matches the scroll animation speed
}, []);

  return (
    <div className="App">
      {/* Banner */}
      <div className='banner' aria-label="Main Navigation">
        {/* Added onClick for the logo */}
        <div
          onClick={handleBackToMenu}
          style={{ cursor: 'pointer' }}
          role="button"
          aria-label="Back to top menu"
        >
          <img src={logo} className="App-logo" alt="Monarch Metal Logo" />
        </div>
        <nav>
          <ul>
            <li>Products</li>
            <li>Applications</li>
            <li>Fasteners</li>
            <li>Resources</li>
          </ul>
        </nav>
      </div>

      {/* Spacer + Start Buttons */}
      <div className='spacer' ref={menuRef}>
        <img src={logo2} className="logo2" alt="Monarch Cladding Systems" />
        <p>Cladding and Rainscreen Systems</p>

        <motion.div
          className="start-buttons"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
          role="group"
          aria-label="Choose a product category"
        >
          <h2>Choose your starting point:</h2>
          <div className="choices">
            <button onClick={() => handleStart('panels')}>Panels</button>
            <button onClick={() => handleStart('cladding')}>Cladding</button>
            <button onClick={() => handleStart('fasteners')}>Fasteners</button>
          </div>
        </motion.div>
      </div>

      {/* Section Content */}
      {sectionsRendered && (
        <div className="scroll-container">
          <motion.section
            className={`screen panels-screen ${lastClickedSection === 'panels' ? 'active-section' : ''}`}
            ref={panelsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Panels />
          </motion.section>

          <motion.section
            className={`screen cladding-screen ${lastClickedSection === 'cladding' ? 'active-section' : ''}`}
            ref={claddingRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Cladding />
          </motion.section>

          <motion.section
            className={`screen fasteners-screen ${lastClickedSection === 'fasteners' ? 'active-section' : ''}`}
            ref={fastenersRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Fasteners />

            <div className="back-button-wrapper">
              <button
                onClick={handleBackToMenu}
                className='back-button'
                aria-label="Back to main product selection"
              >
                ↑ Back to Menu
              </button>
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useRef, useEffect, useState, useCallback } from 'react';
import logo from './image/Monarch Metal White Transparent.png';
import logo2 from "./image/Monarch Metal White Transparent.png";
import './App.css';
import { motion } from 'framer-motion';
import Panels from './panel/panels.jsx';
import Cladding from './cladding/cladding.jsx';
import Fasteners from './fastners/fastners.jsx';

function App() {
  const [sectionsRendered, setSectionsRendered] = useState(false);
  const [lastClickedSection, setLastClickedSection] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // NEW STATE for Burger Menu
  const appRef = useRef(null);

  const panelsRef = useRef(null);
  const claddingRef = useRef(null);
  const fastenersRef = useRef(null);
  const menuRef = useRef(null);

  // Function to toggle the menu state
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => {
      // 🚀 CHANGE: Block/Unblock body scrolling for professional mobile UX
      document.body.style.overflow = prev ? 'auto' : 'hidden'; 
      return !prev;
    });
  }, []);

  // Effect to close menu when a section is clicked (optional but good UX)
  useEffect(() => {
    if (lastClickedSection) {
      // 🚀 CHANGE: Ensure body scrolling is restored when a section is navigated to
      document.body.style.overflow = 'auto'; 
      setIsMenuOpen(false); // Close menu after an action
    }
  }, [lastClickedSection]);


  // Scroll effect after a section is chosen
  useEffect(() => {
    const sectionRefs = {
      panels: panelsRef,
      cladding: claddingRef,
      fasteners: fastenersRef,
    };

    if (!lastClickedSection) return;
    const targetRef = sectionRefs[lastClickedSection];
    if (!targetRef.current) return;

    targetRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }, [lastClickedSection, sectionsRendered]);

  // Start button handler
  const handleStart = useCallback((sectionKey) => {
    setSectionsRendered(true);
    setLastClickedSection(sectionKey);
  }, []);

  // Scroll-to-top handler
const handleBackToMenu = useCallback(() => {
  if (menuRef.current && appRef.current) {
    // 1. ADD class to prevent background twitching
    // appRef.current.classList.add('no-fixed-background');

    menuRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  // 3. Delay the state reset and class removal (Match the scroll/transition time, e.g., 600ms)
  setTimeout(() => {
    setSectionsRendered(false);
    setLastClickedSection(null);
    setIsMenuOpen(false); 
    // 🚀 CHANGE: Ensure body scrolling is restored
    document.body.style.overflow = 'auto'; 
    
    // 4. REMOVE class to restore fixed background
    if (appRef.current) {
        // appRef.current.classList.remove('no-fixed-background');
    }
  }, 600);
}, []);

  return (
    <div className="App" ref={appRef}>
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
        
        {/* STANDARD DESKTOP NAV */}
        <nav className='desktop-nav'>
          <ul>
            <li>Products</li>
            <li>Applications</li>
            <li>Fasteners</li>
            <li>Resources</li>
          </ul>
        </nav>
        
        {/* BURGER/X BUTTON (Displays as X when menu is open) */}
        <button
          className={`burger-menu-button ${isMenuOpen ? 'open' : ''}`}
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="burger-icon-line"></div>
          <div className="burger-icon-line"></div>
          <div className="burger-icon-line"></div>
        </button>
      </div>

      {/* 🚀 MAJOR CHANGE: MOBILE MENU OVERLAY 
          - Always rendered in the DOM for smooth CSS transitions (open and close).
          - Class name now controls the CSS-based slide/fade transition.
          - Replaced framer-motion with simple class-based rendering.
      */}
      <nav 
        className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}
        // Clicking the overlay background closes it
        onClick={handleMenuToggle} 
      >
        {/* Prevent clicks on the list itself from bubbling up and closing the menu */}
        <ul onClick={(e) => e.stopPropagation()}> 
          {/* Menu items close the menu and optionally perform an action */}
          <li onClick={handleMenuToggle}>Products</li>
          <li onClick={handleMenuToggle}>Applications</li>
          <li onClick={handleMenuToggle}>Fasteners</li>
          <li onClick={handleMenuToggle}>Resources</li>
          <li onClick={handleBackToMenu}>Main Menu</li>
        </ul>
      </nav>
        
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
          <h2>Choose your starting point</h2>
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
                ↑
              </button>
            </div>
          </motion.section>
        </div>
      )}
    </div>
  );
}

export default App;
import React, { useRef, useState } from "react";
import "./magnifier.css"; // Ensure this CSS file exists and is linked

export default function Magnifier({ src, alt, zoom = 2, imgWidth = "30rem", imgHeight = "30rem" }) {
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const lens = lensRef.current;
    const container = containerRef.current;

    if (!img || !lens || !container || !imageLoaded) return;

    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Mouse position relative to the image container
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Ensure mouse is within the bounds of the image itself for lens calculation
    const imgX = e.clientX - imgRect.left;
    const imgY = e.clientY - imgRect.top;

    const clampedImgX = Math.max(0, Math.min(imgX, imgRect.width));
    const clampedImgY = Math.max(0, Math.min(imgY, imgRect.height));
    
    // Position the lens relative to the main container
    lens.style.left = `${x - lens.offsetWidth / 2}px`;
    lens.style.top = `${y - lens.offsetHeight / 2}px`;

    // Calculate background position for the zoomed image within the lens
    // This needs to be relative to the *scaled* image.
    const bgX = (clampedImgX / imgRect.width) * 100;
    const bgY = (clampedImgY / imgRect.height) * 100;

    lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
    lens.style.backgroundSize = `${imgRect.width * zoom}px ${imgRect.height * zoom}px`;
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      ref={containerRef}
      className="magnifier-container"
      style={{
        position: "relative",
        // 💡 Use the props for width and height
        width: imgWidth,
        height: imgHeight,
        
        // Applying border and background from your original styles
        // Note: You might want to remove the border/background here if the 
        // fastener card's CSS is handling it for the overall card appearance.
        border: "solid #c31d2a", // You might want to remove this for fasteners
        borderRadius: "1rem", 
        background: 'linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.05))',
        
        overflow: "hidden",
      }}
      onMouseEnter={() => {
        setIsHoveringContainer(true);
        if (imageLoaded) setIsActive(true);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHoveringContainer(false);
        setIsActive(false);
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        //   borderRadius: "1rem",
          userSelect: "none",
          pointerEvents: "none", // Image itself shouldn't capture pointer events
          opacity: imageLoaded ? 1 : 0,
          transition: "opacity 0.35s ease-in-out, transform 0.3s ease-out", // Add transform transition
          transform: isHoveringContainer ? "scale(1.1)" : "scale(1)", // Scale on hover
          transformOrigin: "center center", // Scale from center
        }}
        onLoad={handleImageLoad}
        draggable="false"
      />

      {/* Magnifier lens, only visible when active and image is loaded */}
      {isActive && imageLoaded && (
        <div
          ref={lensRef}
          className="magnifier-lens"
          style={{
            position: "absolute",
            pointerEvents: "none", // Lens itself should not interfere with mouse events
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "2px solid #c31d2a",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}
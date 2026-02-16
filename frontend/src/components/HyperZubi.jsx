import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const MinimalZubi = ({ 
  talking = false, 
  thinking = false, 
  size = 180 // Changed default size to 180 so it fits nicely as a widget
}) => {
  const containerRef = useRef(null);

  // --- Smooth Pupil Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 30 });
  
  const pupilX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const pupilY = useTransform(smoothY, [-1, 1], [-5, 5]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      style={{ 
        position: 'fixed',   // Pins him to the screen
        bottom: '221px',      // 20px breathing room from the bottom
        right: '145px',       // 20px breathing room from the right edge
        zIndex: 9999,        // Ensures he floats on top of all other website elements
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'visible',
        cursor: 'pointer'    // Adds a nice pointer cursor when hovering over him
      }}
    >
      <motion.svg 
        viewBox="0 0 400 400" 
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        // Optional drop shadow so he pops off your website background
        className="drop-shadow-xl" 
      >
        {/* Breathing Animation Wrapper */}
        <motion.g 
          animate={{ y: [0, -6, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          
          {/* EARS - Clean Rounded Shapes */}
          <motion.path
            d="M 120 180 C 40 100, -20 220, 60 280 C 90 300, 110 260, 130 220 Z"
            fill="#7dd3fc"
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ originX: "130px", originY: "220px" }}
          />
          <motion.path
            d="M 280 180 C 360 100, 420 220, 340 280 C 310 300, 290 260, 270 220 Z"
            fill="#7dd3fc"
            animate={{ rotate: [1, -1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ originX: "270px", originY: "220px" }}
          />

          {/* HEAD - Simple Circle */}
          <circle cx="200" cy="200" r="100" fill="#bae6fd" />

          {/* FACE FEATURES GROUP */}
          <g transform="translate(0, 10)">
            
            {/* Blushing Cheeks (Minimalist Fade) */}
            <circle cx="150" cy="225" r="10" fill="#f472b6" opacity="0.3" />
            <circle cx="250" cy="225" r="10" fill="#f472b6" opacity="0.3" />

            {/* EYEBROWS (Gives Expression) */}
            <motion.path 
              d="M 155 160 Q 165 152 175 160" 
              fill="none" stroke="#0369a1" strokeWidth="3" strokeLinecap="round"
              animate={{ y: talking ? -2 : 0 }}
            />
            <motion.path 
              d="M 225 160 Q 235 152 245 160" 
              fill="none" stroke="#0369a1" strokeWidth="3" strokeLinecap="round"
              animate={{ y: talking ? -2 : 0 }}
            />

            {/* EYES - High Contrast Pupil Tracking */}
            <g>
              <circle cx="165" cy="185" r="14" fill="white" />
              <circle cx="235" cy="185" r="14" fill="white" />
              
              <motion.g style={{ x: pupilX, y: pupilY }}>
                <circle cx="165" cy="185" r="10" fill="#0f172a" />
                <circle cx="162" cy="181" r="3" fill="white" /> {/* Catchlight */}
                
                <circle cx="235" cy="185" r="10" fill="#0f172a" />
                <circle cx="232" cy="181" r="3" fill="white" />
              </motion.g>

              {/* Minimal Blink */}
              <motion.rect 
                x="145" y="165" width="110" height="30" fill="#bae6fd"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: [0, 0, 1, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 0.98, 1] }}
                style={{ originY: "top" }}
              />
            </g>

            {/* TRUNK - Clean Single Curve */}
            <motion.path
              d="M 190 200 Q 220 200 220 240 Q 220 270 200 270 Q 185 270 185 255"
              fill="none"
              stroke="#0369a1"
              strokeWidth="12"
              strokeLinecap="round"
              animate={{ 
                d: talking 
                ? "M 190 200 Q 225 200 225 235 Q 225 260 205 260 Q 195 260 195 250" 
                : "M 190 200 Q 220 200 220 240 Q 220 270 200 270 Q 185 270 185 255"
              }}
            />
          </g>

          {/* Thinking "Idea" Dot (Minimalist) */}
          {thinking && (
            <motion.circle 
              cx="310" cy="120" r="12" fill="#fbbf24"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            />
          )}

        </motion.g>
      </motion.svg>
    </div>
  );
};

export default MinimalZubi;
import React from 'react';
import { motion } from 'framer-motion';

const TechBadge = ({ name, iconUrl, children }) => {
  return (
    <motion.div
      // Badge Container Hover Effect
      whileHover={{ 
        y: -2,
        backgroundColor: "rgba(28,28,28,0.9)",
        borderColor: "rgba(255,255,255,0.18)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.55rem',
        padding: '0.5rem 0.85rem',
        background: 'rgba(10, 10, 10, 0.6)',
        border: '1px solid rgba(50,50,50,0.9)',
        borderRadius: '0.65rem',
        cursor: 'default',
        whiteSpace: 'nowrap'
      }}
      className="group"
    >
      {/* Icon Wrapper for Child SVG or Image */}
      <motion.div
        variants={{
          hover: { scale: 1.2, rotate: 4, filter: 'grayscale(0%) brightness(1)' }
        }}
        whileHover="hover"
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        style={{
          width: '22px',
          height: '22px',
          display: 'block',
          flexShrink: 0,
          filter: 'grayscale(20%) brightness(0.9)'
        }}
      >
        {iconUrl ? <img src={iconUrl} alt={name} style={{ width: '100%', height: '100%' }} /> : children}
      </motion.div>

      <span style={{ fontSize: '0.85rem', color: '#c4c4c8', fontWeight: 500, letterSpacing: '0.01em' }}>
        {name}
      </span>
    </motion.div>
  );
};

export default TechBadge;
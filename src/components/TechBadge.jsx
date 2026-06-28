import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const TechBadge = ({ name, iconUrl, children }) => {
  const { theme } = useTheme();
  let finalIconUrl = iconUrl;


  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`tech-badge ${''}`}
    >
      <div className="badge-icon-wrapper">
        {finalIconUrl
          ? <img src={finalIconUrl} alt={name} style={{ width: '22px', height: '22px', display: 'block' }} />
          : children
        }
      </div>
      <span>{name}</span>
    </motion.div>
  );
};

export default TechBadge;

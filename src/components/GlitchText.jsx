import './GlitchText.css';

const GlitchText = ({ children, speed = 1, enableShadows = true, enableOnHover = true, className = '' }) => {
  const inlineStyles = {};
  const hoverClass = enableOnHover ? 'enable-on-hover' : '';

  return (
    <span className={`glitch ${hoverClass} ${className}`} style={inlineStyles}>
      {children}
    </span>
  );
};

export default GlitchText;
import React from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

export default function FlowingMenu({ items = [], speed = 15, textColor = '#fff', bgColor = '#120F17', marqueeBgColor = '#fff', marqueeTextColor = '#120F17', borderColor = '#fff' }) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} speed={speed} textColor={textColor} marqueeBgColor={marqueeBgColor} marqueeTextColor={marqueeTextColor} borderColor={borderColor} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  
  const [repetitions, setRepetitions] = React.useState(4);
  
  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const top = dist(mouseX, mouseY, width / 2, 0);
    const bottom = dist(mouseX, mouseY, width / 2, height);
    return top < bottom ? 'top' : 'bottom';
  };
  
  const dist = (x, y, x2, y2) => (x - x2) ** 2 + (y - y2) ** 2;

  React.useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!part) return;
      const w = part.offsetWidth;
      if (w === 0) { setRepetitions(4); return; }
      const needed = Math.ceil(window.innerWidth / w) + 2;
      setRepetitions(Math.max(4, Math.floor(needed)));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [text, image]);

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - r.left, y = ev.clientY - r.top;
    const edge = findClosestEdge(x, y, r.width, r.height);

    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);

    const part = marqueeInnerRef.current.querySelector('.marquee__part');
    if (part) {
      if (animationRef.current) animationRef.current.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, { x: -part.offsetWidth, duration: speed, ease: 'none', repeat: -1 });
    }
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const r = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - r.left, y = ev.clientY - r.top;
    const edge = findClosestEdge(x, y, r.width, r.height);

    if (animationRef.current) { animationRef.current.kill(); animationRef.current = null; }

    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a className="menu__item-link" href={link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ color: textColor }}>{text}</a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
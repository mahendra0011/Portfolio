<<<<<<< HEAD
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
=======
import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import './FlowingMenu.css';

function FlowingMenu({ items = [], speed = 15, textColor = '#fff', bgColor = '#120F17', marqueeBgColor = '#fff', marqueeTextColor = '#120F17', borderColor = '#fff' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [marqueeTargetIndex, setMarqueeTargetIndex] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
  const handleTouchMove = useCallback((e) => { touchEndX.current = e.touches[0].clientX; }, []);
  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < items.length - 1) {
        const n = activeIndex + 1; setActiveIndex(n); setMarqueeTargetIndex(n);
      } else if (diff < 0 && activeIndex > 0) {
        const n = activeIndex - 1; setActiveIndex(n); setMarqueeTargetIndex(n);
      }
    }
  }, [activeIndex, items.length]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaX || e.deltaY;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && activeIndex < items.length - 1) {
        const n = activeIndex + 1; setActiveIndex(n); setMarqueeTargetIndex(n);
      } else if (delta < 0 && activeIndex > 0) {
        const n = activeIndex - 1; setActiveIndex(n); setMarqueeTargetIndex(n);
      }
    }
  }, [activeIndex, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor, position: 'relative', height: '100%' }}>
      <nav className="menu" ref={containerRef}>
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} index={idx} activeIndex={activeIndex} isMarqueeActive={marqueeTargetIndex === idx} speed={speed} textColor={textColor} marqueeBgColor={marqueeBgColor} marqueeTextColor={marqueeTextColor} borderColor={borderColor} />
        ))}
      </nav>
      <div className="nav-dots">
        {items.map((_, idx) => (
          <button key={idx} className={`nav-dot ${idx === activeIndex ? 'active' : ''}`} onClick={() => { setActiveIndex(idx); setMarqueeTargetIndex(idx); }} aria-label={`Go to item ${idx + 1}`} />
        ))}
      </div>
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
    </div>
  );
}

<<<<<<< HEAD
function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);
  const animationRef = React.useRef(null);
  
  const [repetitions, setRepetitions] = React.useState(4);
=======
function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, index, activeIndex, isMarqueeActive }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const isHoveredRef = useRef(false);
  const [repetitions, setRepetitions] = useState(4);
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const top = dist(mouseX, mouseY, width / 2, 0);
    const bottom = dist(mouseX, mouseY, width / 2, height);
    return top < bottom ? 'top' : 'bottom';
  };
<<<<<<< HEAD
  
  const dist = (x, y, x2, y2) => (x - x2) ** 2 + (y - y2) ** 2;

  React.useEffect(() => {
=======
  const dist = (x, y, x2, y2) => (x - x2) ** 2 + (y - y2) ** 2;

  useEffect(() => {
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
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

<<<<<<< HEAD
  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
=======
  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector('.marquee__part');
    if (!part) return;
    const w = part.offsetWidth;
    if (w === 0) return;

    if (animationRef.current) animationRef.current.kill();

    if (!isMarqueeActive || !isHoveredRef.current) {
      gsap.set([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
      return;
    }

    animationRef.current = gsap.to(marqueeInnerRef.current, { x: -w, duration: speed, ease: 'none', repeat: -1 });
    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(marqueeRef.current, { y: '0%' }, 0)
      .set(marqueeInnerRef.current, { y: '0%' }, 0)
      .fromTo([marqueeRef.current, marqueeInnerRef.current], { y: '-101%' }, { y: '0%', duration: 0.6, ease: 'expo.out' });

    return () => { if (animationRef.current) animationRef.current.kill(); };
  }, [isMarqueeActive, speed, text, image, repetitions]);

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    isHoveredRef.current = true;
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
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
<<<<<<< HEAD
=======
    isHoveredRef.current = false;
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
    const r = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - r.left, y = ev.clientY - r.top;
    const edge = findClosestEdge(x, y, r.width, r.height);

    if (animationRef.current) { animationRef.current.kill(); animationRef.current = null; }

    gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

<<<<<<< HEAD
  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
=======
  const isActive = index === activeIndex;

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor, display: isActive ? 'flex' : 'none', position: isActive ? 'relative' : 'absolute' }}>
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
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
<<<<<<< HEAD
}
=======
}

export default FlowingMenu;
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83

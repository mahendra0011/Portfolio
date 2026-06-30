<<<<<<< HEAD
import React from 'react';
import FlowingMenu from '../FlowingMenu';
import SectionHeading from './SectionHeading';
import '../TechStack.css';

const Focus = () => {
  const menuItems = [
    { link: '#', text: 'Affordability', image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80' },
    { link: '#', text: 'Quality', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&q=80' },
    { link: '#', text: 'Security', image: 'https://images.unsplash.com/photo-1614064641936-3b9e8e8f1471?w=600&q=80' },
    { link: '#', text: 'Performance', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80' },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div className="tech-stack-wrapper" id="focus">
      <div className="glow-1"></div>
      <div className="glow-2"></div>
      <section className="container relative z-10 py-20 px-4">
        <SectionHeading
          eyebrow="Focus On"
          title="I focus on"
          description="I focus on results that matter, turning ideas into experiences - building fast, secure, and high-quality products and work that clients keep coming back for"
        />
        <div className="max-w-6xl mx-auto mt-8">
          <div className="card w-full" style={{ height: '500px', padding: 0 }} onMouseMove={handleMouseMove}>
            <div className="w-full h-full relative rounded-2xl overflow-hidden">
              <FlowingMenu items={menuItems} bgColor="transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
=======
import FlowingMenu from "@/components/FlowingMenu";

const focusItems = [
  {
    link: "#",
    text: "Frontend",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "Backend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=150&fit=crop"
  },
  {
    link: "#",
    text: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=300&h=150&fit=crop"
  }
];

const Focus = () => {
  return (
    <section id="focus" className="relative w-full h-screen">
      <FlowingMenu
        items={focusItems}
        speed={12}
        textColor="#fff"
        bgColor="#120F17"
        marqueeBgColor="#fff"
        marqueeTextColor="#120F17"
        borderColor="rgba(255,255,255,0.15)"
      />
    </section>
>>>>>>> 315384edde54a07fec28dcb09853bf6924a44f83
  );
};

export default Focus;
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
          title="I Focus on"
          description="I Focus on results that matter, turning ideas into experiences - building fast, secure, and high-quality products and work that clients keep coming back for"
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
  );
};

export default Focus;
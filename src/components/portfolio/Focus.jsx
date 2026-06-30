import React from 'react';
import FlowingMenu from '../FlowingMenu';
import SectionHeading from './SectionHeading';
import '../TechStack.css';

const Focus = () => {
  const menuItems = [
    { link: '#', text: 'Affordability', image: 'https://earnup.com/wp-content/uploads/2024/02/Navigating-the-Housing-Affordability-Challenge-in-the-US.png' },
    { link: '#', text: 'Quality', image: 'https://www.shutterstock.com/image-vector/quality-control-survey-business-products-260nw-275279660.jpg' },
    { link: '#', text: 'Security', image: 'https://plus.unsplash.com/premium_photo-1674506653774-6f51d6ebe799?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2Vic2l0ZSUyMHNlY3VyaXR5fGVufDB8fDB8fHww' },
    { link: '#', text: 'Performance', image: 'https://img.magnific.com/free-vector/digital-credit-score-scale-gauge-finance-report_1017-53369.jpg?semt=ais_hybrid&w=740&q=80' },
  ];

  return (
    <div className="tech-stack-wrapper" id="focus" style={{ backgroundImage: 'none', backgroundColor: 'transparent' }}>
      <section className="container relative z-10 py-20 px-4">
        <SectionHeading
          eyebrow="Focus On"
          title="I Focus on"
          description="I Focus on results that matter, turning ideas into experiences - building fast, secure, and high-quality products and work that clients keep coming back for"
        />
        <div className="max-w-6xl mx-auto mt-8">
          <div className="card w-full" style={{ height: '500px', padding: 0 }}>
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
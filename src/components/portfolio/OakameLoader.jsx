import React, { useState, useEffect } from 'react';
// Import your CSS file here if it's external, e.g., import './Loader.css';

const OakameLoader = ({ onFinish }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let currentCount = 0;
    let timeoutId;

    const updateLoader = () => {
      // Counter speed (3 to 8 step skip for fast counting)
      let step = Math.floor(Math.random() * 6) + 3;
      currentCount += step;

      if (currentCount > 100) {
        currentCount = 100;
      }

      setCount(currentCount);

      if (currentCount === 100) {
        // 100% touch hone ke 400ms baad animation exit hogi
        setTimeout(() => {
          document.body.classList.add("loaded");
          document.body.style.overflow = "auto";
          if (onFinish) onFinish();
        }, 400);
      } else {
        // Loading speed loop (15ms - 40ms) - VERY FAST
        timeoutId = setTimeout(updateLoader, Math.floor(Math.random() * 25) + 15);
      }
    };

    // 1 second (1000ms) rukega taaki naam poora gracefully slide-in ho jaye
    const initialTimeout = setTimeout(updateLoader, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [onFinish]);

  const displayCount = count < 10 ? `0${count}` : count;

  return (
    <div className="loader-wrapper">
      <div className="loader-panel panel-left"></div>
      <div className="loader-panel panel-right"></div>

      <div className="loader-ui">
        
        {/* FIRST NAME GROUP */}
        <div className="name-wrapper first-wrapper">
          <span className="sub-text top-left">welcome to</span>
          <div className="text-mask">
            <h1 className="name first">Mahendra</h1>
          </div>
        </div>

        {/* LAST NAME GROUP */}
        <div className="name-wrapper last-wrapper">
          <div className="text-mask">
            <h1 className="name last">Prajapati</h1>
          </div>
          <span className="sub-text bottom-right">portfolio</span>
        </div>

        {/* PROGRESS BAR */}
        <div className="progress-container">
          <div className="progress-line-bg">
            <div
              className="progress-line-fill"
              style={{ width: `${count}%` }}
            ></div>
          </div>
          <div className="counter">{displayCount}</div>
        </div>

      </div>
    </div>
  );
};

export default OakameLoader;
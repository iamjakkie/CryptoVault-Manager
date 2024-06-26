import React, { useState, useEffect } from 'react';
import '../styles/Loader.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <div className="loader-bar" style={{ width: `${progress}%` }}></div>
      <div className="loader-text">Loading... {progress}%</div>
    </div>
  );
};

export default Loader;
import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', text = '' }) => {
  const sizeClass = `loader-${size}`;

  return (
    <div className="loader-container">
      <div className={`loader ${sizeClass}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;


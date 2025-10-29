import React from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-message fade-in">
      <div className="error-content">
        <FiAlertCircle className="error-icon" />
        <p className="error-text">{message}</p>
      </div>
      {onClose && (
        <button className="error-close" onClick={onClose} aria-label="Close error">
          <FiX />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;


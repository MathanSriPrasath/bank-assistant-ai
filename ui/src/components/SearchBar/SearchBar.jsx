import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { APP_CONFIG } from '../../constants';
import './SearchBar.css';

const SearchBar = ({ onSubmit, disabled = false, placeholder = 'Type your message...' }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <textarea
          className="search-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={APP_CONFIG.MAX_MESSAGE_LENGTH}
          rows={1}
        />
        <div className="char-counter">
          {input.length}/{APP_CONFIG.MAX_MESSAGE_LENGTH}
        </div>
      </div>
      <button
        type="submit"
        className="send-button"
        disabled={!input.trim() || disabled}
        aria-label="Send message"
      >
        <FiSend className="send-icon" />
      </button>
    </form>
  );
};

export default SearchBar;


import React, { useRef, useEffect } from 'react';
import Message from '../Message/Message';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import './ChatInterface.css';

const ChatInterface = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏦</div>
            <h3>Welcome to Cardy AI Banking Assistant!</h3>
            <p>
              I'm here to assist you with all your banking needs - account inquiries, 
              loans, transactions, branch information, and financial services.
            </p>
            <p className="empty-hint">💡 I specialize in banking services only</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;


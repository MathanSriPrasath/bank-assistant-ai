import React from 'react';
import { MESSAGE_TYPES } from '../../constants';
import { formatMessageTime } from '../../utils/formatters';
import AccountDetails from '../AccountDetails/AccountDetails';
import './Message.css';

const Message = ({ message }) => {
  const { type, text, timestamp, accountData } = message;

  const getMessageClass = () => {
    switch (type) {
      case MESSAGE_TYPES.USER:
        return 'message-user';
      case MESSAGE_TYPES.BOT:
        return 'message-bot';
      case MESSAGE_TYPES.ERROR:
        return 'message-error';
      case MESSAGE_TYPES.SYSTEM:
        return 'message-system';
      default:
        return 'message-bot';
    }
  };

  const getMessageIcon = () => {
    switch (type) {
      case MESSAGE_TYPES.USER:
        return '👤';
      case MESSAGE_TYPES.BOT:
        return '🤖';
      case MESSAGE_TYPES.ERROR:
        return '❌';
      case MESSAGE_TYPES.SYSTEM:
        return 'ℹ️';
      default:
        return '🤖';
    }
  };

  return (
    <div className={`message ${getMessageClass()} fade-in`}>
      <div className="message-avatar">{getMessageIcon()}</div>
      <div className="message-content">
        <div className="message-bubble">
          <p className="message-text">{text}</p>
          {accountData && <AccountDetails data={accountData} />}
        </div>
        <span className="message-time">{formatMessageTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;


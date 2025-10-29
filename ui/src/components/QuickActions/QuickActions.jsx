import React from 'react';
import { QUICK_ACTIONS } from '../../constants';
import './QuickActions.css';

const QuickActions = ({ onActionClick, disabled = false }) => {
  return (
    <div className="quick-actions">
      <p className="quick-actions-title">Quick Actions</p>
      <div className="quick-actions-grid">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.id}
            className="quick-action-btn"
            onClick={() => onActionClick(action.action)}
            disabled={disabled}
          >
            <span className="action-icon">{action.icon}</span>
            <span className="action-text">{action.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;


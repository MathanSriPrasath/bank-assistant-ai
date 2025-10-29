import React from 'react';
import { FiActivity, FiLogOut, FiUser } from 'react-icons/fi';
import { APP_CONFIG } from '../../constants';
import './Header.css';

const Header = ({ healthStatus, user, onLogout }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-brand">
          <div className="logo-circle">
            <span className="logo-text">🤖</span>
          </div>
          <div className="brand-info">
            <h1 className="app-title">{APP_CONFIG.APP_NAME}</h1>
            <p className="app-subtitle">{APP_CONFIG.APP_SUBTITLE}</p>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-status">
            <div className={`status-indicator ${healthStatus.isHealthy ? 'online' : 'offline'}`}>
              <FiActivity className="status-icon" />
              <span className="status-text">
                {healthStatus.isHealthy ? 'Online' : 'Offline'}
              </span>
            </div>
            {healthStatus.llmAvailable && (
              <span className="ai-badge">✨ AI Enabled</span>
            )}
          </div>

          {user && (
            <div className="user-section">
              <div className="user-info">
                <FiUser className="user-icon" />
                <div className="user-details">
                  <span className="user-name">{user.accountData?.holder_name || 'User'}</span>
                  <span className="user-phone">{user.mobileNumber}</span>
                </div>
              </div>
              <button className="logout-button" onClick={onLogout} title="Logout">
                <FiLogOut />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


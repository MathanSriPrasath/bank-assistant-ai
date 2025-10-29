import React, { useState } from 'react';
import { FaPhone, FaLock } from 'react-icons/fa';
import Loader from '../Loader/Loader';
import './Login.css';

function Login({ onLogin, isLoading }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!mobileNumber) {
      setError('Please enter your mobile number');
      return;
    }

    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    onLogin(mobileNumber);
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 10) {
      setMobileNumber(value);
      setError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <FaLock />
          </div>
          <h1>🤖 Cardy AI</h1>
          <p>Your Intelligent Banking Assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="mobile">Login with Phone Number</label>
            <div className="input-wrapper">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                id="mobile"
                placeholder="Enter 10-digit mobile number"
                value={mobileNumber}
                onChange={handleInputChange}
                disabled={isLoading}
                className={error ? 'error' : ''}
                autoFocus
              />
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader size="small" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <FaLock />
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p className="info-text">
            <strong>📌 Note:</strong> Use your registered mobile number to access your account
          </p>
          <div className="features">
            <div className="feature">
              <span>✅</span>
              <span>Secure Login</span>
            </div>
            <div className="feature">
              <span>🤖</span>
              <span>AI-Powered Assistance</span>
            </div>
            <div className="feature">
              <span>💳</span>
              <span>Account Management</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;


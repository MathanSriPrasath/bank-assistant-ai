import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { validateMobileNumber } from '../../utils/validators';
import Loader from '../Loader/Loader';
import './AccountModal.css';

const AccountModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const validation = validateMobileNumber(mobileNumber);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onSubmit(mobileNumber);
  };

  const handleClose = () => {
    setMobileNumber('');
    setError('');
    onClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(value);
    if (error) setError('');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">📱 Account Lookup</h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close modal">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <p className="modal-description">
            Enter your 10-digit mobile number to retrieve your account details.
          </p>

          <div className="form-group">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="text"
              className={`form-input ${error ? 'input-error' : ''}`}
              value={mobileNumber}
              onChange={handleInputChange}
              placeholder="1234567890"
              maxLength={10}
              disabled={isLoading}
              autoFocus
            />
            {error && <p className="input-error-text">{error}</p>}
          </div>

          {isLoading ? (
            <Loader size="small" text="Fetching account details..." />
          ) : (
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!mobileNumber || isLoading}
              >
                Get Details
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountModal;


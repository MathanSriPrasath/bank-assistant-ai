import React from 'react';
import {
  formatAccountNumber,
  formatDate,
  capitalizeWords,
} from '../../utils/formatters';
import './AccountDetails.css';

const AccountDetails = ({ data }) => {
  if (!data) return null;

  const {
    holder_name,
    account_no,
    branch_name,
    account_type,
    loan_status,
    loan_end_date,
  } = data;

  return (
    <div className="account-details">
      <div className="account-header">
        <h4 className="account-title">📋 Account Information</h4>
      </div>
      
      <div className="account-grid">
        <div className="account-field">
          <span className="field-label">👤 Holder Name</span>
          <span className="field-value">{capitalizeWords(holder_name)}</span>
        </div>

        <div className="account-field">
          <span className="field-label">🔢 Account Number</span>
          <span className="field-value">{formatAccountNumber(account_no)}</span>
        </div>

        <div className="account-field">
          <span className="field-label">🏛️ Branch</span>
          <span className="field-value">{capitalizeWords(branch_name)}</span>
        </div>

        <div className="account-field">
          <span className="field-label">🗂️ Account Type</span>
          <span className="field-value">{capitalizeWords(account_type)}</span>
        </div>

        <div className="account-field">
          <span className="field-label">💰 Loan Status</span>
          <span className="field-value">
            {loan_status === 'No Active Loans' ? (
              <span className="status-badge status-success">✓ {loan_status}</span>
            ) : (
              <span className="status-badge status-warning">{loan_status}</span>
            )}
          </span>
        </div>

        <div className="account-field">
          <span className="field-label">📅 Loan End Date</span>
          <span className="field-value">{formatDate(loan_end_date)}</span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;


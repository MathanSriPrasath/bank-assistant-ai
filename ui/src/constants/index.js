// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  ACCOUNT_DETAILS: '/api/account/details',
  CHAT_QUERY: '/api/chat/query',
  LOAN_INFO: '/api/info/loans',
  BRANCH_INFO: '/api/info/branches',
  CONTACT_INFO: '/api/info/contact',
};

// Message Types
export const MESSAGE_TYPES = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system',
  ERROR: 'error',
};

// Quick Action Buttons
export const QUICK_ACTIONS = [
  { id: 1, text: 'Check Account Details', icon: '💳', action: 'account' },
  { id: 2, text: 'Apply for Loan', icon: '💰', action: 'loan' },
  { id: 3, text: 'Find Branch', icon: '🏦', action: 'branch' },
  { id: 4, text: 'Contact Support', icon: '📞', action: 'contact' },
];

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Cardy AI',
  APP_SUBTITLE: 'Your Intelligent Banking Assistant',
  MAX_MESSAGE_LENGTH: 500,
  DEBOUNCE_DELAY: 300,
  TYPING_INDICATOR_DELAY: 500,
};

// Validation Rules
export const VALIDATION = {
  MOBILE_NUMBER: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 10,
    PATTERN: /^[0-9]{10}$/,
  },
};

// Toast Configuration
export const TOAST_CONFIG = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};


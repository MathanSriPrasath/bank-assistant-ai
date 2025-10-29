// Action Types
export const BANK_ACTION_TYPES = {
  // Messages
  ADD_MESSAGE: 'ADD_MESSAGE',
  CLEAR_MESSAGES: 'CLEAR_MESSAGES',
  SET_TYPING: 'SET_TYPING',
  
  // Account
  SET_ACCOUNT_DATA: 'SET_ACCOUNT_DATA',
  CLEAR_ACCOUNT_DATA: 'CLEAR_ACCOUNT_DATA',
  
  // Authentication
  SET_USER: 'SET_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  
  // Loading & Errors
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  
  // Modal
  SET_MODAL: 'SET_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  
  // Health
  SET_HEALTH_STATUS: 'SET_HEALTH_STATUS',
};

// Action Creators
export const addMessage = (message) => ({
  type: BANK_ACTION_TYPES.ADD_MESSAGE,
  payload: message,
});

export const clearMessages = () => ({
  type: BANK_ACTION_TYPES.CLEAR_MESSAGES,
});

export const setTyping = (isTyping) => ({
  type: BANK_ACTION_TYPES.SET_TYPING,
  payload: isTyping,
});

export const setAccountData = (accountData) => ({
  type: BANK_ACTION_TYPES.SET_ACCOUNT_DATA,
  payload: accountData,
});

export const clearAccountData = () => ({
  type: BANK_ACTION_TYPES.CLEAR_ACCOUNT_DATA,
});

export const setLoading = (isLoading) => ({
  type: BANK_ACTION_TYPES.SET_LOADING,
  payload: isLoading,
});

export const setError = (error) => ({
  type: BANK_ACTION_TYPES.SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: BANK_ACTION_TYPES.CLEAR_ERROR,
});

export const setModal = (modalType, modalData = null) => ({
  type: BANK_ACTION_TYPES.SET_MODAL,
  payload: { modalType, modalData },
});

export const closeModal = () => ({
  type: BANK_ACTION_TYPES.CLOSE_MODAL,
});

export const setHealthStatus = (healthData) => ({
  type: BANK_ACTION_TYPES.SET_HEALTH_STATUS,
  payload: healthData,
});

export const setUser = (userData) => ({
  type: BANK_ACTION_TYPES.SET_USER,
  payload: userData,
});

export const logoutUser = () => ({
  type: BANK_ACTION_TYPES.LOGOUT_USER,
});


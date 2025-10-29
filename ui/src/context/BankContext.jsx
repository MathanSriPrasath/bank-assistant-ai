import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { bankReducer, initialState } from './reducers/bankReducer';
import {
  addMessage,
  clearMessages,
  setTyping,
  setAccountData,
  clearAccountData,
  setLoading,
  setError,
  clearError,
  setModal,
  closeModal,
  setHealthStatus,
  setUser,
  logoutUser,
} from './actions/bankActions';
import { MESSAGE_TYPES } from '../constants';
import { checkHealth } from '../api/bankApi';

// Create Context
const BankContext = createContext();

// Provider Component
export const BankProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bankReducer, initialState);

  // Check API health on mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const healthData = await checkHealth();
        dispatch(setHealthStatus(healthData));
      } catch (error) {
        console.error('Health check failed:', error);
      }
    };

    checkApiHealth();
    
    // Check health every 5 minutes
    const interval = setInterval(checkApiHealth, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Context value with state and actions
  const value = {
    // State
    state,
    
    // Message Actions
    addMessage: (message) => dispatch(addMessage(message)),
    clearMessages: () => dispatch(clearMessages()),
    setTyping: (isTyping) => dispatch(setTyping(isTyping)),
    
    // Account Actions
    setAccountData: (data) => dispatch(setAccountData(data)),
    clearAccountData: () => dispatch(clearAccountData()),
    
    // Authentication Actions
    setUser: (userData) => dispatch(setUser(userData)),
    logoutUser: () => dispatch(logoutUser()),
    
    // Loading & Error Actions
    setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    setError: (error) => dispatch(setError(error)),
    clearError: () => dispatch(clearError()),
    
    // Modal Actions
    setModal: (type, data) => dispatch(setModal(type, data)),
    closeModal: () => dispatch(closeModal()),
    
    // Health Actions
    setHealthStatus: (data) => dispatch(setHealthStatus(data)),
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
};

// Custom Hook to use Bank Context
export const useBankContext = () => {
  const context = useContext(BankContext);
  
  if (!context) {
    throw new Error('useBankContext must be used within a BankProvider');
  }
  
  return context;
};

export default BankContext;


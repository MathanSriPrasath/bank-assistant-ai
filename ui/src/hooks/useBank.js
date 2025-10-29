import { useCallback } from 'react';
import { useBankContext } from '../context/BankContext';
import {
  fetchAccountDetails,
  sendChatQuery,
  getLoanInfo,
  getBranchInfo,
  getContactInfo,
  loginWithPhone,
} from '../api/bankApi';
import { MESSAGE_TYPES } from '../constants';
import { validateMobileNumber, sanitizeInput } from '../utils/validators';

/**
 * Custom hook for bank operations
 */
const useBank = () => {
  const {
    state,
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
    setUser,
    logoutUser,
  } = useBankContext();

  /**
   * Handle user login
   */
  const handleLogin = useCallback(
    async (mobileNumber) => {
      try {
        setLoading(true);
        clearError();

        // Validate mobile number
        const validation = validateMobileNumber(mobileNumber);
        if (!validation.isValid) {
          setError(validation.error);
          return { success: false, error: validation.error };
        }

        // Login with phone
        const response = await loginWithPhone(mobileNumber);

        if (response.success) {
          // Set user data in context
          setUser({
            mobileNumber: response.data.mobile_number,
            accountData: response.data,
          });

          // Add welcome message
          addMessage({
            type: MESSAGE_TYPES.BOT,
            text: `Welcome back, ${response.data.holder_name}! 🏦\n\nI'm your banking assistant. I can help you with:\n• Account information and balances\n• Loan inquiries and applications\n• Branch locations and services\n• Transaction queries\n• Banking support\n\nHow can I assist you with your banking needs today?`,
          });

          return { success: true, data: response.data };
        } else {
          setError(response.error || 'Login failed');
          return { success: false, error: response.error };
        }
      } catch (error) {
        const errorMessage = error.message || 'Login failed. Please try again.';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError, setUser]
  );

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  /**
   * Handle account details lookup
   */
  const handleAccountLookup = useCallback(
    async (mobileNumber) => {
      try {
        setLoading(true);
        clearError();

        // Validate mobile number
        const validation = validateMobileNumber(mobileNumber);
        if (!validation.isValid) {
          setError(validation.error);
          addMessage({
            type: MESSAGE_TYPES.ERROR,
            text: validation.error,
          });
          return { success: false, error: validation.error };
        }

        // Add user message
        addMessage({
          type: MESSAGE_TYPES.USER,
          text: `Check account for ${mobileNumber}`,
        });

        // Fetch account details
        const response = await fetchAccountDetails(mobileNumber);

        if (response.success) {
          setAccountData(response.data);
          
          // Add success message
          addMessage({
            type: MESSAGE_TYPES.BOT,
            text: '✅ Account details fetched successfully!',
            accountData: response.data,
          });

          return { success: true, data: response.data };
        } else {
          setError(response.error);
          addMessage({
            type: MESSAGE_TYPES.ERROR,
            text: response.error || 'Failed to fetch account details',
          });
          return { success: false, error: response.error };
        }
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error occurred';
        setError(errorMessage);
        addMessage({
          type: MESSAGE_TYPES.ERROR,
          text: errorMessage,
        });
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError, addMessage, setAccountData]
  );

  /**
   * Handle chat query
   */
  const handleChatQuery = useCallback(
    async (query) => {
      try {
        setLoading(true);
        clearError();

        const sanitizedQuery = sanitizeInput(query);

        // Add user message
        addMessage({
          type: MESSAGE_TYPES.USER,
          text: sanitizedQuery,
        });

        // Show typing indicator
        setTyping(true);

        // Send query to backend with user context if authenticated
        const userContext = state.isAuthenticated && state.user ? {
          mobile_number: state.user.mobileNumber,
          account_data: state.user.accountData,
        } : null;

        const response = await sendChatQuery(sanitizedQuery, userContext);

        setTyping(false);

        if (response.success) {
          // Add bot response
          addMessage({
            type: MESSAGE_TYPES.BOT,
            text: response.response,
          });

          return { success: true, response: response.response };
        } else {
          setError(response.error);
          addMessage({
            type: MESSAGE_TYPES.ERROR,
            text: response.error || 'Failed to get response',
          });
          return { success: false, error: response.error };
        }
      } catch (error) {
        setTyping(false);
        const errorMessage = error.message || 'An unexpected error occurred';
        setError(errorMessage);
        addMessage({
          type: MESSAGE_TYPES.ERROR,
          text: errorMessage,
        });
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError, addMessage, setTyping]
  );

  /**
   * Handle quick actions
   */
  const handleQuickAction = useCallback(
    async (action) => {
      try {
        setLoading(true);
        clearError();

        let response;
        let messageText = '';

        switch (action) {
          case 'account':
            setModal('account');
            setLoading(false);
            return;

          case 'loan':
            response = await getLoanInfo();
            if (response.success) {
              messageText = `💡 ${response.data.title}\n\n${response.data.description}\n\n📞 Contact: ${response.data.contact}`;
            }
            break;

          case 'branch':
            response = await getBranchInfo();
            if (response.success) {
              const branches = response.data.branches
                .map((b) => `• ${b.name} - ${b.location}`)
                .join('\n');
              messageText = `🏦 ${response.data.title}\n\n${branches}\n\n${response.data.note}`;
            }
            break;

          case 'contact':
            response = await getContactInfo();
            if (response.success) {
              messageText = `☎️ ${response.data.title}\n\n📞 Customer Care: ${response.data.customer_care}\n🚨 Fraud Reporting: ${response.data.fraud_reporting}\n\n${response.data.description}`;
            }
            break;

          default:
            messageText = 'Unknown action';
        }

        if (messageText) {
          addMessage({
            type: MESSAGE_TYPES.BOT,
            text: messageText,
          });
        }

        return { success: true };
      } catch (error) {
        const errorMessage = error.message || 'Failed to process action';
        setError(errorMessage);
        addMessage({
          type: MESSAGE_TYPES.ERROR,
          text: errorMessage,
        });
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [setLoading, clearError, setError, addMessage, setModal]
  );

  return {
    // State
    messages: state.messages,
    accountData: state.accountData,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isTyping: state.isTyping,
    isLoading: state.isLoading,
    error: state.error,
    modal: state.modal,
    healthStatus: state.healthStatus,

    // Actions
    handleLogin,
    handleLogout,
    handleAccountLookup,
    handleChatQuery,
    handleQuickAction,
    clearMessages,
    clearAccountData,
    clearError,
    closeModal,
  };
};

export default useBank;


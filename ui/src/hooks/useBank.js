import { useCallback } from 'react';
import { useBankContext } from '../context/BankContext';
import {
  fetchAccountDetails,
  sendChatQuery,
  getLoanInfo,
  getBranchInfo,
  getContactInfo,
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
  } = useBankContext();

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

        // Send query to backend
        const response = await sendChatQuery(sanitizedQuery);

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
    isTyping: state.isTyping,
    isLoading: state.isLoading,
    error: state.error,
    modal: state.modal,
    healthStatus: state.healthStatus,

    // Actions
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


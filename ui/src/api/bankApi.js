import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('📤 Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('📥 Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API Functions

/**
 * Check API health status
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.HEALTH);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Fetch account details by mobile number
 * @param {string} mobileNumber - 10-digit mobile number
 */
export const fetchAccountDetails = async (mobileNumber) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.ACCOUNT_DETAILS, {
      mobile_number: mobileNumber,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Login with phone number
 * @param {string} mobileNumber - 10-digit mobile number
 */
export const loginWithPhone = async (mobileNumber) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, {
      mobile_number: mobileNumber,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Send a chat query to the bot
 * @param {string} query - User query/message
 * @param {object} userContext - Optional user context for personalized responses
 */
export const sendChatQuery = async (query, userContext = null) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.CHAT_QUERY, {
      query: query,
      user_context: userContext,
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get loan information
 */
export const getLoanInfo = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LOAN_INFO);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get branch information
 */
export const getBranchInfo = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.BRANCH_INFO);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get contact information
 */
export const getContactInfo = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.CONTACT_INFO);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Handle API errors consistently
 * @param {Error} error - Axios error object
 */
const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.error || 'Server error occurred',
      status: error.response.status,
      data: error.response.data,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'Unable to connect to server. Please check your connection.',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1,
    };
  }
};

export default apiClient;


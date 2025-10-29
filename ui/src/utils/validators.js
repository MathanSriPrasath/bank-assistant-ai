import { VALIDATION } from '../constants';

/**
 * Validate mobile number
 * @param {string} mobileNumber - Mobile number to validate
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateMobileNumber = (mobileNumber) => {
  if (!mobileNumber) {
    return {
      isValid: false,
      error: 'Mobile number is required',
    };
  }

  const trimmed = mobileNumber.trim();

  if (trimmed.length !== VALIDATION.MOBILE_NUMBER.MAX_LENGTH) {
    return {
      isValid: false,
      error: 'Mobile number must be exactly 10 digits',
    };
  }

  if (!VALIDATION.MOBILE_NUMBER.PATTERN.test(trimmed)) {
    return {
      isValid: false,
      error: 'Mobile number must contain only digits',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validate query/message input
 * @param {string} query - Query to validate
 * @param {number} maxLength - Maximum allowed length
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateQuery = (query, maxLength = 500) => {
  if (!query || !query.trim()) {
    return {
      isValid: false,
      error: 'Please enter a message',
    };
  }

  if (query.length > maxLength) {
    return {
      isValid: false,
      error: `Message is too long. Maximum ${maxLength} characters allowed`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Sanitize user input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potentially dangerous characters
    .slice(0, 500); // Limit length
};


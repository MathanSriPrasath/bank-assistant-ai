/**
 * Format account number for display
 * @param {string} accountNumber - Raw account number
 * @returns {string} - Formatted account number (e.g., XXXX-XXXX-1234)
 */
export const formatAccountNumber = (accountNumber) => {
  if (!accountNumber) return 'N/A';
  
  const str = String(accountNumber);
  const length = str.length;
  
  if (length <= 4) {
    return str;
  }
  
  // Show only last 4 digits
  const lastFour = str.slice(-4);
  const masked = 'X'.repeat(Math.min(8, length - 4));
  
  return `${masked}-${lastFour}`;
};

/**
 * Format date string
 * @param {string} dateString - Date string
 * @returns {string} - Formatted date (e.g., "Jan 15, 2024")
 */
export const formatDate = (dateString) => {
  if (!dateString || dateString === 'N/A' || dateString === 'None') {
    return 'N/A';
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format timestamp for messages
 * @param {Date} date - Date object
 * @returns {string} - Formatted time (e.g., "2:30 PM")
 */
export const formatMessageTime = (date = new Date()) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format mobile number for display
 * @param {string} mobile - Mobile number
 * @returns {string} - Formatted mobile (e.g., "(123) 456-7890")
 */
export const formatMobileNumber = (mobile) => {
  if (!mobile) return 'N/A';
  
  const cleaned = String(mobile).replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return mobile;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted currency (e.g., "$1,234.56")
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  
  return text.slice(0, maxLength) + '...';
};


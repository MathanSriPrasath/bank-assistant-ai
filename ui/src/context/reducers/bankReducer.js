import { BANK_ACTION_TYPES } from '../actions/bankActions';
import { MESSAGE_TYPES } from '../../constants';

export const initialState = {
  messages: [],
  accountData: null,
  user: null,
  isAuthenticated: false,
  isTyping: false,
  isLoading: false,
  error: null,
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  healthStatus: {
    isHealthy: false,
    llmAvailable: false,
    lastChecked: null,
  },
};

export const bankReducer = (state, action) => {
  switch (action.type) {
    case BANK_ACTION_TYPES.ADD_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            ...action.payload,
            id: Date.now() + Math.random(),
            timestamp: new Date(),
          },
        ],
      };

    case BANK_ACTION_TYPES.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    case BANK_ACTION_TYPES.SET_TYPING:
      return {
        ...state,
        isTyping: action.payload,
      };

    case BANK_ACTION_TYPES.SET_ACCOUNT_DATA:
      return {
        ...state,
        accountData: action.payload,
      };

    case BANK_ACTION_TYPES.CLEAR_ACCOUNT_DATA:
      return {
        ...state,
        accountData: null,
      };

    case BANK_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case BANK_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case BANK_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case BANK_ACTION_TYPES.SET_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          type: action.payload.modalType,
          data: action.payload.modalData,
        },
      };

    case BANK_ACTION_TYPES.CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          type: null,
          data: null,
        },
      };

    case BANK_ACTION_TYPES.SET_HEALTH_STATUS:
      return {
        ...state,
        healthStatus: {
          isHealthy: action.payload.status === 'healthy',
          llmAvailable: action.payload.llm_available || false,
          lastChecked: new Date(),
        },
      };

    case BANK_ACTION_TYPES.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        accountData: action.payload.accountData,
      };

    case BANK_ACTION_TYPES.LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        accountData: null,
        messages: [],
      };

    default:
      return state;
  }
};


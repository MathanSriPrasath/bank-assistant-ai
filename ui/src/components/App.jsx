import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header/Header';
import QuickActions from './QuickActions/QuickActions';
import ChatInterface from './ChatInterface/ChatInterface';
import SearchBar from './SearchBar/SearchBar';
import AccountModal from './AccountModal/AccountModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import useBank from '../hooks/useBank';
import { TOAST_CONFIG } from '../constants';
import './App.css';

function App() {
  const {
    messages,
    isTyping,
    isLoading,
    error,
    modal,
    healthStatus,
    handleAccountLookup,
    handleChatQuery,
    handleQuickAction,
    clearError,
    closeModal,
  } = useBank();

  // Show toast notifications for errors
  useEffect(() => {
    if (error) {
      toast.error(error, TOAST_CONFIG);
    }
  }, [error]);

  // Handle account modal submission
  const handleModalSubmit = async (mobileNumber) => {
    const result = await handleAccountLookup(mobileNumber);
    if (result.success) {
      closeModal();
      toast.success('Account details fetched successfully!', TOAST_CONFIG);
    }
  };

  return (
    <div className="app">
      <Header healthStatus={healthStatus} />
      
      <main className="app-main">
        <div className="app-container">
          {/* Error Display */}
          {error && <ErrorMessage message={error} onClose={clearError} />}

          {/* Quick Actions */}
          <QuickActions
            onActionClick={handleQuickAction}
            disabled={isLoading}
          />

          {/* Chat Interface */}
          <div className="chat-container">
            <ChatInterface messages={messages} isTyping={isTyping} />
            <SearchBar
              onSubmit={handleChatQuery}
              disabled={isLoading}
              placeholder="Ask me anything about your account or banking services..."
            />
          </div>
        </div>
      </main>

      {/* Account Lookup Modal */}
      <AccountModal
        isOpen={modal.isOpen && modal.type === 'account'}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        isLoading={isLoading}
      />

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Footer */}
      <footer className="app-footer">
        <p>
          © 2025 Cardy AI - Bank Assistant | Powered by Google Gemini & React
        </p>
      </footer>
    </div>
  );
}

export default App;


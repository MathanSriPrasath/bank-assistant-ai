# Phone-Based Authentication Implementation

## Overview

This implementation adds **phone-based authentication** to the Cardy AI banking assistant. Users must log in with their registered phone number before accessing the chatbot. Once authenticated, the AI provides **personalized responses** based on their account details.

## Features Implemented

### 1. **Phone-Based Login System**
- Secure login using 10-digit mobile number
- Account validation against database
- Beautiful login UI with animations
- Error handling and validation

### 2. **User Session Management**
- User state stored in React Context
- Persistent authentication throughout the session
- Automatic logout functionality
- User information displayed in header

### 3. **Personalized AI Responses**
- AI chatbot receives user context with every query
- Responses include user's name, account details, branch info, etc.
- Personalized greetings and account-specific information
- Context-aware conversation

### 4. **Enhanced UI/UX**
- Modern login screen with gradient design
- User profile display in header
- Logout button with smooth animations
- Mobile-responsive design
- Toast notifications for actions

## Technical Implementation

### Frontend Changes

#### New Components
- **`Login` Component** (`ui/src/components/Login/`)
  - Phone number input with validation
  - Loading states
  - Error messages
  - Responsive design

#### Modified Components

1. **`App.jsx`**
   - Shows login screen when not authenticated
   - Passes user data to Header
   - Handles login/logout flow

2. **`Header.jsx`**
   - Displays logged-in user information
   - Shows logout button
   - Mobile-responsive user section

3. **Context & State Management**
   - Added `user`, `isAuthenticated` to state
   - Added `SET_USER`, `LOGOUT_USER` actions
   - Enhanced reducer to handle auth state

4. **`useBank` Hook**
   - `handleLogin()` - Authenticates user with phone number
   - `handleLogout()` - Clears user session
   - Enhanced `handleChatQuery()` - Sends user context to backend

5. **API Integration** (`bankApi.js`)
   - `loginWithPhone()` - Login API call
   - Updated `sendChatQuery()` - Accepts user context parameter

### Backend Changes

#### New Endpoints

**`POST /api/auth/login`**
```json
Request:
{
  "mobile_number": "9876543210"
}

Response:
{
  "success": true,
  "data": {
    "mobile_number": "9876543210",
    "holder_name": "John Doe",
    "account_no": "1234567890",
    "branch_name": "City Center",
    "account_type": "Savings",
    "loan_status": "Personal Loan",
    "loan_end_date": "2025-12-31"
  }
}
```

#### Enhanced Endpoints

**`POST /api/chat/query`** (Enhanced)
- Now accepts optional `user_context` parameter
- Passes user account details to AI
- Generates personalized responses

```json
Request:
{
  "query": "What's my loan status?",
  "user_context": {
    "mobile_number": "9876543210",
    "account_data": {
      "holder_name": "John Doe",
      "account_no": "1234567890",
      "loan_status": "Personal Loan",
      "loan_end_date": "2025-12-31"
      // ... other fields
    }
  }
}
```

#### Modified Functions

**`get_general_llm_response(query, user_context)`**
- Enhanced to accept user context
- Builds personalized system instructions for AI
- Includes user's account details in AI prompts
- AI addresses users by name when appropriate

## User Flow

### 1. **Login Flow**
```
User opens app
    ↓
Sees login screen
    ↓
Enters 10-digit phone number
    ↓
System validates number
    ↓
Checks database for account
    ↓
If found: Login success + Show main app
If not found: Error message
```

### 2. **Chat Flow (After Login)**
```
User types message
    ↓
Message sent to backend with user context
    ↓
Backend passes context to AI
    ↓
AI generates personalized response
    ↓
Response shows user's specific details
```

### 3. **Logout Flow**
```
User clicks logout button
    ↓
Clears user state
    ↓
Clears messages
    ↓
Returns to login screen
```

## Example Interactions

### Before Authentication
- User cannot access chat interface
- Only sees login screen
- Must enter valid registered phone number

### After Authentication

**User asks:** "What's my account type?"

**AI responds:** "Hi John! Your account is a **Savings** account at our **City Center** branch."

**User asks:** "Do I have any loans?"

**AI responds:** "Yes John, you currently have a **Personal Loan** that is due to end on **2025-12-31**."

**User asks:** "Which branch am I at?"

**AI responds:** "You're registered at our **City Center** branch. Is there anything specific you'd like to know about your branch?"

## Security Features

1. **Account Validation**
   - Phone number must exist in database
   - 10-digit validation
   - Server-side verification

2. **Session Management**
   - User state stored in memory (React Context)
   - Cleared on logout
   - No persistent storage (add localStorage if needed)

3. **Error Handling**
   - Invalid phone numbers rejected
   - Non-existent accounts handled gracefully
   - Database errors caught and reported

## Files Modified

### Frontend (`ui/src/`)
```
components/
  ├── Login/
  │   ├── Login.jsx (NEW)
  │   └── Login.css (NEW)
  ├── App.jsx (MODIFIED)
  ├── Header/
  │   ├── Header.jsx (MODIFIED)
  │   └── Header.css (MODIFIED)

context/
  ├── actions/
  │   └── bankActions.js (MODIFIED)
  ├── reducers/
  │   └── bankReducer.js (MODIFIED)
  └── BankContext.jsx (MODIFIED)

hooks/
  └── useBank.js (MODIFIED)

api/
  └── bankApi.js (MODIFIED)

constants/
  └── index.js (MODIFIED)
```

### Backend (`service/`)
```
app.py (MODIFIED)
  - Added /api/auth/login endpoint
  - Enhanced /api/chat/query endpoint
  - Modified get_general_llm_response() function
```

## Testing Instructions

### 1. Start the Backend
```bash
cd service
source venv/bin/activate  # or venv\Scripts\activate on Windows
python app.py
```

### 2. Start the Frontend
```bash
cd ui
npm start
```

### 3. Test Login
- Open http://localhost:3000
- You should see the login screen
- Enter a registered mobile number (e.g., `9876543210`)
- Click "Login"
- If successful, you'll see the main app

### 4. Test Personalized Responses
Try these queries:
- "What's my account number?"
- "Do I have any loans?"
- "What branch am I at?"
- "Tell me about my account"

### 5. Test Logout
- Click the logout button in the header
- You should return to the login screen
- All messages should be cleared

## Sample Test Data

Use these phone numbers to test (ensure they exist in your database):
- `9876543210` - John Doe (has Personal Loan)
- `8765432109` - Jane Smith (no loans)

## Future Enhancements

1. **Persistent Sessions**
   - Store auth token in localStorage
   - Auto-login on page refresh

2. **OTP Verification**
   - Send OTP to phone number
   - Verify before login

3. **Session Expiry**
   - Auto-logout after inactivity
   - Token expiration

4. **Multi-factor Authentication**
   - Add PIN or password
   - Biometric authentication

5. **Account Management**
   - Update profile
   - Change phone number
   - View transaction history

## Troubleshooting

### Login fails with "No account found"
- Ensure the phone number exists in the database
- Check database connection
- Verify MySQL is running

### AI responses not personalized
- Check GEMINI_API_KEY is set
- Verify backend is running
- Check browser console for errors

### Logout button not visible
- Clear browser cache
- Check user object is passed to Header
- Verify authentication state

## Notes

- The implementation uses simple phone-based authentication without passwords
- User sessions are stored in React Context (memory only)
- For production, implement proper token-based authentication
- Add session persistence with localStorage/sessionStorage if needed
- Consider adding rate limiting to prevent brute force attacks

## Summary

This implementation provides a complete authentication system that:
✅ Requires users to log in with their phone number
✅ Validates accounts against the database
✅ Provides personalized AI responses using user context
✅ Shows user information in the header
✅ Allows users to logout
✅ Has a beautiful, modern UI
✅ Is fully mobile-responsive

Users can now have truly personalized banking conversations with the AI assistant!


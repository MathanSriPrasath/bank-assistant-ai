# Bank Assistant UI - React Frontend

Modern, responsive React frontend for the Bank Assistant AI chatbot application.

## Features

- 💬 Real-time chat interface with AI-powered responses
- 🏦 Account details lookup by mobile number
- 🚀 Quick action buttons for common tasks
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Beautiful gradient UI with smooth animations
- 🎯 Context API for state management
- 🔔 Toast notifications for user feedback
- ♿ Accessible and user-friendly interface

## Tech Stack

- **React 18** - UI framework
- **React Context API** - State management
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications
- **CSS3** - Styling with modern features

## Project Structure

```
ui/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── api/                # API integration
│   │   └── bankApi.js      # Backend API calls
│   ├── components/         # React components
│   │   ├── App.jsx         # Main app component
│   │   ├── Header/         # Header component
│   │   ├── QuickActions/   # Quick action buttons
│   │   ├── ChatInterface/  # Chat display
│   │   ├── Message/        # Message component
│   │   ├── TypingIndicator/# Typing animation
│   │   ├── SearchBar/      # Input component
│   │   ├── AccountDetails/ # Account info display
│   │   ├── AccountModal/   # Account lookup modal
│   │   ├── ErrorMessage/   # Error display
│   │   └── Loader/         # Loading indicator
│   ├── context/            # State management
│   │   ├── actions/        # Action creators
│   │   ├── reducers/       # State reducers
│   │   └── BankContext.jsx # Context provider
│   ├── hooks/              # Custom hooks
│   │   ├── useBank.js      # Bank operations hook
│   │   └── useDebounce.js  # Debounce utility
│   ├── utils/              # Utility functions
│   │   ├── formatters.js   # Data formatting
│   │   └── validators.js   # Input validation
│   ├── constants/          # App constants
│   │   └── index.js
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
└── package.json            # Dependencies
```

## Setup & Installation

### Prerequisites

- Node.js 14+ and npm/yarn
- Backend API running on port 5000

### Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```
REACT_APP_API_URL=http://localhost:5000
```

3. **Start development server:**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## Features & Usage

### 1. Chat Interface
- Type messages in the input box at the bottom
- Press Enter or click Send button
- Bot responds with relevant information

### 2. Quick Actions
- **Check Account Details** - Opens modal for mobile number input
- **Apply for Loan** - Shows loan application information
- **Find Branch** - Displays branch locations
- **Contact Support** - Shows customer care numbers

### 3. Account Lookup
- Click "Check Account Details" quick action
- Enter 10-digit mobile number
- View complete account information

### 4. Smart Responses
- Keyword-based responses for common queries
- AI-powered responses for complex questions
- Context-aware conversation flow

## Component Details

### Context & State Management
- **BankContext**: Global state provider
- **bankReducer**: State update logic
- **Actions**: Typed action creators

### Custom Hooks
- **useBank**: Main hook for bank operations
- **useDebounce**: Debounce input values

### Utilities
- **validators**: Input validation functions
- **formatters**: Data formatting utilities

## Styling

- CSS Modules for component-specific styles
- CSS Variables for theming
- Responsive design with media queries
- Smooth animations and transitions
- Gradient backgrounds and modern UI

## API Integration

The app connects to the backend API at `REACT_APP_API_URL`:

**Endpoints used:**
- `GET /api/health` - Health check
- `POST /api/account/details` - Account lookup
- `POST /api/chat/query` - Chat queries
- `GET /api/info/loans` - Loan information
- `GET /api/info/branches` - Branch information
- `GET /api/info/contact` - Contact information

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast support

## Performance Optimizations

- Code splitting
- Lazy loading
- Optimized re-renders with Context
- Debounced inputs
- Memoized components

## Troubleshooting

### App won't start
- Check Node.js version (14+)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Check browser console for CORS errors

### Build errors
- Clear cache: `npm cache clean --force`
- Update dependencies: `npm update`
- Check for console errors

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Bank Assistant application.

## Support

For issues or questions, please check the main project README or contact the development team.


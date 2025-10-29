# 🤖 Cardy AI - Bank Assistant

A full-stack AI-powered banking assistant application that helps users with account queries, loan information, branch locations, and general banking questions.

## 🌟 Features

### Backend (Flask API)
- 🗄️ **MySQL Database Integration** - Account details lookup
- 🤖 **Google Gemini AI Integration** - Intelligent responses
- 🔑 **Keyword-based Responses** - Fast answers for common queries
- 📊 **RESTful API Endpoints** - Well-structured API
- 🔒 **Input Validation** - Secure data handling

### Frontend (React UI)
- 💬 **Real-time Chat Interface** - Smooth conversational experience
- 📱 **Mobile Responsive** - Works on all devices
- ✨ **Beautiful Modern UI** - Gradient design with animations
- 🚀 **Quick Actions** - One-click access to common tasks
- 🎯 **Context API State Management** - Efficient state handling
- 🔔 **Toast Notifications** - User-friendly feedback

## 📁 Project Structure

```
gemmini/
├── service/                # Backend API (Flask)
│   ├── app.py             # Main Flask application
│   ├── config.py          # Configuration settings
│   ├── requirements.txt   # Python dependencies
│   └── README.md          # Backend documentation
│
├── ui/                    # Frontend (React)
│   ├── public/           # Static files
│   ├── src/
│   │   ├── api/          # API integration
│   │   ├── components/   # React components
│   │   ├── context/      # State management
│   │   ├── hooks/        # Custom hooks
│   │   ├── utils/        # Utility functions
│   │   └── constants/    # App constants
│   ├── package.json      # Node dependencies
│   └── README.md         # Frontend documentation
│
├── app.py                # Original CLI application
├── bank_data.db          # SQLite database (original)
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

**Backend:**
- Python 3.8+
- MySQL Server
- Google Gemini API Key

**Frontend:**
- Node.js 14+
- npm or yarn

### Installation

#### 1. Clone the Repository
```bash
cd gemmini
```

#### 2. Set Up Backend

```bash
cd service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

**Set up MySQL Database:**
```sql
CREATE DATABASE BankDB_SingleTable;
USE BankDB_SingleTable;

CREATE TABLE AccountHolders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    holder_name VARCHAR(100),
    account_no VARCHAR(20),
    mobile_number VARCHAR(10),
    branch_name VARCHAR(100),
    account_type VARCHAR(50),
    loan_status VARCHAR(100),
    end_date DATE
);

-- Insert sample data
INSERT INTO AccountHolders VALUES
(1, 'John Doe', '1234567890', '9876543210', 'City Center', 'Savings', 'Personal Loan', '2025-12-31'),
(2, 'Jane Smith', '0987654321', '8765432109', 'North End', 'Checking', 'No Active Loans', NULL);
```

**Start Backend Server:**
```bash
python app.py
# Server runs on http://localhost:5000
```

#### 3. Set Up Frontend

Open a new terminal:

```bash
cd ui

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env if needed (default: http://localhost:5000)

# Start development server
npm start
# App opens at http://localhost:3000
```

## 🎯 Usage

### Web Interface (Recommended)

1. Open `http://localhost:3000` in your browser
2. Use **Quick Actions** for common tasks:
   - Check Account Details
   - Apply for Loan
   - Find Branch
   - Contact Support
3. Or type any banking query in the chat box
4. For account lookup, enter your 10-digit mobile number

### API Endpoints

**Backend API** (`http://localhost:5000`):

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/account/details` | Get account by mobile |
| POST | `/api/chat/query` | Send chat message |
| GET | `/api/info/loans` | Get loan information |
| GET | `/api/info/branches` | Get branch locations |
| GET | `/api/info/contact` | Get contact information |

**Example API Call:**
```bash
curl -X POST http://localhost:5000/api/account/details \
  -H "Content-Type: application/json" \
  -d '{"mobile_number": "9876543210"}'
```

## 🛠️ Tech Stack

### Backend
- **Flask** - Web framework
- **MySQL** - Database
- **Google Gemini** - AI/LLM
- **Flask-CORS** - Cross-origin support
- **python-dotenv** - Environment management

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **React Icons** - Icons
- **React Toastify** - Notifications
- **Context API** - State management

## 📸 Screenshots

```
┌─────────────────────────────────────┐
│  🤖 Cardy AI                        │
│  Your Intelligent Banking Assistant │
│  ✅ Online  ✨ AI Enabled           │
├─────────────────────────────────────┤
│  Quick Actions:                     │
│  [💳 Check Account] [💰 Loan]      │
│  [🏦 Find Branch]   [📞 Contact]   │
├─────────────────────────────────────┤
│  Chat Interface                     │
│  User: Check my account             │
│  Bot: Please enter mobile number    │
│  [Account Details Card]             │
├─────────────────────────────────────┤
│  [Type your message...] [Send →]   │
└─────────────────────────────────────┘
```

## 🔐 Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key_here
DB_HOST=localhost
DB_NAME=BankDB_SingleTable
DB_USER=root
DB_PASSWORD=root
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

## 🧪 Testing

### Backend
```bash
cd service
python -m pytest
```

### Frontend
```bash
cd ui
npm test
```

## 📦 Production Build

### Backend
```bash
cd service
# Use gunicorn or uwsgi for production
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend
```bash
cd ui
npm run build
# Serve the build/ folder with nginx or any static server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational purposes.

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed:**
- Ensure MySQL is running
- Verify database credentials in `.env`
- Check if database and table exist

**LLM Not Available:**
- Verify `GEMINI_API_KEY` in `.env`
- Check API key validity
- Ensure internet connection

### Frontend Issues

**Can't Connect to Backend:**
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Look for CORS errors in browser console

**UI Not Loading:**
- Clear browser cache
- Check browser console for errors
- Verify Node.js version (14+)

## 📞 Support

For issues and questions:
1. Check the individual README files in `service/` and `ui/` folders
2. Review the troubleshooting section
3. Check application logs

## 🎉 Acknowledgments

- Google Gemini for AI capabilities
- Flask & React communities
- Contributors and testers

---

**Built with ❤️ using Flask & React**


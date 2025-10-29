# Bank Assistant API Service

Backend REST API service for the Bank Assistant chatbot application.

## Features

- 🏦 Account details lookup by mobile number
- 💬 AI-powered chat responses using Google Gemini
- 🔑 Keyword-based responses for common queries
- 📊 Bank information endpoints (loans, branches, contact)
- 🗄️ MySQL database integration

## Setup

### Prerequisites

- Python 3.8+
- MySQL Server
- Google Gemini API Key

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

3. Set up MySQL database:
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
```

### Running the Server

```bash
python app.py
```

Server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Account Details
```
POST /api/account/details
Body: { "mobile_number": "1234567890" }
```

### Chat Query
```
POST /api/chat/query
Body: { "query": "How do I apply for a loan?" }
```

### Loan Information
```
GET /api/info/loans
```

### Branch Information
```
GET /api/info/branches
```

### Contact Information
```
GET /api/info/contact
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key
- `DB_HOST`: MySQL host (default: localhost)
- `DB_NAME`: Database name (default: BankDB_SingleTable)
- `DB_USER`: Database user (default: root)
- `DB_PASSWORD`: Database password (default: root)


import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
from google import genai
from google.genai.errors import APIError

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# ----------------------------------------------------------------------
# --- 1. CONFIGURATION AND INITIALIZATION ---
# ----------------------------------------------------------------------

# --- MySQL Database Config ---
DB_CONFIG = {
    'host': 'localhost',
    'database': 'BankDB_SingleTable',
    'user': 'root',
    'password': 'root'
}

# --- General Chatbot Keyword Responses (Fallback Step 3) ---
GENERIC_KEYWORD_RESPONSES = {
    "hello": "Hello there! I'm your Bank Assistant, ready to help with account queries or general banking information.",
    "thank you": "You're very welcome! Is there anything else I can assist you with today?",
    "support": "For immediate support, please call our 24/7 care line or specify your issue (e.g., 'fraud report')."
}

# --- Gemini LLM Initialization (Fallback Step 4) ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = None
LLM_AVAILABLE = False

try:
    if not GEMINI_API_KEY:
        print("⚠️ GEMINI_API_KEY not found. LLM services will be disabled.")
    else:
        client = genai.Client(api_key=GEMINI_API_KEY)
        LLM_AVAILABLE = True
except Exception as e:
    print(f"⚠️ Error initializing LLM client: {e}. Falling back to keyword-only mode.")

# ----------------------------------------------------------------------
# --- 2. MYSQL DATABASE FUNCTIONS (TOOL/ACTION) ---
# ----------------------------------------------------------------------

def fetch_account_details(mobile_number: str) -> dict or None:
    """Connects to MySQL and fetches account details by mobile number."""
    
    # Simple validation for a 10-digit number
    if not (mobile_number and len(mobile_number) == 10 and mobile_number.isdigit()):
        return None

    connection = None
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True) 

            # Parameterized SQL query to prevent SQL injection
            query = """
            SELECT 
                holder_name, account_no, branch_name, account_type, 
                loan_status, end_date
            FROM 
                AccountHolders
            WHERE 
                mobile_number = %s;
            """
            
            cursor.execute(query, (mobile_number,))
            record = cursor.fetchone() 
            
            cursor.close()
            return record

    except Error as e:
        print(f"\n[ERROR] Database lookup failed: {e}", file=sys.stderr)
        return {"error": "Database connection failed. Check console for details."}
        
    finally:
        if connection and connection.is_connected():
            connection.close()

# ----------------------------------------------------------------------
# --- 3. KEYWORD AND LLM FALLBACK FUNCTIONS ---
# ----------------------------------------------------------------------

def get_bank_keyword_response(query: str) -> str or None:
    """
    Step 2: Handles specific bank informational queries using keywords.
    Returns the response string or None if no match is found.
    """
    query_lower = query.lower()

    if "loan" in query_lower and ("apply" in query_lower or "new" in query_lower):
        return (
            "💡 **Applying for a New Loan:**\n"
            "You can apply for a new loan through our mobile app, by visiting any bank branch, "
            "or by calling our dedicated loan department at **1800-200-5000**. "
            "You will need a valid ID proof and income documents."
        )
    elif "location" in query_lower or "branch" in query_lower or "available" in query_lower:
        return (
            "🌎 **Bank Locations (Sample Data):**\n"
            "Our main branches are located in the City Center, North End, and 7th Ave. "
            "Please visit our official website for a complete, up-to-date list of all locations."
        )
    elif "customer care" in query_lower or "number" in query_lower or "contact" in query_lower:
        return (
            "☎️ **Customer Care Details:**\n"
            "Our 24/7 customer care number is **1800-111-222**. "
            "For fraud reporting, please call **1800-444-999** immediately."
        )
    
    return None

def get_general_llm_response(query: str, user_context: dict = None) -> str:
    """
    Combines the final two fallback steps:
    Step 3 (Generic Keywords) and Step 4 (Gemini LLM API).
    Now includes user context for personalized responses.
    """
    normalized_input = query.lower().strip()

    # Step 3: Check Generic Chatbot Keywords
    for keyword, response in GENERIC_KEYWORD_RESPONSES.items():
        if keyword in normalized_input:
            return response

    # Step 4: Fallback to the LLM API
    if LLM_AVAILABLE and client:
        try:
            # Build system instruction with user context if available
            system_instruction = "You are a helpful and professional bank assistant. If the query is not bank-related, answer it professionally and briefly."
            
            # If user is logged in, add their context to the system instruction
            if user_context and user_context.get('account_data'):
                account_data = user_context.get('account_data')
                system_instruction += f"""
                
                The user is currently logged in. Here are their account details:
                - Name: {account_data.get('holder_name')}
                - Account Number: {account_data.get('account_no')}
                - Account Type: {account_data.get('account_type')}
                - Branch: {account_data.get('branch_name')}
                - Loan Status: {account_data.get('loan_status')}
                - Loan End Date: {account_data.get('loan_end_date')}
                
                When answering queries, use this information to provide personalized responses. 
                For example, if they ask about their account, loan status, or branch, use these details.
                Address them by their name when appropriate.
                """
            
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=query,
                config=genai.types.GenerateContentConfig(
                    system_instruction=system_instruction
                )
            )
            return response.text

        except APIError as e:
            return f"❌ LLM API Error: The advanced AI service is temporarily unavailable. Error: {e.args[0]}"
        except Exception as e:
            return "❌ An unexpected error occurred while contacting the AI service."
    else:
        return (
            "⚠️ My advanced AI services are currently offline. "
            "I can only handle specific bank keywords or private account lookups."
        )

# ----------------------------------------------------------------------
# --- 4. REST API ENDPOINTS ---
# ----------------------------------------------------------------------

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "llm_available": LLM_AVAILABLE,
        "service": "Bank Assistant API"
    })

@app.route('/api/auth/login', methods=['POST'])
def login():
    """
    Login endpoint - validates phone number and returns account details
    Body: { "mobile_number": "1234567890" }
    """
    try:
        data = request.get_json()
        mobile_number = data.get('mobile_number', '').strip()
        
        if not mobile_number:
            return jsonify({
                "success": False,
                "error": "Mobile number is required"
            }), 400
        
        if not (len(mobile_number) == 10 and mobile_number.isdigit()):
            return jsonify({
                "success": False,
                "error": "Please enter a valid 10-digit mobile number"
            }), 400
        
        # Fetch account details to verify user exists
        account_data = fetch_account_details(mobile_number)
        
        if account_data is None:
            return jsonify({
                "success": False,
                "error": f"No account found for mobile number {mobile_number}. Please check your number."
            }), 404
        
        if "error" in account_data:
            return jsonify({
                "success": False,
                "error": "Database connection failed"
            }), 500
        
        # Return user data with account details
        return jsonify({
            "success": True,
            "data": {
                "mobile_number": mobile_number,
                "holder_name": account_data.get('holder_name'),
                "account_no": account_data.get('account_no'),
                "branch_name": account_data.get('branch_name'),
                "account_type": account_data.get('account_type'),
                "loan_status": account_data.get('loan_status') or 'No Active Loans',
                "loan_end_date": str(account_data.get('end_date') or 'N/A')
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/account/details', methods=['POST'])
def get_account_details():
    """
    Endpoint to fetch account details by mobile number
    Body: { "mobile_number": "1234567890" }
    """
    try:
        data = request.get_json()
        mobile_number = data.get('mobile_number', '').strip()
        
        if not mobile_number:
            return jsonify({
                "success": False,
                "error": "Mobile number is required"
            }), 400
        
        if not (len(mobile_number) == 10 and mobile_number.isdigit()):
            return jsonify({
                "success": False,
                "error": "Please enter a valid 10-digit mobile number"
            }), 400
        
        account_data = fetch_account_details(mobile_number)
        
        if account_data is None:
            return jsonify({
                "success": False,
                "error": f"No account found for mobile number {mobile_number}"
            }), 404
        
        if "error" in account_data:
            return jsonify({
                "success": False,
                "error": "Database connection failed"
            }), 500
        
        # Format the response
        return jsonify({
            "success": True,
            "data": {
                "holder_name": account_data.get('holder_name'),
                "account_no": account_data.get('account_no'),
                "branch_name": account_data.get('branch_name'),
                "account_type": account_data.get('account_type'),
                "loan_status": account_data.get('loan_status') or 'No Active Loans',
                "loan_end_date": str(account_data.get('end_date') or 'N/A')
            }
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/chat/query', methods=['POST'])
def chat_query():
    """
    Endpoint to handle general chat queries with optional user context
    Body: { 
        "query": "How do I apply for a loan?",
        "user_context": {
            "mobile_number": "1234567890",
            "account_data": {...}
        }
    }
    """
    try:
        data = request.get_json()
        query = data.get('query', '').strip()
        user_context = data.get('user_context', None)
        
        if not query:
            return jsonify({
                "success": False,
                "error": "Query is required"
            }), 400
        
        # First check bank-specific keywords
        response = get_bank_keyword_response(query)
        
        # If no keyword match, use general LLM response with user context
        if response is None:
            response = get_general_llm_response(query, user_context)
        
        return jsonify({
            "success": True,
            "response": response
        })
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/info/loans', methods=['GET'])
def get_loan_info():
    """Get loan information"""
    return jsonify({
        "success": True,
        "data": {
            "title": "Applying for a New Loan",
            "description": "You can apply for a new loan through our mobile app, by visiting any bank branch, or by calling our dedicated loan department at 1800-200-5000. You will need a valid ID proof and income documents.",
            "contact": "1800-200-5000"
        }
    })

@app.route('/api/info/branches', methods=['GET'])
def get_branch_info():
    """Get branch location information"""
    return jsonify({
        "success": True,
        "data": {
            "title": "Bank Locations",
            "branches": [
                {"name": "City Center Branch", "location": "City Center"},
                {"name": "North End Branch", "location": "North End"},
                {"name": "7th Ave Branch", "location": "7th Ave"}
            ],
            "note": "Please visit our official website for a complete, up-to-date list of all locations."
        }
    })

@app.route('/api/info/contact', methods=['GET'])
def get_contact_info():
    """Get customer care contact information"""
    return jsonify({
        "success": True,
        "data": {
            "title": "Customer Care Details",
            "customer_care": "1800-111-222",
            "fraud_reporting": "1800-444-999",
            "description": "Our 24/7 customer care number is available for all your queries. For fraud reporting, please call our dedicated fraud line immediately."
        }
    })

# ----------------------------------------------------------------------
# --- 5. MAIN APPLICATION ---
# ----------------------------------------------------------------------

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🚀 Bank Assistant API Server Starting...")
    print("=" * 60)
    print(f"LLM Available: {'✅ Yes' if LLM_AVAILABLE else '❌ No'}")
    print("=" * 60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)


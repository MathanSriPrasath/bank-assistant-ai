# Banking Bot Persona & Boundaries

## Overview

Cardy AI is configured as a **strict banking assistant** that only handles banking-related queries. This document explains the bot's persona, boundaries, and how it handles different types of queries.

## Bot Persona

**Name:** Cardy AI  
**Role:** Professional Banking Assistant  
**Scope:** Banking and Financial Services ONLY

## What the Bot CAN Do ✅

The bot is designed to assist with:

### 1. **Account Services**
- Check account balances
- View account details
- Account type information
- Account management queries

### 2. **Loan Services**
- Loan status inquiries
- Loan application information
- Loan payment details
- New loan applications

### 3. **Transaction Services**
- Transaction history
- Payment queries
- Transfer information
- Transaction support

### 4. **Branch & Location Services**
- Find branch locations
- Branch operating hours
- ATM locations
- Branch services

### 5. **Customer Support**
- Banking product information
- Card services (credit/debit)
- Account security
- General banking support

### 6. **Financial Services**
- Savings account information
- Fixed deposits
- Investment products (bank-related)
- Insurance products (bank-offered)

## What the Bot CANNOT Do ❌

The bot will **politely decline** to help with:

### Non-Banking Topics
- ❌ Shopping recommendations
- ❌ Cooking recipes
- ❌ Travel planning
- ❌ Entertainment suggestions
- ❌ General knowledge questions
- ❌ Weather information
- ❌ Sports updates
- ❌ Health advice
- ❌ Educational content (non-banking)
- ❌ General ChatGPT-style queries

## Response Examples

### ✅ **Banking Query (Accepted)**

**User:** "What's my current loan status?"

**Bot:** "Hi John! Based on your account, you currently have a Personal Loan that is scheduled to end on 2025-12-31. Your account is in good standing. Is there anything specific you'd like to know about your loan?"

---

**User:** "How do I apply for a new credit card?"

**Bot:** "I'd be happy to help you with credit card applications! You can apply through our mobile app, visit any branch, or call our dedicated card services at 1800-200-5000. Would you like information about our available credit card options?"

---

### ❌ **Non-Banking Query (Declined)**

**User:** "Can you recommend a good restaurant?"

**Bot:** "I apologize, but I'm a banking assistant and can only help with banking-related queries such as account information, loans, transactions, branch locations, and other financial services. Is there anything banking-related I can assist you with today?"

---

**User:** "What's the weather like today?"

**Bot:** "I apologize, but I'm a banking assistant and can only help with banking-related queries such as account information, loans, transactions, branch locations, and other financial services. Is there anything banking-related I can assist you with today?"

---

**User:** "Tell me a joke"

**Bot:** "I apologize, but I'm a banking assistant and can only help with banking-related queries such as account information, loans, transactions, branch locations, and other financial services. Is there anything banking-related I can assist you with today?"

---

**User:** "Help me with my homework"

**Bot:** "I apologize, but I'm a banking assistant and can only help with banking-related queries such as account information, loans, transactions, branch locations, and other financial services. Is there anything banking-related I can assist you with today?"

## Technical Implementation

### Backend (service/app.py)

The bot's boundaries are enforced through a strict system instruction in the `get_general_llm_response()` function:

```python
system_instruction = """You are Cardy AI, a professional banking assistant for a bank. 
Your role is STRICTLY limited to banking services and financial assistance.

**Your Capabilities:**
- Account inquiries and management
- Loan information and applications
- Branch locations and services
- Transaction queries
- Credit/debit card services
- Banking products and services
- Financial advice related to banking
- Customer support for banking issues

**Important Rules:**
1. ONLY answer banking and financial service related questions
2. If asked about ANYTHING outside banking, politely decline and redirect
3. Be professional, courteous, and helpful for all banking queries
4. Never pretend to help with non-banking tasks
5. Always stay within your banking assistant role
"""
```

### Frontend Updates

1. **Login Screen:** Emphasizes "Banking Assistant"
2. **Welcome Message:** Clearly states banking-only services
3. **Chat Placeholder:** Mentions "banking services"
4. **Empty State:** Shows banking capabilities
5. **Post-Login Message:** Lists banking services available

## User Experience Flow

### 1. Login
- User sees "Your Banking Assistant" tagline
- Features emphasize banking security and services

### 2. Welcome Message
After login, user receives:
```
Welcome back, [Name]! 🏦

I'm your banking assistant. I can help you with:
• Account information and balances
• Loan inquiries and applications
• Branch locations and services
• Transaction queries
• Banking support

How can I assist you with your banking needs today?
```

### 3. Interaction
- Banking queries: Answered with personalized information
- Non-banking queries: Politely declined with redirect

### 4. Quick Actions
All quick action buttons are banking-focused:
- 💳 Check Account Details
- 💰 Apply for Loan
- 🏦 Find Branch
- 📞 Contact Support

## Benefits of Strict Banking Boundaries

### 1. **Professional Image**
- Maintains bank's professional reputation
- Prevents inappropriate responses
- Ensures consistent brand voice

### 2. **Security**
- Prevents social engineering attempts
- Keeps conversations within secure domain
- Reduces risk of data leakage

### 3. **Resource Efficiency**
- Focuses AI resources on banking queries
- Reduces unnecessary API calls
- Better performance for banking tasks

### 4. **User Clarity**
- Users know exactly what to expect
- Clear communication of capabilities
- Better user experience through focused service

### 5. **Compliance**
- Easier to audit conversations
- Maintains regulatory compliance
- Clear scope for legal purposes

## Customization for Other Use Cases

If you want to make this a **general-purpose chatbot** instead:

### Option 1: Remove Banking Restrictions

In `service/app.py`, change the system instruction to:

```python
system_instruction = """You are a helpful AI assistant. 
You can help with a wide range of topics including but not limited to:
- General knowledge
- Shopping recommendations
- Entertainment
- Banking (when user is logged in)
- And much more!

Be helpful, friendly, and provide accurate information on any topic the user asks about.
"""
```

### Option 2: Hybrid Approach

```python
system_instruction = """You are a versatile AI assistant with banking expertise.

**Primary Focus:** Banking and financial services
**Secondary:** General assistance when banking context not applicable

If the user asks banking questions, prioritize accurate banking information.
For non-banking queries, you may assist but always remind them of your banking capabilities.
"""
```

## Testing the Banking Boundaries

### Test Cases

**Banking Queries (Should Work):**
1. "What's my account balance?"
2. "How do I apply for a loan?"
3. "Where is the nearest branch?"
4. "What are my recent transactions?"
5. "Tell me about savings accounts"

**Non-Banking Queries (Should Decline):**
1. "What's the best pizza place nearby?"
2. "Can you help me write code?"
3. "What's the capital of France?"
4. "Recommend a movie to watch"
5. "How do I bake a cake?"

**Edge Cases (Should Handle Gracefully):**
1. "Can you help me budget?" (Financial advice - should help)
2. "What's your name?" (About the bot - should answer)
3. "How can you help me?" (Capabilities - should list banking services)

## Monitoring & Improvement

### Track These Metrics:
1. Number of banking queries vs non-banking attempts
2. User satisfaction with banking responses
3. Common non-banking queries (for documentation)
4. Response accuracy for banking topics

### Regular Reviews:
- Review declined queries to ensure appropriate boundaries
- Update banking capabilities as services expand
- Refine decline messages based on user feedback
- Add new banking topics as needed

## Conclusion

Cardy AI is purpose-built as a **banking-only assistant** that provides professional, secure, and focused banking support. The strict boundaries ensure:
- Professional banking experience
- Security and compliance
- Clear user expectations
- Efficient resource utilization

Users attempting non-banking queries receive polite redirects, maintaining the professional banking image while keeping the conversation on-topic.

---

**For Support:** If you need to modify the bot's behavior, edit the system instruction in `service/app.py` line 144.


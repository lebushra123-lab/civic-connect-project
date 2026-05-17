<<<<<<< HEAD
# CivicConnect 🏙️

CivicConnect is a modern civic engagement platform designed to bridge the gap between citizens and municipal authorities. It allows citizens to report civic issues (potholes, water leaks, etc.), track their progress in real-time, and enables city staff to manage and resolve these issues efficiently.

## 🚀 Project Overview

The platform consists of:

- **Citizen Portals**: Report issues, track status, and manage profile.
- **Admin Dashboard**: Comprehensive oversight of users, staff, and complaints.
- **Staff Portals (Supervisors, Heads, field Workers)**: Department-specific workflows for resolving reported issues.

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI (MUI), Zustand, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT (JSON Web Tokens), Bcryptjs

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a cloud URI)

## 🔧 Installation & Setup

## 👥 Contributors

This project was originally built to improve civic engagement and municipal efficiency.
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### 1. Clone the repository
```bash
git clone <repository-url>
cd CIVICCONNECT-main
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/civicconnect
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the root directory (where `package.json` for frontend is):
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## 🚪 Access Portals

- **Citizen View**: `http://localhost:3000/`
- **Citizen Login**: `http://localhost:3000/login`
etc



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).


=======
# Civic Complaints Backend

This is a minimal backend for the Civic Complaints project.

Features
- Express API
- MongoDB persistence via Mongoose
- JWT authentication
- Auth routes: /auth/register, /auth/login
- Complaints CRUD: /complaints (protected for write operations)

Setup

1. Configure environment

Copy `backend/.env.example` to `.env` and update values, or set env vars directly:

```
MONGO_URI=mongodb://127.0.0.1:27017/civic-complaints
JWT_SECRET=your-very-secret
PORT=4000
```

2. Install dependencies

```powershell
cd backend
npm install
```

3. Run in development (nodemon)

```powershell
npm run dev
```

By default the server listens on port 4000.

Health
- GET /status returns MongoDB connection ready state (1 = connected).

Example requests

Register:

```bash
curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com","password":"password"}'
```

Login:

```bash
curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"alice@example.com","password":"password"}'
```

Create complaint (requires Authorization header with Bearer token):

```bash
curl -X POST http://localhost:4000/complaints -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"title":"Pothole","description":"Big pothole on Main St","location":"Main St","reporter":"alice"}'
```

List complaints (public):

```bash
curl http://localhost:4000/complaints
```

Notes
- This backend is intended for development/demo purposes. For production, secure secrets, enable proper validation, and use a hosted MongoDB (Atlas) or managed database.

AI / Chatbot
You can enable the server-side AI proxy used by the frontend Chatbot by setting these environment variables in `backend/.env`:

```
GEMINI_API_URL=https://example.com/v1/generate
GEMINI_API_KEY=your_api_key_here
```

The frontend will POST the user's message to `/ai/chat`, the backend will forward it to the configured GEMINI API URL using the API key, and will return a textual reply. Keep your API key server-side — do not expose it in the frontend.
>>>>>>> 9c80a896970d7cc90e951919bff5f3d61c142d58

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



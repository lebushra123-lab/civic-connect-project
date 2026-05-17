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

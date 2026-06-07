# JWT Authentication System

This is a full-stack authentication system that demonstrates user registration, login, JWT token generation, bcrypt password hashing, protected backend routes, and React authentication state management.

## How It Works

### Registration Flow

1. A user enters an email and password in the React registration form.
2. The frontend sends the data to `POST /api/auth/register`.
3. The backend checks whether the email already exists.
4. If the email is new, the backend hashes the password with bcrypt.
5. The hashed password is saved in MongoDB. The plain-text password is never stored.

### Login Flow

1. A user enters an email and password in the login form.
2. The frontend sends the data to `POST /api/auth/login`.
3. The backend finds the user by email.
4. bcrypt compares the entered password with the stored hash.
5. If the password is correct, the backend creates a JWT that expires in 24 hours.
6. The frontend stores the JWT in `localStorage` so login persists after refresh.

### Protected Route Flow

1. The dashboard sends a request to `GET /api/protected`.
2. The JWT is sent in the `Authorization` header as a Bearer token.
3. The JWT middleware verifies the token using `JWT_SECRET`.
4. If the token is valid and unexpired, the backend returns protected data.
5. If the token is missing or invalid, the backend returns `401 Unauthorized`.

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcryptjs

### Frontend

- React
- Vite
- CSS

## Features

- User registration with bcrypt password hashing
- Login with JWT generation
- Token stored in `localStorage`
- Protected API route with JWT middleware
- Persistent login on page refresh
- Logout functionality

## Local Setup

### Backend

1. Open a terminal in the backend folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Create `backend/.env` with these values:

   ```bash
   MONGODB_URI=mongodb+srv://imrama_db_user:REPLACE_WITH_YOUR_PASSWORD@cluster0.yosap9t.mongodb.net/authsystem?appName=Cluster0
   JWT_SECRET=replace-with-a-long-random-secret
   PORT=5002
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

The backend runs at `http://localhost:5002`.

### Frontend

1. Open a second terminal in the frontend folder:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Create `frontend/.env.local` with this value:

   ```bash
   VITE_API_URL=http://localhost:5002
   ```

4. Start the frontend:

   ```bash
   npm run dev
   ```

The frontend runs at `http://localhost:5173`.

## Security Notes

- Passwords are never stored in plain text.
- bcrypt hashes passwords before they are saved to MongoDB.
- Protected routes require a valid, unexpired JWT.
- Environment variables are ignored by Git so secrets are not committed.

## Live Demo

- Frontend: To be added after GitHub Pages deployment.
- Backend: To be added after Render deployment.

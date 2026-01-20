# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

VedaVerse is a full-stack MERN application for managing Hindu temples, bhaktas (devotees), leelas (divine stories), and community discussions. The project uses a monorepo structure with separate frontend and backend directories.

## Development Commands

### Backend (Node.js/Express)
```bash
# From backend/ directory
npm start          # Run production server (node src/server.js)
npm run dev        # Run with hot reload (nodemon)
```

### Frontend (React + Vite)
```bash
# From frontend/ directory
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Architecture

### Backend Architecture

**Entry Point Flow:**
- `src/server.js` - Basic server setup (currently minimal, uses basic Express server)
- `src/app.js` - Full application configuration with middleware, routes, and error handling (appears to be the more complete version)

**Directory Structure:**
- `models/` - Mongoose schemas: User, Temple, Bhakta, Leela, Discussion (CommunityPost)
- `controllers/` - Business logic handlers (authController, templeController, bhaktaController, leelaController, communityController)
- `routes/` - Express route definitions (authRoutes, templeRoutes, bhaktaRoutes, leelaRoutes, communityRoutes)
- `middlewares/` - Request processing:
  - `authMiddleware.js` - JWT authentication (`protect`, `restrictTo`)
  - `catchAsync.js` - Async error wrapper for controllers
  - `globalErrorHandler.js` - Centralized error handling
  - `validateMiddleware.js` - Input validation
  - `multer.js` - File upload handling
- `utils/` - Helper utilities:
  - `apiError.js` & `apiResponse.js` - Standardized response classes
  - `cloudinary.js` & `cloudinaryHelper.js` - Image upload to Cloudinary
  - `email.js` - Email sending (nodemailer)
  - `seedTemple.js` - Data seeding
- `config/db.js` - MongoDB connection setup

**Authentication System:**
- JWT-based dual-token system (access + refresh tokens)
- Access tokens sent via Authorization header
- Refresh tokens stored in httpOnly cookies
- Token refresh flow: Frontend intercepts 401 → calls `/auth/refresh-token` → retries request
- Refresh tokens stored in User model and validated against DB on refresh

**API Routes Structure:**
```
/api/auth/*        - Authentication (register, login, logout, refresh-token, me, forgot-password, reset-password)
/api/temples/*     - Temple management
/api/bhaktas/*     - Bhakta (devotee) management
/api/community/*   - Community posts (likes, comments)
```

**Error Handling Pattern:**
All controllers wrapped with `catchAsync()` middleware. Errors thrown as `ApiError(statusCode, message)`, caught by `globalErrorHandler`. All responses use `ApiResponse(statusCode, message, data)` for consistency.

### Frontend Architecture

**State Management:**
- Redux Toolkit with `@reduxjs/toolkit`
- Store configured in `app/store.js`
- Features organized in `features/` directory (currently only `auth`)

**Authentication Flow:**
1. User submits login/register form
2. Component dispatches `loginUser` or `registerUser` thunk (from `authSlice.js`)
3. Thunk calls API function from `authApi.js`
4. API uses axios instance from `utils/axios.js` (base URL: `http://localhost:5000/api`)
5. Success: Store access token + user in Redux state
6. Failed 401: Axios interceptor auto-refreshes token from `services/axiosInstance.js`

**Routing:**
- React Router v7 configured in `routes/AppRoutes.jsx`
- Protected routes wrapped with `ProtectedRoute` component
- Current routes: `/login`, `/register`, `/` (protected Home)

**Axios Configuration:**
Two axios instances exist:
1. `utils/axios.js` - Basic instance with token injection
2. `services/axiosInstance.js` - Advanced instance with token refresh logic

**Styling:**
- Tailwind CSS v4 with Vite plugin
- Configuration in `index.css` and `App.css`

## Key Patterns

### Backend Request/Response Pattern
```javascript
export const controllerName = catchAsync(async (req, res) => {
  // Business logic
  if (error) {
    throw new ApiError(400, "Error message");
  }
  
  return res.status(200).json(
    new ApiResponse(200, "Success message", data)
  );
});
```

### Frontend Redux Async Pattern
```javascript
// 1. Create API function in features/[feature]/[feature]Api.js
export const apiFunction = async (data) => {
  const response = await api.post('/endpoint', data);
  return response.data;
};

// 2. Create thunk in features/[feature]/[feature]Slice.js
export const thunkName = createAsyncThunk(
  'feature/thunkName',
  async (data, { rejectWithValue }) => {
    try {
      return await apiFunction(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 3. Handle in extraReducers with pending/fulfilled/rejected cases
```

### Protected Route Pattern
Routes requiring authentication should be nested under `<ProtectedRoute />` component in `AppRoutes.jsx`.

## Environment Variables

### Backend (.env)
```
PORT=5000 (or 8000)
MONGO_URI=<mongodb connection string>
DATABASE_NAME=<database name>
ACCESS_TOKEN_SECRET=<secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=<secret>
REFRESH_TOKEN_EXPIRY=7d
NODE_ENV=development/production
CLOUDINARY_CLOUD_NAME=<cloudinary cloud name>
CLOUDINARY_API_KEY=<cloudinary api key>
CLOUDINARY_API_SECRET=<cloudinary api secret>
EMAIL_HOST=<smtp host>
EMAIL_PORT=<smtp port>
EMAIL_USER=<email user>
EMAIL_PASSWORD=<email password>
```

### Frontend (.env)
API base URL is hardcoded in axios instances as `http://localhost:5000/api` - modify directly in:
- `frontend/src/utils/axios.js`
- `frontend/src/services/axiosInstance.js`

## Important Notes

### Server Entry Point
There are two server files:
- `backend/src/server.js` - Minimal setup (current entry point per package.json)
- `backend/src/app.js` - Full app with routes and middleware (should be imported into server.js)

The `server.js` currently runs a basic Express server. Full functionality requires integrating `app.js`.

### CORS Configuration
Backend CORS set to `origin: true` (allows all origins) with `credentials: true`. Frontend configured to send credentials with `withCredentials: true` in axios.

### Cookie Configuration
Refresh token cookies use different settings based on `NODE_ENV`:
- Development: `secure: false`, `sameSite: "lax"`
- Production: `secure: true`, `sameSite: "strict"`
- Cookie path: `/api/auth` (restricts cookie to auth routes only)

### Mongoose Configuration
Database connection concatenates `MONGO_URI` + `DATABASE_NAME`. Ensure `MONGO_URI` does NOT include trailing slash or database name.

### User Model
- Passwords auto-hashed on save via Mongoose pre-save hook
- Password field excluded from queries by default (`select: false`)
- Contains methods: `comparePass()`, `generateAccessToken()`, `generateRefreshToken()`, `createPasswordResetToken()`

### Image Upload
Images uploaded to Cloudinary. Multer middleware handles multipart form data, URLs stored as strings in model arrays (e.g., `Temple.images[]`).

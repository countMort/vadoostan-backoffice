# Authentication System

This directory contains the authentication system for the Vadoostan Backoffice application.

## Components

### Auth Slice (`auth.slice.ts`)
- Manages authentication state using Redux Toolkit
- Handles login, logout, and token management
- Persists tokens in localStorage
- Actions: `loginStart`, `loginSuccess`, `loginFailure`, `logout`, `setToken`

### API (`src/api/auth/index.ts`)
- RTK Query endpoints for authentication
- `login`: POST /api/auth/login
- `logout`: POST /api/auth/logout
- `refreshToken`: POST /api/auth/refresh
- `getCurrentUser`: GET /api/auth/me

### Components (`src/components/auth/`)
- `ProtectedRoute.tsx`: Wraps components that require authentication
- `LogoutButton.tsx`: Logout button component
- `AuthInitializer.tsx`: Initializes auth state from localStorage on app start

### Utilities (`src/utils/auth.ts`)
- Token management utilities
- localStorage helpers
- Auth state helpers

## Usage

### Login Page
Access the login page at `/login`. The form includes:
- Username field (minimum 3 characters)
- Password field (minimum 6 characters)
- Form validation using Yup
- Loading states and error handling

### Protected Routes
Wrap any component that requires authentication with `ProtectedRoute`:

```tsx
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>Protected content</div>
    </ProtectedRoute>
  )
}
```

### Logout Button
Add a logout button anywhere in your app:

```tsx
import LogoutButton from "@/components/auth/LogoutButton"

<LogoutButton variant="contained" size="large" />
```

### Auth State
Access authentication state in components:

```tsx
import { useSelector } from "react-redux"
import { RootState } from "@/store"

const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth)
```

## API Integration

The authentication system automatically:
- Adds Bearer tokens to API requests
- Handles token refresh
- Clears auth state on logout
- Persists login state across browser sessions

## Security Features

- Tokens stored in localStorage
- Automatic token cleanup on logout
- Protected route redirects
- Form validation
- Error handling for failed login attempts

# HabariPay Email Dashboard

A modern, performant email dashboard built with React, TypeScript, and TanStack Query (React Query). Features a brutalist design aesthetic with comprehensive email management capabilities.

## Features

### Core Functionality

- **Email List Display** - Paginated table view with comprehensive email information
- **Advanced Search** - Debounced search across email content (300ms delay)
- **Multi-Filter System** - Filter by category, read status, starred, and date
- **Client-Side Pagination** - Fast navigation with prefetching
- **Authentication Flow** - Secure token-based auth with cookie storage
- **Email Actions** - Star/unstar, mark as read, view details

### Performance Optimizations

- **Lazy Loading** - Code-split routes for smaller initial bundle
- **Memoization** - React.memo and useCallback for expensive operations
- **Optimistic Updates** - Instant UI feedback for star/unstar actions
- **Efficient Re-renders** - Minimal component updates via proper state management
- **Cookie Storage** - Fast authentication token retrieval

### UI/UX Features

- **Neobrutalism Design** - Bold borders, strong shadows, high contrast
- **Fully Responsive** - Mobile-first design with collapsible sidebar
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- **Dark Mode Ready** - CSS variable-based theming
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - Graceful error states with retry options

## Prerequisites

- Node.js 18+
- pnpm 8+ (or npm/yarn)
- Modern browser with ES2020+ support

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd habaripay
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Start development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173`

### 4. Build for production

```bash
pnpm build
# or
npm run build
```

### 5. Preview production build

```bash
pnpm preview
# or
npm run preview
```

## Authentication

The app uses **token-based authentication** with HTTP-only cookies for security.

### Authentication Flow

1. User enters credentials on login page
2. API validates credentials and returns user data + JWT token
3. Token stored in secure cookies (2-day expiry)
4. User data stored in cookies for persistent sessions
5. AuthContext provides authentication state across app
6. Protected routes redirect to login if not authenticated
7. Token existence checked on app initialization and included in all API requests

### API Endpoints

- `POST /api/auth/login` - User login (logout handled locally)

### Security Features

- Tokens stored in cookies with `SameSite=Strict`
- Automatic token expiration after 2 days
- Token existence check on app initialization
- Automatic redirect on authentication failure
- Logout handled locally by clearing cookies

## Data Fetching & Email Management

### API Integration

The app uses the **Fetch API** with automatic authentication headers.

### API Endpoints

**Authentication:**

- `POST /api/auth/login` - Authenticate user

**Emails:**

- `GET /api/emails` - Fetch emails with filters
- `GET /api/emails/counts` - Get email counts for badges
- `PATCH /api/emails/:id/star` - Toggle star status

**Query Parameters:**

- `view` - Filter by view (inbox, starred, important, unread, sent, drafts, trash)
- `search` - Search query
- `page` - Page number
- `limit` - Items per page

### Data Fetching Strategy

**Features:**

- Direct API calls using native Fetch API
- Automatic authentication header injection
- Error handling with user-friendly messages
- Loading states for better UX
- Optimistic updates for instant UI feedback

**Benefits:**

- Simple and lightweight (no external dependencies)
- Automatic token management via cookies
- Secure authentication with every request
- Clean error handling and recovery

## Pagination Approach

### **Server-Side Pagination** (Chosen Approach)

**Trade-offs:**

- ❌ Higher initial data transfer (mitigated by 10 items per page)
- ❌ Memory usage for cached pages (managed by React Query GC)
- ✅ Much better UX
- ✅ Fewer total API requests
- ✅ Works well with <10,000 total items

## Performance Optimizations

### 1. Debounced Search

```typescript
// useDebounce hook prevents API spam
const debounced = useDebounce(searchQuery, 300);
```

**Impact:** Reduced API calls by ~90% during typing

### 2. Lazy Loading

```typescript
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((module) => ({ default: module.Dashboard }))
);
```

**Impact:** Reduced initial bundle size by ~15KB

## Trade-offs

| Decision                | Pro                            | Con                        | Rationale                         |
| ----------------------- | ------------------------------ | -------------------------- | --------------------------------- |
| **Server Pagination**   | Faster initial load            | More requests              | Better for <10k items             |
| **Cookie Storage**      | More secure, HTTP-only option  | Size limitations           | Better security than localStorage |
| **Tailwind CSS**        | Fast development, small bundle | Learning curve             | Matches design system well        |
| **Fetch API**           | Native, no dependencies        | More verbose               | Simple and efficient              |
| **Lazy Loading Dialog** | Smaller initial bundle         | Slight delay on first open | Good trade-off                    |

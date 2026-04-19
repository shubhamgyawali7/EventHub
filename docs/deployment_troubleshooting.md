# Troubleshooting: Vercel 404 and Unexpected Logout/Redirect

Based on the analysis of your codebase and the issues described, here are the primary reasons you are encountering a 404 error on Vercel and why you are being redirected to the login page even when you should be logged in.

## 1. SPA Routing (The Vercel 404 Error)
**Problem:** In a React/Vite Single Page Application (SPA), routing is handled on the client side. When you navigate to `/login` or `/club/dashboard`, React Router handles it. However, if you refresh the page or are redirected to these routes, Vercel tries to find a physical file named `login` or `dashboard` on the server, which doesn't exist, leading to a 404.

**Solution:** You need to tell Vercel to redirect all requests to `index.html` so that React Router can take over. Create a `vercel.json` file in your **client root directory** (next to `package.json`) with the following content:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 2. API URL Configuration (The "Redirect to Login" Issue)
**Problem:** Your `client/.env` file currently points to `http://localhost:5000`:
```env
VITE_BASE_API_URL = http://localhost:5000
```
When you deploy to Vercel, the browser tries to connect to `localhost:5000` on the visitor's computer, which fails. When this happens:
1. The `fetchMe` action in Redux fails because the server is unreachable.
2. The `authSlice` handles the failure by setting `user` to `null`.
3. Your `ProtectedRoute` sees that `user` is `null` and redirects you to `/login`.

**Solution:** Update your environment variables on Vercel to point to your **Render backend URL**.

```env
VITE_BASE_API_URL = https://your-server-name.onrender.com
```

---

## 3. Protected Route Race Condition
**Problem:** Your `ProtectedRoute.jsx` redirects to `/login` immediately if `user` is not found, but it doesn't check if the application is still `loading` the authentication state.

```javascript
// Current ProtectedRoute.jsx logic
if (!user) {
  return <Navigate to="/login" />;
}
```

If a user refreshes the page, there is a split second where `user` is null while Redux is re-hydrating.

**Solution:** Update `ProtectedRoute.jsx` to check the `loading` state from Redux:

```javascript
const { user, loading } = useSelector((state) => state.auth);

if (loading) {
  return <div className="loading-spinner">Loading...</div>; 
}

if (!user) {
  return <Navigate to="/login" />;
}
```

---

## 4. Cross-Origin (CORS) Configuration
**Problem:** Since your frontend (Vercel) and backend (Render) are on different domains, ensure your backend allows the Vercel domain in its CORS settings.

**Solution:** In your backend `server/index.js` or wherever you configure CORS:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

---

### Summary of Actions
1. **Create `client/vercel.json`** with the rewrite rules.
2. **Update Vercel Environment Variables** with the actual Render API URL.
3. **Update `ProtectedRoute.jsx`** to handle the `loading` state from Redux.

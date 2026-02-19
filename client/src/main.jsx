// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // import provider
import "./index.css";
import { AdminProvider } from "./context/AdminContext";
import { EventProvider } from "./context/EventContext";
import { OrganizationProvider } from "./context/OrganizationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>
          <EventProvider>
            <OrganizationProvider>
              <App />
            </OrganizationProvider>
          </EventProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import Store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Provider store={Store}>
        <App />

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              background: "var(--card)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              borderRadius: "0.75rem",
              fontSize: "14px",
              fontWeight: 500,
              padding: "12px 16px",
              boxShadow: "0 4px 24px color-mix(in srgb, var(--foreground) 8%, transparent)",
            },
            success: {
              iconTheme: {
                primary: "var(--primary)",
                secondary: "var(--primary-foreground)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--destructive)",
                secondary: "var(--destructive-foreground)",
              },
            },
          }}
        />
      </Provider>
    </GoogleOAuthProvider>
  </>
);

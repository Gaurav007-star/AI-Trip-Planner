import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ToastContainer, Zoom } from "react-toastify";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <App />

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition={Zoom}
      />
    </GoogleOAuthProvider>
  </>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Vite dùng import.meta.env để đọc file .env
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    {/* Nếu có Client ID thì bọc App lại, nếu không thì báo lỗi nhẹ để team biết */}
    {GOOGLE_CLIENT_ID ? (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    ) : (
      <div className="flex items-center justify-center h-screen font-bold text-red-500 bg-slate-50">
        ⚠️ Vui lòng thêm VITE_GOOGLE_CLIENT_ID vào file .env.development!
      </div>
    )}
  </StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./provider/authProvider.tsx";
import BasketProvider from "./provider/basketProvider.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BasketProvider>
        <App />
      </BasketProvider>
    </AuthProvider>
  </React.StrictMode>
);

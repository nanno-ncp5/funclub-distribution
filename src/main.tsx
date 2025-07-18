import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StaffProvider } from "./StaffContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StaffProvider>
      <App />
    </StaffProvider>
  </React.StrictMode>
);

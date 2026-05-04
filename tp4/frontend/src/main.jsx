import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NotasProvider } from "./context/NotasContext.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotasProvider>
      <App />
    </NotasProvider>
  </React.StrictMode>,
);

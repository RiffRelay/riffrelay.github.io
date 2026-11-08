import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/google-sans";
import "@language-lit/material3-expressive/styles.css";
import "./styles/tokens.css";
import "./styles/motion.css";
import "./styles/site.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

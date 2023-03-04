import React from "react";
import ReactDOM from "react-dom/client";
import ChatApp from "./App";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>
);

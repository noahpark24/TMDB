import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import LogContextProvider from "./contexts/LogContext";
import FavoritesContextProvider from "./contexts/FavoritesContext";

ReactDOM.render(
  <React.StrictMode>
    <FavoritesContextProvider>
      <LogContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LogContextProvider>
    </FavoritesContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

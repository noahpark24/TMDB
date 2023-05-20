import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
// import LogContextProvider from "./contexts/LogContext";
// import FavoritesContextProvider from "./contexts/FavoritesContext";
import { Provider } from "react-redux";
import store from "./state/store";

ReactDOM.render(
  <React.StrictMode>
    {/* <FavoritesContextProvider> */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </FavoritesContextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
//wrap in braces dont want default export but the actual function 
import { FavoritesContextProvider } from './store/favorites-context'

ReactDOM.render(
  <FavoritesContextProvider> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </FavoritesContextProvider>,
  document.getElementById("root")
);
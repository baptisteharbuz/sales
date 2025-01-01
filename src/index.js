// src/index.js
// -------------------------------------
// Point d'entrée principal. Rend App.js
// enrobé du Provider_context.js
// -------------------------------------

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./Context/Provider_context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <App />
  </Provider>
);
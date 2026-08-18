import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { initialCities } from "./data";

import "./index.css";

function Root() {
  const [cities, setCities] = useState(initialCities);

  return (
    <BrowserRouter>
      <App
        cities={cities}
        setCities={setCities}
      />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
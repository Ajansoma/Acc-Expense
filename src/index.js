import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import OrderProvider from "./Store/order-context";
import AuthProvider from "./Store/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <OrderProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </OrderProvider>
);

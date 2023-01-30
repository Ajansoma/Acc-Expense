import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Menu from "./components/Homepage/Menu";
import OrderProvider from "./order-context/order-context";
import Header from "./components/Homepage/Revenue/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <OrderProvider>
    <BrowserRouter>
      <div>
        <div className="menu">
          <Menu />
        </div>
        <Header />
        <App />
        {/* <div className="overlay"></div> */}
      </div>
    </BrowserRouter>
  </OrderProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppTest from "./Test.js";
import DetailRequest from "./components/Display/DetailRequestBorrow.js";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import "nprogress/nprogress.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    // <App />
    <DetailRequest />
    // </React.StrictMode>
);

reportWebVitals();

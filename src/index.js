import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.js";
import AppTest from "./Test.js";
import DetailRequest from "./components/Display/DetailRequestBorrow.js";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import Header from "./Test.js";
import "nprogress/nprogress.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Layout />
    </BrowserRouter>

    // <DetailRequest />
    // <SignUp />
    // </React.StrictMode>
);

reportWebVitals();

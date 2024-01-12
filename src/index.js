import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.js";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import Test from "./Test.js";
import "nprogress/nprogress.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Layout />
        {/* <Test /> */}
    </BrowserRouter>

    // <DetailRequest />
    // <SignUp />
    // </React.StrictMode>
);

reportWebVitals();

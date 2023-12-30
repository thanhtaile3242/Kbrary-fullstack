import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.js";
import MainSignUp from "./components/Auth/SignUp/MainSignUp.js";
import MainSignIn from "./components/Auth/SignIn/MainSignIn.js";
import MainForget from "./components/Auth/ForgetPassword/MainForget.js";
import { ToastContainer, toast } from "react-toastify";
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="signup" element={<MainSignUp />} />
                <Route path="signin" element={<MainSignIn />} />
                <Route path="forgetpassword" element={<MainForget />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};
export default Layout;
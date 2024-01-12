import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.js";
import MainSignUp from "./components/Auth/SignUp/MainSignUp.js";
import MainSignIn from "./components/Auth/SignIn/MainSignIn.js";
import MainForget from "./components/Auth/ForgetPassword/MainForget.js";
import { ToastContainer, toast } from "react-toastify";
import HomePage from "./pages/HomePage/HomePage.js";
import Admin from "./pages/AdminRole/AdminPage.js";
import UserInfo from "./pages/UserRole/UserPage.js";
import BookPageAdmin from "./pages/BookPageAdmin/BookPageAdmin.js";
import BookPageUser from "./pages/BookPageUser/BookPageUser.js";
import DetailPendingRequest from "./pages/UserRole/DetailPendingRequest.js";
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="bookAdmin" element={<BookPageAdmin />} />
                </Route>

                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<UserInfo />} />
                    <Route path="bookUser" element={<BookPageUser />} />
                    <Route
                        path="borrowPending"
                        element={<DetailPendingRequest />}
                    />
                </Route>

                <Route path="signup" element={<MainSignUp />} />
                <Route path="signin" element={<MainSignIn />} />
                <Route path="forgetpassword" element={<MainForget />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2000}
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

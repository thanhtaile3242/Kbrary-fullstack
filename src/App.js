import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./pages/HomePage/HomePage.js";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer/Footer.js";
import { useEffect, useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin.js";
import HeaderUser from "./components/HeaderUser/HeaderUser.js";
function App() {
    //
    const [numberBorrowBook, setNumberBorrowBook] = useState(null);
    //
    const [userInfo, setUserInfo] = useState({
        userId: "",
        email: "",
        username: "",
    });
    const [isLogIn, setIsLogIn] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        const user = localStorage.getItem("user-info-kbrary");
        if (user) {
            setIsLogIn(true);
            setAvatar(JSON.parse(user).avatarName);
            setRole(JSON.parse(user).role);
            setUserInfo({
                userId: JSON.parse(user).id,
                email: JSON.parse(user).email,
                username: JSON.parse(user).username,
            });
        }
    }, []);

    return (
        <>
            <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
                {role === "ADMIN" ? (
                    <HeaderAdmin
                        isLogIn={isLogIn}
                        setIsLogIn={setIsLogIn}
                        avatar={avatar}
                        role={role}
                    />
                ) : (
                    <HeaderUser
                        numberBorrowBook={numberBorrowBook}
                        isLogIn={isLogIn}
                        setIsLogIn={setIsLogIn}
                        avatar={avatar}
                        role={role}
                    />
                )}
            </div>
            <div
                className="main-container"
                style={{
                    minHeight: "calc(100vh - 120px)",
                    backgroundColor: "#f5f5fa",
                }}
            >
                <Outlet
                    context={[
                        avatar,
                        setAvatar,
                        role,
                        setNumberBorrowBook,
                        userInfo,
                    ]}
                />
            </div>
            <div
                className="footer-container"
                style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                }}
            >
                {/* <Footer /> */}
            </div>
        </>
    );
}

export default App;

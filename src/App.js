import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./pages/HomePage/HomePage.js";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import { useEffect, useState } from "react";
function App() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [role, setRole] = useState("");
    useEffect(() => {
        const user = localStorage.getItem("user-info-kbrary");
        if (user) {
            setIsLogIn(true);
            setAvatar(JSON.parse(user).avatarName);
            setRole(JSON.parse(user).role);
        }
    }, []);

    return (
        <>
            <div style={{ position: "sticky", top: "0", zIndex: "999" }}>
                <Header
                    isLogIn={isLogIn}
                    setIsLogIn={setIsLogIn}
                    avatar={avatar}
                    role={role}
                />
            </div>
            <div className="main-container">
                <Outlet context={[avatar, setAvatar, role]} />
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

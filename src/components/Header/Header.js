import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import "./Header.scss";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FloatButton } from "antd";
const items = [
    {
        label: "Home",
        key: "home",
    },
    {
        label: "",
        key: "",
    },
    {
        label: "",
        key: "",
    },
    {
        label: "Books",
        key: "books",
    },
    {
        label: "",
        key: "",
    },
    {
        label: "",
        key: "",
    },
    {
        label: "Admin",
        key: "admin",
    },
];
const Menu123 = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState("home");
    const onClick = (e) => {
        if (e.key === "home") {
            navigate("/");
        }
        if (e.key === "admin") {
            navigate("/admin");
        }
        if (e.key === "info") {
            navigate("/");
        }
        setCurrent(e.key);
    };
    return (
        <Menu
            onClick={onClick}
            selectedKeys={current}
            mode="horizontal"
            items={items}
        />
    );
};
// export default App;

const Header = (props) => {
    const navigate = useNavigate();
    const [isShowHideUserInfo, setIsShowHideUserInfo] = useState(false);
    const handleSignIn = () => {
        navigate("/signin");
    };
    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <>
            <div className="header-container">
                <div className="logo-container">
                    <img
                        src={Logo}
                        alt=""
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>
                <div className="menu-container">
                    <Menu123 />
                </div>

                {props.isLogIn ? (
                    <div className="auth-container-after">
                        <div className="alert circle">
                            <FloatButton
                                tooltip={<div>custom badge color</div>}
                                badge={{ count: 5, color: "blue" }}
                                className="icon-noti"
                                icon={<IoNotifications />}
                            />
                        </div>
                        <div
                            className="account circle"
                            onClick={() => {
                                setIsShowHideUserInfo(!isShowHideUserInfo);
                            }}
                        >
                            <FaUserAlt />
                            {isShowHideUserInfo && (
                                <ul class="account__list">
                                    <li></li>
                                    <li>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <span>Profile</span>
                                    </li>
                                    <li>
                                        <i class="fa-solid fa-right-to-bracket"></i>
                                        <span
                                            onClick={() => {
                                                localStorage.removeItem(
                                                    "user-info-kbrary"
                                                );
                                                props.setIsLogIn(false);
                                            }}
                                        >
                                            Log out
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="auth-container-before">
                        <span
                            className="sign-up"
                            onClick={() => {
                                handleSignUp();
                            }}
                        >
                            Sign Up
                        </span>
                        <span
                            className="sign-in"
                            onClick={() => {
                                handleSignIn();
                            }}
                        >
                            Sign In
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};
export default Header;

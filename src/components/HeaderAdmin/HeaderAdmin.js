import { useState } from "react";
import Logo from "../../assets/logo.svg";
import "./HeaderAdmin.scss";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Header = (props) => {
    const navigate = useNavigate();
    const [isShowHideUserInfo, setIsShowHideUserInfo] = useState(false);
    const handleSignIn = () => {
        navigate("/signin");
    };
    const handleSignUp = () => {
        navigate("/signup");
    };
    // Select menu
    const [isSelectedHome, setIsSelectedHome] = useState(false);
    const [isSelectedBook, setIsSelectedBook] = useState(false);
    const [isSelectedAdmin, setIsSelectedAdmin] = useState(false);

    const handleSelectHome = (event) => {
        setIsSelectedHome(true);
        setIsSelectedBook(false);
        setIsSelectedAdmin(false);
        navigate("/");
    };
    const handleSelectBook = (event) => {
        setIsSelectedBook(true);
        setIsSelectedHome(false);
        setIsSelectedAdmin(false);
        navigate("/bookAdmin");
    };
    const handleSelectAdmin = (event) => {
        setIsSelectedAdmin(true);
        setIsSelectedBook(false);
        setIsSelectedHome(false);
        navigate("/admin");
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
                    <span
                        className={
                            isSelectedHome ? "item item-selected" : "item"
                        }
                        onClick={() => {
                            handleSelectHome();
                        }}
                    >
                        Home
                    </span>

                    <span
                        className={
                            isSelectedBook ? "item item-selected" : "item"
                        }
                        onClick={() => {
                            handleSelectBook();
                        }}
                    >
                        Books
                    </span>

                    <span
                        className="item"
                        className={
                            isSelectedAdmin ? "item item-selected" : "item"
                        }
                        onClick={() => {
                            handleSelectAdmin();
                        }}
                    >
                        Admin
                    </span>
                </div>
                {props.isLogIn ? (
                    <div className="auth-container-after">
                        <div className="alert circle">
                            {/* <FloatButton
                                tooltip={<div>custom badge color</div>}
                                badge={{ count: 5, color: "blue" }}
                                className="icon-noti"
                                icon={<IoNotifications />}
                            /> */}
                        </div>
                        <div
                            className="account circle"
                            onClick={() => {
                                setIsShowHideUserInfo(!isShowHideUserInfo);
                            }}
                        >
                            {props.avatar ? (
                                <img
                                    style={{ height: "60px", width: "60px" }}
                                    src={`http://localhost:8802/${props.avatar}`}
                                    alt=""
                                />
                            ) : (
                                <FaUserAlt />
                            )}

                            {isShowHideUserInfo && (
                                <ul
                                    class="account__list"
                                    style={{ left: "90px", top: "110%" }}
                                >
                                    <li>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <span>Profile</span>
                                    </li>
                                    <li
                                        onClick={() => {
                                            localStorage.removeItem(
                                                "user-info-kbrary"
                                            );
                                            props.setIsLogIn(false);
                                            navigate("/");
                                        }}
                                    >
                                        <i class="fa-solid fa-right-to-bracket"></i>
                                        <span>Log out</span>
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

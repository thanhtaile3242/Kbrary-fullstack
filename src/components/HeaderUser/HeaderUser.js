import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState, useEffect } from "react";
import Logo from "../../assets/logo.svg";
import "./HeaderUser.scss";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FloatButton } from "antd";
import { FaListCheck } from "react-icons/fa6";

const HeaderUser = (props) => {
    const navigate = useNavigate();
    const [isShowHideUserInfo, setIsShowHideUserInfo] = useState(false);
    // Select menu
    const [isSelectedHome, setIsSelectedHome] = useState(false);
    const [isSelectedBook, setIsSelectedBook] = useState(false);
    const [isSelectedUser, setIsSelectedUser] = useState(false);
    const handleSelectHome = (event) => {
        setIsSelectedHome(true);
        setIsSelectedBook(false);
        setIsSelectedUser(false);
        navigate("/");
    };
    const handleSelectBook = (event) => {
        setIsSelectedBook(true);
        setIsSelectedUser(false);
        setIsSelectedHome(false);
        navigate("/bookUser");
    };
    const handleSelectUser = (event) => {
        setIsSelectedUser(true);
        setIsSelectedBook(false);
        setIsSelectedHome(false);
        navigate("/profile");
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
                            isSelectedUser ? "item item-selected" : "item"
                        }
                        onClick={() => {
                            handleSelectUser();
                        }}
                    >
                        Profile
                    </span>
                </div>
                {props.isLogIn ? (
                    <div
                        className="auth-container-after"
                        style={{ gap: "90px" }}
                    >
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
                                <ul class="account__list">
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

                        <FloatButton
                            tooltip={<div>Detail borrow</div>}
                            badge={{ count: props.numberBorrowBook }}
                            className="icon-noti detail-borrow"
                            icon={<FaListCheck />}
                            onClick={() => {
                                setIsSelectedBook(false);
                                setIsSelectedHome(false);
                                setIsSelectedUser(false);
                                navigate("/borrowPending");
                            }}
                        />
                    </div>
                ) : (
                    <div className="auth-container-before">
                        <span
                            className="sign-up"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Sign Up
                        </span>
                        <span
                            className="sign-in"
                            onClick={() => {
                                navigate("/signin");
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

export default HeaderUser;

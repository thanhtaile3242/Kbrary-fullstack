import { useState } from "react";
import Logo from "../../assets/logo.svg";
import "./HeaderUser.scss";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

import { FloatButton } from "antd";

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
                </div>
                {props.isLogIn ? (
                    <div
                        className="auth-container-after"
                        style={{ gap: "90px" }}
                    >
                        <div className="alert circle"></div>
                        <div className="account circle">
                            {props.avatar ? (
                                <img
                                    style={{ height: "60px", width: "60px" }}
                                    src={`http://localhost:8802/${props.avatar}`}
                                    alt=""
                                    onClick={() => {
                                        setIsShowHideUserInfo(
                                            !isShowHideUserInfo
                                        );
                                    }}
                                />
                            ) : (
                                <FaUserAlt
                                    onClick={() => {
                                        setIsShowHideUserInfo(
                                            !isShowHideUserInfo
                                        );
                                    }}
                                />
                            )}

                            {isShowHideUserInfo && (
                                <ul class="account__list">
                                    <li
                                        onClick={() => {
                                            handleSelectUser();
                                        }}
                                    >
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
                            <FloatButton
                                tooltip={<div>Detail borrow</div>}
                                badge={{ count: props.numberBorrowBook }}
                                className="icon-noti detail-borrow"
                                icon={<FaClipboardList />}
                                onClick={() => {
                                    navigate("/borrowPending");
                                }}
                            />
                        </div>
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

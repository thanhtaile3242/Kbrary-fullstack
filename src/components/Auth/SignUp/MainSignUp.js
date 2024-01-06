import { useState } from "react";
import FormSignUp from "./FormSignUp.js";
import FormSignIn from "../FormSignIn.js";
import FormVerifyEmail from "./VerifyEmail.js";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../MainAuth.scss";
import axios from "../../utils/axiosCustomize.js";
import {
    SolutionOutlined,
    UserOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { toast } from "react-toastify";
import HeaderAuth from "../HeaderAuth.js";
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const MainSignUp = () => {
    const navigate = useNavigate();
    // Steps Component
    const [statusSignUp, setStatusSignUp] = useState(true);
    const [statusSignIn, setStatusSignIn] = useState(false);
    const [statusVerifyEmail, setStatusVerifyEmail] = useState(false);

    // Sign Up Component
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Verify Email Component
    const [codeEmail, setCodeEmail] = useState("");
    // Sign In Component
    const [signinName, setSigninName] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    // Handle function
    const handleSignUp = async () => {
        // Validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!username) {
            toast.error("Invalid username");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }

        const data = {
            email,
            username,
            password,
            role: "USER",
        };
        const res = await axios.post(`api/user/signup`, data);

        if (res.status === true) {
            const res2 = await axios.post(`api/user/sendOTPEmail`, {
                email,
            });
            if (res2.status === true) {
                toast.success(res.message);
                setStatusVerifyEmail(true);
                setStatusSignUp(false);
            } else {
                return toast.error("Fulfill valid information");
            }
        } else {
            return toast.error("Fulfill valid information");
        }
    };
    const handleVerifyEmail = async () => {
        // Validate
        if (!codeEmail) {
            toast.error("Invalid code OTP");
            return;
        }
        const data = {
            email,
            codeEmail,
        };
        const res = await axios.post(`api/user/verifyOTPEmail`, data);
        if (res.status === true) {
            toast.success(res.message);
            setStatusSignIn(true);
            setStatusVerifyEmail(false);
        } else {
            return toast.error("Invalid OTP code");
        }
    };
    const handleSignIn = async () => {
        // Validate
        if (!signinName) {
            toast.error("Invalid username");
            return;
        }
        if (!signinPassword) {
            toast.error("Invalid password");
            return;
        }

        const data = { username: signinName, password: signinPassword };
        const res = await axios.post(`api/user/signin`, data);
        if (res.status === true) {
            localStorage.setItem("user-info-kbrary", JSON.stringify(res.data));
            toast.success(res.message);
            navigate("/");
        } else {
            return toast.error("Type correct information");
        }
    };

    return (
        <>
            <div>
                <HeaderAuth isSignUp={true} />
                <div className="form-heading">
                    <h2>Welcome to Kmin library </h2>
                </div>
                <div className="form-container">
                    <div className="step-sign-in">
                        <Steps
                            items={[
                                {
                                    title: "Sign Up",
                                    status: statusSignUp ? "finish" : "wait",
                                    icon: (
                                        <UserOutlined
                                            onClick={() => {
                                                setStatusSignUp(true);
                                                setStatusSignIn(false);
                                                setStatusVerifyEmail(false);
                                            }}
                                        />
                                    ),
                                },
                                {
                                    title: "Verification",
                                    status: statusVerifyEmail
                                        ? "finish"
                                        : "wait",
                                    icon: <SafetyOutlined />,
                                },
                                {
                                    title: "Sign In",
                                    status: statusSignIn ? "finish" : "wait",
                                    icon: <SolutionOutlined />,
                                },
                            ]}
                        />
                    </div>
                    {/* Sign Up Component */}
                    {statusSignUp && (
                        <FormSignUp
                            email={email}
                            username={username}
                            password={password}
                            setEmail={setEmail}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            handleSignUp={handleSignUp}
                        />
                    )}
                    {/* Verify Email */}
                    {statusVerifyEmail && (
                        <FormVerifyEmail
                            setCodeEmail={setCodeEmail}
                            handleVerifyEmail={handleVerifyEmail}
                            text={`Use the 6-digit number sent to your email for verification.
                                If your email isn't valid, go back to Sign Up with a correct one`}
                        />
                    )}
                    {/* Sign In Component */}
                    {statusSignIn && (
                        <FormSignIn
                            signinName={signinName}
                            setSigninName={setSigninName}
                            signinPassword={signinPassword}
                            setSigninPassword={setSigninPassword}
                            handleSignIn={handleSignIn}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default MainSignUp;

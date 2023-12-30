import { useState } from "react";
import FormSignUp from "./FormSignUp.js";
import FormSignIn from "./FormSignIn.js";
import FormVerifyEmail from "./VerifyEmail.js";
import "../SignIn/SignIn.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.scss";
import axios from "../utils/axiosCustomize.js";
import {
    SmileOutlined,
    SolutionOutlined,
    UserOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    // Steps Component
    const [statusSignUp, setStatusSignUp] = useState(true);
    const [statusSignIn, setStatusSignIn] = useState(false);
    const [statusVerifyEmail, setStatusVerifyEmail] = useState(false);

    // Sign Up Component
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Verify Email Component
    const [numberOTP, setNumberOTP] = useState("");
    // Sign In Component
    const [signinName, setSigninName] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    // Handle function
    const handleSignUp = async () => {
        const data = {
            email,
            username,
            password,
        };
        const res = await axios.post(`api/user/signup`, data);

        if (res.status === "success") {
            await axios.post(`api/user/sendOTP`, {
                email,
            });
            toast.success(res.message);
            setStatusVerifyEmail(true);
            setStatusSignUp(false);
        } else {
            return toast.error("Fulfill your information");
        }
    };
    const handleVerifyEmail = async () => {
        const data = {
            email,
            OTP: numberOTP,
        };
        const res = await axios.post(`api/user/verifyemail`, data);
        if (res.status === "success") {
            toast.success(res.message);
            setStatusSignIn(true);
            setStatusVerifyEmail(false);
        } else {
            return toast.error("Invalid OTP code");
        }
    };
    const handleSignIn = async () => {
        const data = { signinName, password: signinPassword };
        const res = await axios.post(`api/user/signin`, data);
        if (res.status === "success") {
            toast.success(res.message);
            setStatusSignIn(false);
        } else {
            return toast.error("Type correct information");
        }
    };

    return (
        <>
            <div>
                <div className="navigate-container">
                    <span className="btn signup">Sign Up</span>
                    <span className="btn signin">Sign In</span>
                </div>
                <div className="form-heading">
                    <h2>Welcome to Kmin library </h2>
                </div>
                <div className="form-container">
                    <div className="step-sign-in">
                        <Steps
                            items={[
                                {
                                    title: "Sign Up",
                                    status: statusSignUp ? "wait" : "finish",
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
                                        ? "wait"
                                        : "finish",
                                    icon: (
                                        <SafetyOutlined
                                            onClick={() => {
                                                setStatusVerifyEmail(true);
                                                setStatusSignUp(false);
                                                setStatusSignIn(false);
                                            }}
                                        />
                                    ),
                                },
                                {
                                    title: "Sign In",
                                    status: statusSignIn ? "wait" : "finish",
                                    icon: (
                                        <SolutionOutlined
                                            onClick={() => {
                                                setStatusSignIn(true);
                                                setStatusSignUp(false);
                                                setStatusVerifyEmail(false);
                                            }}
                                        />
                                    ),
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
                            setNumberOTP={setNumberOTP}
                            handleVerifyEmail={handleVerifyEmail}
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

export default SignUp;

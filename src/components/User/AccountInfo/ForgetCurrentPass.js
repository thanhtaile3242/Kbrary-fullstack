import "bootstrap/dist/css/bootstrap.min.css";
import "../../Auth/MainAuth.scss";
import "./User.scss";
import {
    BellOutlined,
    SafetyOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { Steps } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosCustomize.js";
import ResetPassword from "../../Auth/ForgetPassword/ResetPassword.js";
import SendOTP from "../../Auth/ForgetPassword/SendOTP.js";
import VerifyReset from "../../Auth/ForgetPassword/VerifyReset.js";
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const ForgetCurrentPass = () => {
    // Steps Component
    const [statusGetOTP, setStatusGetOTP] = useState(true);
    const [statusVerify, setStatusVerify] = useState(false);
    const [statusResetPassword, setStatusResetPassword] = useState(false);

    // Get OPT Component
    const [emailSendOTP, setEmailSendOTP] = useState("");
    // Verify Email Component
    const [codeResetPassword, setCodeResetPassword] = useState("");
    // Reset password Component
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Handle function
    const handleSendEmail = async () => {
        //Validate
        const isValidEmail = validateEmail(emailSendOTP);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        // Call API
        const res = await axios.post(`api/user/sendOTPReset`, {
            email: emailSendOTP,
        });
        if (res.status === true) {
            toast.success(res.message);
            setStatusGetOTP(false);
            setStatusVerify(true);
        } else {
            toast.error(res.message);
        }
    };
    const handleVerifyReset = async () => {
        if (!codeResetPassword) {
            toast.error("Invalid code OTP");
            return;
        }
        const res = await axios.post(`api/user/verifyOTPReset`, {
            email: emailSendOTP,
            codeResetPassword: codeResetPassword,
        });
        if (res.status === true) {
            toast.success(res.message);
            setStatusVerify(false);
            setStatusResetPassword(true);
        } else {
            toast.error(res.message);
        }
    };
    const handleResetPassword = async () => {
        // Validate
        if (!newPassword || !confirmPassword) {
            toast.error("Invalid password");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Unmatching password");
            return;
        }
        const res = await axios.put(`api/user/resetPassword`, {
            email: emailSendOTP,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
        });
        if (res.status === true) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };
    return (
        <>
            <div>
                <div className="form-container">
                    <div className="step-sign-in">
                        <Steps
                            items={[
                                {
                                    title: "Get OTP",
                                    status: statusGetOTP ? "finish" : "wait",
                                    icon: <BellOutlined />,
                                },
                                {
                                    title: "Verification",
                                    status: statusVerify ? "finish" : "wait",
                                    icon: <SafetyOutlined />,
                                },
                                {
                                    title: "Reset password",
                                    status: statusResetPassword
                                        ? "finish"
                                        : "wait",
                                    icon: <SettingOutlined />,
                                },
                            ]}
                        />
                    </div>
                    {/* Component */}
                    {statusGetOTP && (
                        <SendOTP
                            setEmailSendOTP={setEmailSendOTP}
                            handleSendEmail={handleSendEmail}
                        />
                    )}
                    {statusVerify && (
                        <VerifyReset
                            setCodeResetPassword={setCodeResetPassword}
                            handleVerifyReset={handleVerifyReset}
                        />
                    )}

                    {statusResetPassword && (
                        <ResetPassword
                            setNewPassword={setNewPassword}
                            setConfirmPassword={setConfirmPassword}
                            handleResetPassword={handleResetPassword}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgetCurrentPass;

import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import "../../Admin/SCSS/DetailAccount.scss";
import "./User.scss";
import DetailAccount from "./DetailAccount.js";
import ResetCurrentPass from "./ResetCurrentPass.js";
import ForgetCurrentPass from "./ForgetCurrentPass.js";
const ManageAccount = (props) => {
    // Show components
    const [showDetailAccount, setShowDetailAccount] = useState(true);
    const [showResetPass, setShowResetPass] = useState(false);
    const [showForgetPass, setShowForgetPass] = useState(false);

    // Handle show function
    const handleShowDetailAccount = () => {
        setShowDetailAccount(true);
        setShowResetPass(false);
        setShowForgetPass(false);
    };
    const handleShowResetPass = () => {
        setShowResetPass(true);
        setShowDetailAccount(false);
        setShowForgetPass(false);
    };
    const handleShowForget = () => {
        setShowForgetPass(true);
        setShowResetPass(false);
        setShowDetailAccount(false);
    };

    return (
        <>
            <div className="breadcrumb-container">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: (
                                <>
                                    <span
                                        className={
                                            showDetailAccount
                                                ? "selected-account pointer-account"
                                                : "pointer-account"
                                        }
                                        onClick={handleShowDetailAccount}
                                    >
                                        Account
                                    </span>
                                </>
                            ),
                        },
                        {
                            title: (
                                <span
                                    className="list-user-breadcrumb"
                                    onClick={handleShowDetailAccount}
                                    className={
                                        showResetPass ? "selected-account" : ""
                                    }
                                >
                                    Reset password
                                </span>
                            ),
                        },
                    ]}
                />
            </div>
            {showDetailAccount && (
                <DetailAccount handleShowResetPass={handleShowResetPass} />
            )}
            {showResetPass && (
                <ResetCurrentPass handleShowForget={handleShowForget} />
            )}
            {showForgetPass && <ForgetCurrentPass />}
        </>
    );
};

export default ManageAccount;

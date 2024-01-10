import "./User.scss";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import axios from "../../utils/axiosCustomize.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ResetCurrentPass = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        async function fetchDetailUser() {
            const user = JSON.parse(localStorage.getItem("user-info-kbrary"));
            if (user) {
                setEmail(user.email);
            } else {
                navigate("/signin");
                return;
            }
        }
        fetchDetailUser();
    }, []);

    const hanldResetPass = async () => {
        // Validate
        if (!newPassword || !confirmPassword) {
            toast.error("Invalid password");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Unmatching password");
            return;
        }
        const res = await axios.put(`api/user/resetPassword2`, {
            email: email,
            currentPassword: currentPassword,
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
            <div className="reset-container">
                <FloatingLabel label="Current password" className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        onChange={(event) => {
                            setCurrentPassword(event.target.value);
                        }}
                    />
                </FloatingLabel>
                <FloatingLabel label="New password" className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        onChange={(event) => {
                            setNewPassword(event.target.value);
                        }}
                    />
                </FloatingLabel>
                <FloatingLabel label="Confirm password">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                    />
                </FloatingLabel>
                <div className="btn-container">
                    <span
                        className="forget-btn"
                        onClick={() => {
                            props.handleShowForget();
                        }}
                    >
                        Forget Password?
                    </span>
                    <span
                        className="btn btn-warning btn-reset"
                        onClick={hanldResetPass}
                    >
                        Reset password
                    </span>
                </div>
            </div>
        </>
    );
};

export default ResetCurrentPass;

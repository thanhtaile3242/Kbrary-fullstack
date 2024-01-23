import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const ResetPassword = (props) => {
    const style = props.style;
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="New password"
                className={style.new_password}
            >
                <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    value={props.signinName}
                    onChange={(event) => {
                        props.setNewPassword(event.target.value);
                    }}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingPassword"
                label="Confirm password"
                className="password-input"
            >
                <Form.Control
                    type="text"
                    placeholder="Password"
                    value={props.signinPassword}
                    onChange={(event) => {
                        props.setConfirmPassword(event.target.value);
                    }}
                />
            </FloatingLabel>

            <div className={style.btn_form}>
                <span
                    onClick={() => {
                        props.handleResetPassword();
                    }}
                >
                    Reset password
                </span>
            </div>
        </>
    );
};

export default ResetPassword;

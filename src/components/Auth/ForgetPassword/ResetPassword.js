import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Spinner from "react-bootstrap/Spinner";
function ResetPassword(props) {
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="New password"
                className="mb-4 signin-input"
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

            <div className="btn-form">
                <span
                    style={{ backgroundColor: "#ffc008", cursor: "pointer" }}
                    onClick={() => {
                        props.handleResetPassword();
                    }}
                >
                    Reset password
                </span>
            </div>
        </>
    );
}

export default ResetPassword;

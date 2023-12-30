import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
function VerifyReset(props) {
    return (
        <>
            <div className="note-for-user">
                <IoIosAlert className="note-icon" />
                <span>
                    "Use the 6-digit number sent to your email for verification
                    and reset your password."
                </span>
            </div>

            <FloatingLabel
                controlId="floatingInput"
                label="OTP Number"
                className="mt-3"
            >
                <Form.Control
                    type="number"
                    placeholder="OTP Number"
                    onChange={(event) => {
                        props.setCodeResetPassword(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                    style={{ backgroundColor: "#ffc008" }}
                    className="btn"
                    onClick={() => {
                        props.handleVerifyReset();
                    }}
                >
                    Verify
                </span>
            </div>
        </>
    );
}

export default VerifyReset;

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
function SendOTP(props) {
    return (
        <>
            <div className="note-for-user">
                <IoIosAlert className="note-icon" />
                <span>
                    Provide your email to receive on 6-digit number for reset
                    password
                </span>
            </div>

            <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mt-3"
            >
                <Form.Control
                    type="text"
                    placeholder="Email"
                    onChange={(event) => {
                        props.setEmailSendOTP(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                    style={{ backgroundColor: "#ffc008" }}
                    className="btn"
                    onClick={() => {
                        props.handleSendEmail();
                    }}
                >
                    Get OTP
                </span>
            </div>
        </>
    );
}

export default SendOTP;

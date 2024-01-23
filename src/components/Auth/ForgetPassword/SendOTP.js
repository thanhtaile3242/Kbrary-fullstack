import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
const SendOTP = (props) => {
    const style = props.style;
    return (
        <>
            <div className={style.note_for_user}>
                <IoIosAlert className={style.note_icon} />
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
            <div className={style.btn_form}>
                <span
                    onClick={() => {
                        props.handleSendEmail();
                    }}
                >
                    Get OTP
                </span>
            </div>
        </>
    );
};

export default SendOTP;

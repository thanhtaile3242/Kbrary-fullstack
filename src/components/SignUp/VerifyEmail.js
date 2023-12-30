import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
import Spinner from "react-bootstrap/Spinner";
function FormVerifyEmail(props) {
    const [isShowHideEyePassword, setIsShowHideEyePassword] = useState(true);
    return (
        <>
            <div className="note-for-user">
                <IoIosAlert className="note-icon" />
                <span>
                    Use the 6-digit number sent to your email for verification.
                    If your email isn't valid, go back to{" "}
                    <strong>Sign Up</strong> with a correct one
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
                    value={props.email}
                    onChange={(event) => {
                        props.setNumberOTP(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                    className="btn"
                    onClick={() => {
                        props.handleVerifyEmail();
                    }}
                >
                    Verify
                </span>
            </div>
        </>
    );
}

export default FormVerifyEmail;

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
                <span>{props.text}</span>
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
                        props.setCodeEmail(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                    style={{ backgroundColor: "#ffc008" }}
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

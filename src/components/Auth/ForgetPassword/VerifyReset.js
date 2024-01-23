import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { IoIosAlert } from "react-icons/io";

const VerifyReset = (props) => {
    const style = props.style;
    return (
        <>
            <div className={style.note_for_user}>
                <IoIosAlert className={style.note_icon} />
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
            <div className={style.btn_form}>
                <span
                    onClick={() => {
                        props.handleVerifyReset();
                    }}
                >
                    Verify
                </span>
            </div>
        </>
    );
};

export default VerifyReset;

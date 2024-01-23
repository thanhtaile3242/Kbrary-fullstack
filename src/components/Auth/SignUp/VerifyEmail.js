import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";

const FormVerifyEmail = (props) => {
    const style = props.style;
    const [isShowHideEyePassword, setIsShowHideEyePassword] = useState(true);
    return (
        <>
            <div className={style.note_for_user}>
                <IoIosAlert className={style.note_icon} />
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
            <div className={style.btn_form_2}>
                <span
                    onClick={() => {
                        props.handleVerifyEmail();
                    }}
                >
                    Verify
                </span>
            </div>
        </>
    );
};

export default FormVerifyEmail;

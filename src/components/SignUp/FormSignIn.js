import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Spinner from "react-bootstrap/Spinner";
function FormSignIn(props) {
    const [isShowHideEyePassword, setIsShowHideEyePassword] = useState(true);
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Email or Username"
                className="mb-4 signin-input"
            >
                <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    value={props.signinName}
                    onChange={(event) => {
                        props.setSigninName(event.target.value);
                    }}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="password-input"
            >
                <Form.Control
                    type="text"
                    placeholder="Password"
                    value={props.signinPassword}
                    onChange={(event) => {
                        props.setSigninPassword(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                    onClick={() => {
                        props.handleSignIn();
                    }}
                >
                    Sign In
                </span>
            </div>
        </>
    );
}

export default FormSignIn;

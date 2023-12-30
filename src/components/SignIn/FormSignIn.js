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
                    value={props.email}
                    onChange={(event) => {
                        props.setEmail(event.target.value);
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
                    value={props.password}
                    onChange={(event) => {
                        props.setPassword(event.target.value);
                    }}
                />
            </FloatingLabel>
            <div className="btn-form">
                <span
                // className="btn"
                // onClick={() => {
                //     handleSubmitSignIn();
                // }}
                >
                    Sign In
                </span>
            </div>
        </>
    );
}

export default FormSignIn;

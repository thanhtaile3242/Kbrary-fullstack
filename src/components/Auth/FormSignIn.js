import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
function FormSignIn(props) {
    const navigate = useNavigate();
    const [isShowHideEyePassword, setIsShowHideEyePassword] = useState(true);
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Username"
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
                    type={isShowHideEyePassword ? "password" : "text"}
                    placeholder="Password"
                    value={props.signinPassword}
                    onChange={(event) => {
                        props.setSigninPassword(event.target.value);
                    }}
                />
                {isShowHideEyePassword ? (
                    <FaEyeSlash
                        className="eye-open"
                        onClick={() => {
                            setIsShowHideEyePassword(!isShowHideEyePassword);
                        }}
                    />
                ) : (
                    <FaEye
                        className="eye-open"
                        onClick={() => {
                            setIsShowHideEyePassword(!isShowHideEyePassword);
                        }}
                    />
                )}
            </FloatingLabel>
            <div style={{ marginTop: "10px" }}>
                <span
                    style={{ color: "#4db9e6", cursor: "pointer" }}
                    onClick={() => {
                        navigate("/forgetpassword");
                    }}
                >
                    Forget password?
                </span>
            </div>
            <div className="btn-form">
                <span
                    style={{ backgroundColor: "#ffc008", cursor: "pointer" }}
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

import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import style from "../SCSS/FormSignIn.module.scss";
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
                className={style.signin_input}
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
                className={style.password_input}
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
                        className={style.eye_open}
                        onClick={() => {
                            setIsShowHideEyePassword(!isShowHideEyePassword);
                        }}
                    />
                ) : (
                    <FaEye
                        className={style.eye_open}
                        onClick={() => {
                            setIsShowHideEyePassword(!isShowHideEyePassword);
                        }}
                    />
                )}
            </FloatingLabel>
            <div className={style.forget_password}>
                <span
                    onClick={() => {
                        navigate("/forgetpassword");
                    }}
                >
                    Forget password?
                </span>
            </div>
            <div className={style.btn_form}>
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

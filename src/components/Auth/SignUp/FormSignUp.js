import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const FormSignUp = (props) => {
    const style = props.style;
    const [isShowHideEyePassword, setIsShowHideEyePassword] = useState(true);
    return (
        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4"
            >
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={props.email}
                    onChange={(event) => {
                        props.setEmail(event.target.value);
                    }}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingPassword"
                label="Username"
                className="mb-4"
            >
                <Form.Control
                    type="text"
                    placeholder="username"
                    value={props.username}
                    onChange={(event) => {
                        props.setUsername(event.target.value);
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
                    value={props.password}
                    onChange={(event) => {
                        props.setPassword(event.target.value);
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
            <div className={style.btn_form}>
                <span
                    onClick={() => {
                        props.handleSignUp();
                    }}
                >
                    Sign Up
                </span>
            </div>
        </>
    );
};

export default FormSignUp;

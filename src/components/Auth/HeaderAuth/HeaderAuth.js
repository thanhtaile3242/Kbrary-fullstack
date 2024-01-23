import Logo from "../../../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import "../SCSS/HeaderAuth.scss";
const HeaderAuth = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="header-container">
                <div className="logo-container">
                    <img
                        src={Logo}
                        alt=""
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>

                <>
                    {props.isSignUp ? (
                        <div className="auth-container">
                            <span className="text-signin">
                                Already have an account ?
                            </span>
                            <span
                                className="sign-in"
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                Sign In
                            </span>
                        </div>
                    ) : (
                        <div className="auth-container">
                            <span className="text-signup">
                                Don't have an account ?
                            </span>
                            <span
                                className="sign-up"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign Up
                            </span>
                        </div>
                    )}
                </>
            </div>
        </>
    );
};
export default HeaderAuth;

import { useState } from "react";
import FormSignIn from "./FormSignIn.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignIn.scss";
import Spinner from "react-bootstrap/Spinner";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        setIsLoading(!isLoading);
        console.log({
            email,
            username,
            password,
        });
    };
    return (
        <>
            <div>
                <div className="navigate-container">
                    <span className="btn signup">Sign Up</span>
                    <span className="btn signin">Sign In</span>
                </div>
                <div className="form-container">
                    <div className="form-heading">
                        <h2>Join with Kmin Library</h2>
                    </div>
                    <FormSignIn
                        email={email}
                        setEmail={setEmail}
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                    />
                    <div className="submit-form">
                        <span
                            className="btn"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Sign In
                        </span>
                        {isLoading ? (
                            <Spinner className="spinner" animation="border" />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;

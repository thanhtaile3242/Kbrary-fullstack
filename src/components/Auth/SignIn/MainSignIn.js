import { useState } from "react";
import FormSignIn from "../FormSignIn.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../MainAuth.scss";
import axios from "../../utils/axiosCustomize.js";
import { toast } from "react-toastify";
import HeaderAuth from "../HeaderAuth.js";
import { useNavigate, Link } from "react-router-dom";
const MainSignIn = () => {
    const navigate = useNavigate();
    // Sign In Component
    const [signinName, setSigninName] = useState("");
    const [signinPassword, setSigninPassword] = useState("");

    const handleSignIn = async () => {
        // Validate
        if (!signinName) {
            toast.error("Invalid username");
            return;
        }
        if (!signinPassword) {
            toast.error("Invalid password");
            return;
        }

        const data = { username: signinName, password: signinPassword };
        const res = await axios.post(`api/user/signin`, data);
        if (res.status === true) {
            localStorage.setItem("user-info-kbrary", JSON.stringify(res.data));
            toast.success(res.message);
            navigate("/");
        } else {
            return toast.error("Type correct information");
        }
    };

    return (
        <>
            <div>
                <HeaderAuth isSignUp={false} />
                <div className="form-heading">
                    <h2 style={{ margin: "0" }}>Welcome to Kmin library</h2>
                </div>
                <div className="form-container" style={{ marginTop: "0" }}>
                    <div
                        className="step-sign-in"
                        style={{ margin: "0", color: "white" }}
                    >
                        a
                    </div>
                    <FormSignIn
                        signinName={signinName}
                        setSigninName={setSigninName}
                        signinPassword={signinPassword}
                        setSigninPassword={setSigninPassword}
                        handleSignIn={handleSignIn}
                    />
                </div>
            </div>
        </>
    );
};

export default MainSignIn;

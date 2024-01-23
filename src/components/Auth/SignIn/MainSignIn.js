import { useState } from "react";
import FormSignIn from "./FormSignIn.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../SCSS/MainSignIn.module.scss";
import axios from "../../utils/axiosCustomize.js";
import { toast } from "react-toastify";
import HeaderAuth from "../HeaderAuth/HeaderAuth.js";
import { useNavigate } from "react-router-dom";
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
                <div className={style.form_heading}>
                    <h2>Welcome to Kmin library</h2>
                </div>
                <div className={style.form_container}>
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

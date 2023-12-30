import Logo from "../../assets/logo.svg";
import "./Header.scss";
const Header = () => {
    return (
        <>
            <div className="header-container">
                <div className="logo-container">
                    <img src={Logo} alt="" />
                </div>

                <div className="auth-container-before">
                    <span className="sign-up">Sign Up</span>
                    <span className="sign-in">Sign In</span>
                </div>
                {/* <div className="auth-container-after">d</div> */}
            </div>
        </>
    );
};
export default Header;

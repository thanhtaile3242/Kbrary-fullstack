import React from "react";
import Logo from "../../assets/logo.svg";
import "./Footer.scss";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__logo">
                <img src={Logo} alt="Bedmemo__logo--white" />
                <div className="footer__icons">
                    {/* <a href="">
                        <img
                            src="./Images/icon/facebook.svg"
                            alt="facebook-icon"
                        />
                    </a>
                    <a href="">
                        <img
                            src="./Images/icon/telegram.svg"
                            alt="youtube-icon"
                        />
                    </a>
                    <a href="">
                        <img
                            src="./Images/icon/linkedin.svg"
                            alt="linkedin-icon"
                        />
                    </a> */}
                </div>
            </div>

            <div className="footer__content">
                <h2 className="footer__title">About us</h2>
                <ul className="footer__list">
                    <li>
                        <span>About Bedmemo</span>
                    </li>
                    <li>
                        <span>How Bedmemo works</span>
                    </li>
                    <li>
                        <span>FAQs</span>
                    </li>
                </ul>
            </div>

            <div className="footer__content">
                <h2 className="footer__title">Terms and conditions</h2>
                <ul className="footer__list">
                    <li>
                        <span>Privacy policy</span>
                    </li>
                    <li>
                        <span>Terms of services</span>
                    </li>
                    <li>
                        <span>Student conditions</span>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

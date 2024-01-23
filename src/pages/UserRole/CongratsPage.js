import MainImage from "../../assets/congrats.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const CongratsPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        return () => {
            localStorage.removeItem("pending-list-kbrary");
        };
    }, []);
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "80px",
                    minHeight: "calc(100vh - 120px)",
                }}
            >
                <div
                    style={{
                        borderRadius: "30px",
                        width: "70%",
                        height: "650px",
                        backgroundColor: "white",
                    }}
                >
                    <div style={{ textAlign: "center", paddingTop: "40px" }}>
                        <img src={MainImage} alt="" style={{ width: "70%" }} />
                    </div>
                    <div style={{ padding: "20px 40px", textAlign: "center" }}>
                        <span style={{ fontSize: "20px" }}>
                            Your request was sent to our system, please wait for
                            handling in a few date. The notification email for
                            detail will be sent you as soon! Thank you for
                            giving our your time.
                        </span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        <span
                            className="btn"
                            style={{
                                backgroundColor: "#ffc109",
                                fontSize: "18px",
                            }}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            Home
                        </span>
                        <span
                            className="btn"
                            style={{
                                backgroundColor: "#019cda",
                                fontSize: "18px",
                            }}
                            onClick={() => {
                                navigate("/bookUser");
                            }}
                        >
                            Book library
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CongratsPage;

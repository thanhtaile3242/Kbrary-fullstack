import Intro from "../assets/intro.png";
import "./HomePage.scss";
import CountUp from "react-countup";
import { Col, Row, Statistic } from "antd";
import { PiBooksFill } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import OverLay from "../assets/Overlay.png";
import Cate1 from "../assets/category/1.png";
import Cate2 from "../assets/category/2.png";
import Cate3 from "../assets/category/3.png";
import Cate4 from "../assets/category/4.png";
import Cate5 from "../assets/category/5.png";
import Cate6 from "../assets/category/6.png";
import { useNavigate, Link } from "react-router-dom";
const formatter = (value) => <CountUp end={value} separator="," />;

const HomePage = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="home-container">
                <div className="intro-container">
                    <div className="description-container">
                        <h1>
                            Discover knowledge
                            <br />
                            at Kbrary's community
                        </h1>
                        <p>
                            Welcome to our online library, where borrowing meets
                            generosity. Dive into our collection and share your
                            favorites by sending in your old books. Join our
                            community where sharing knowledge is the heart of
                            what we do.
                        </p>
                        <div className="btn-container">
                            <span
                                className="signup-btn"
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                Be a member
                            </span>
                            <span className="category-btn">
                                Explore our category
                            </span>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={Intro} alt="" />
                    </div>
                </div>
                <div className="statistic-container">
                    <h2 className="title">Our Statistics</h2>
                    <hr className="line1" />
                    <span>
                        Surpassing expectations, Kbrary boasts an outperforming
                        record in delivering comprehensive resources and
                        unparalleled accessibility
                    </span>
                    <div className="detail-container">
                        <div className="item">
                            <div className="icon-container">
                                <PiBooksFill className="icon" />
                            </div>
                            <div className="number-container">
                                <Statistic
                                    value={112893}
                                    formatter={formatter}
                                />
                            </div>
                            <hr className="line" />
                            <div className="text-container">
                                <h3>Books</h3>
                            </div>
                        </div>
                        <div className="item">
                            <div className="icon-container">
                                <MdOutlinePeopleAlt className="icon" />
                            </div>
                            <div className="number-container">
                                <Statistic
                                    value={112893}
                                    formatter={formatter}
                                />
                            </div>
                            <hr className="line" />
                            <div className="text-container">
                                <h3>Students</h3>
                            </div>
                        </div>
                        <div className="item">
                            <div className="icon-container">
                                <MdEventNote className="icon" />
                            </div>
                            <div className="number-container">
                                <Statistic
                                    value={112893}
                                    formatter={formatter}
                                />
                            </div>
                            <hr className="line" />
                            <div className="text-container">
                                <h3>Events</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="category-container">
                    <h2>Kbrary's Category</h2>

                    <div className="category-detail">
                        <div className="item">
                            <img src={Cate1} alt="" />
                            <div className="title">
                                <span>Programming</span>
                            </div>
                        </div>
                        <div className="item">
                            <img src={Cate2} alt="" />
                            <div className="title">
                                <span>Economy</span>
                            </div>
                        </div>
                        <div className="item">
                            <img src={Cate3} alt="" />
                            <div className="title">
                                <span>Data</span>
                            </div>
                        </div>
                        <div className="item">
                            <img src={Cate4} alt="" />
                            <div className="title">
                                <span>Languages</span>
                            </div>
                        </div>
                        <div className="item">
                            <img src={Cate5} alt="" />
                            <div className="title">
                                <span>Life Skills</span>
                            </div>
                        </div>
                        <div className="item">
                            <img src={Cate6} alt="" />
                            <div className="title">
                                <span>Literature</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default HomePage;

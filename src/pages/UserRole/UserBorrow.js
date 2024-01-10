import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React from "react";
import "./SCSS/DetailRequest.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { DatePicker } from "antd";
const onChange = (date, dateString) => {
    console.log(date, dateString);
};
const UserBorrow = (props) => {
    return (
        <>
            <div>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCard style={{ height: "600px", marginTop: "30px" }}>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="8">
                                        <MDBTypography tag="h5">
                                            <MDBIcon
                                                fas
                                                icon="long-arrow-alt-left me-2"
                                            />
                                            Continue select books
                                        </MDBTypography>

                                        <div
                                            style={{
                                                marginTop: "20px",
                                                paddingRight: "28px",
                                                paddingLeft: "10px",
                                                height: "600px",
                                                maxWidth: "100%",
                                                overflowX: "hidden",
                                                overflow: "auto",
                                                paddingTop: "20px",
                                            }}
                                        >
                                            <MDBCard className="mb-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div
                                                            className="d-flex flex-row align-items-center"
                                                            style={{
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            <div>
                                                                <MDBCardImage
                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "50px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="fw-normal mb-0"
                                                                >
                                                                    2
                                                                </MDBTypography>
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        width: "25px",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <IoIosArrowUp />
                                                                    <IoIosArrowDown />
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            ></div>
                                                            <a
                                                                href="#!"
                                                                style={{
                                                                    color: "#cecece",
                                                                }}
                                                            >
                                                                <MDBIcon
                                                                    fas
                                                                    icon="trash-alt"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard className="mb-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div
                                                            className="d-flex flex-row align-items-center"
                                                            style={{
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            <div>
                                                                <MDBCardImage
                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "50px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="fw-normal mb-0"
                                                                >
                                                                    2
                                                                </MDBTypography>
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        width: "25px",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <IoIosArrowUp />
                                                                    <IoIosArrowDown />
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            ></div>
                                                            <a
                                                                href="#!"
                                                                style={{
                                                                    color: "#cecece",
                                                                }}
                                                            >
                                                                <MDBIcon
                                                                    fas
                                                                    icon="trash-alt"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard className="mb-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div
                                                            className="d-flex flex-row align-items-center"
                                                            style={{
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            <div>
                                                                <MDBCardImage
                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "50px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="fw-normal mb-0"
                                                                >
                                                                    2
                                                                </MDBTypography>
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        width: "25px",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <IoIosArrowUp />
                                                                    <IoIosArrowDown />
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            ></div>
                                                            <a
                                                                href="#!"
                                                                style={{
                                                                    color: "#cecece",
                                                                }}
                                                            >
                                                                <MDBIcon
                                                                    fas
                                                                    icon="trash-alt"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                            <MDBCard className="mb-3">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div
                                                            className="d-flex flex-row align-items-center"
                                                            style={{
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            <div>
                                                                <MDBCardImage
                                                                    src="http://localhost:8802/imageBook-1704861187442.png"
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-3">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "50px",
                                                                    display:
                                                                        "flex",
                                                                    alignItems:
                                                                        "center",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="fw-normal mb-0"
                                                                >
                                                                    2
                                                                </MDBTypography>
                                                                <span
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        flexDirection:
                                                                            "column",
                                                                        width: "25px",
                                                                        alignItems:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <IoIosArrowUp />
                                                                    <IoIosArrowDown />
                                                                </span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            ></div>
                                                            <a
                                                                href="#!"
                                                                style={{
                                                                    color: "#cecece",
                                                                }}
                                                            >
                                                                <MDBIcon
                                                                    fas
                                                                    icon="trash-alt"
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </div>
                                    </MDBCol>

                                    <MDBCol lg="4">
                                        <h5>Acconut information</h5>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBRow>
                </MDBContainer>
            </div>
        </>
    );
};
export default UserBorrow;

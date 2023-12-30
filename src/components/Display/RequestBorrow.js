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
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import book1 from "../../assets/book1.png";
import React from "react";
import { MdLibraryBooks } from "react-icons/md";
export default function RequestBorrow(props) {
    return (
        <>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="7">
                                        <MDBTypography
                                            tag="h5"
                                            style={{ width: "300px" }}
                                        >
                                            <a href="#!" className="text-body">
                                                <MdLibraryBooks
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "black",
                                                        marginRight: "10px",
                                                    }}
                                                />
                                                Danh sách mượn
                                            </a>
                                        </MDBTypography>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <p className="mb-0">
                                                    You have 4 books in your
                                                    cart
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                height: "365px",
                                                overflow: "auto",
                                            }}
                                        >
                                            <MDBCard className="mb-2">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <MDBCardImage
                                                                    src={book1}
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-2">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="mb-0"
                                                                >
                                                                    1
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
                                                                </MDBTypography>
                                                            </div>
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
                                            <MDBCard className="mb-2">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <MDBCardImage
                                                                    src={book1}
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-2">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="mb-0"
                                                                >
                                                                    1
                                                                </MDBTypography>
                                                            </div>
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
                                            <MDBCard className="mb-2">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <MDBCardImage
                                                                    src={book1}
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-2">
                                                                <MDBTypography tag="h5">
                                                                    Iphone 11
                                                                    pro
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="mb-0"
                                                                >
                                                                    1
                                                                </MDBTypography>
                                                            </div>
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
                                            <MDBCard className="mb-2">
                                                <MDBCardBody>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div>
                                                                <MDBCardImage
                                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                                                                    fluid
                                                                    className="rounded-3"
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                    alt="Shopping item"
                                                                />
                                                            </div>
                                                            <div className="ms-2">
                                                                <MDBTypography tag="h5">
                                                                    Samsung
                                                                    galaxy Note
                                                                    10
                                                                </MDBTypography>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div
                                                                style={{
                                                                    width: "50px",
                                                                }}
                                                            ></div>
                                                            <div
                                                                style={{
                                                                    width: "80px",
                                                                }}
                                                            >
                                                                <MDBTypography
                                                                    tag="h5"
                                                                    className="mb-0"
                                                                >
                                                                    1
                                                                </MDBTypography>
                                                            </div>
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
                                        <span className="btn-borrow">
                                            Mượn sách
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

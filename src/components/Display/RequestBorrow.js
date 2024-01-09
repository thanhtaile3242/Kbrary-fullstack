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
    const listBook = props.listBook;
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
                                            <MdLibraryBooks
                                                style={{
                                                    fontSize: "30px",
                                                    color: "black",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            Danh sách mượn
                                        </MDBTypography>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <p className="mb-0">
                                                    You have {listBook.length}{" "}
                                                    books in your cart
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                height: "365px",
                                                overflowX: "hidden",
                                                overflowY: "scroll",
                                            }}
                                        >
                                            {listBook.map((item) => {
                                                return (
                                                    <MDBCard className="mb-2">
                                                        <MDBCardBody>
                                                            <div className="d-flex justify-content-between">
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div>
                                                                        <MDBCardImage
                                                                            src={`http://localhost:8802/${item.imageName}`}
                                                                            fluid
                                                                            className="rounded-3"
                                                                            style={{
                                                                                width: "65px",
                                                                            }}
                                                                            alt="Shopping item"
                                                                        />
                                                                    </div>
                                                                    <div className="ms-2">
                                                                        {/* <MDBTypography
                                                                            tag="h5"
                                                                            className="title-book"
                                                                        > */}
                                                                        {
                                                                            item.bookName
                                                                        }
                                                                        {/* </MDBTypography> */}
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
                                                                            <MDBIcon
                                                                                fas
                                                                                icon="trash-alt"
                                                                            />
                                                                        </MDBTypography>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                );
                                            })}
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

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
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./SCSS/ListBorrow.scss";
import { FaClipboardList } from "react-icons/fa";
const ListBorrow = (props) => {
    const navigate = useNavigate();
    const listBorrowBook = props.listBorrowBook;

    const handleIncreaseBook = (item) => {
        const idItem = item._id;
        listBorrowBook.forEach((book) => {
            if (book._id === idItem) {
                book.quantityBorrow++;
            }
        });
        props.setListBorrowBook([...listBorrowBook]);
    };
    const handleDescreaseBook = (item) => {
        const idItem = item._id;
        listBorrowBook.forEach((book) => {
            if (book._id === idItem) {
                book.quantityBorrow--;
            }
        });

        listBorrowBook.forEach((book, index) => {
            if (book.quantityBorrow == 0) {
                listBorrowBook.splice(index, 1);
            }
        });

        props.setListBorrowBook([...listBorrowBook]);
    };
    const handleDeleteBook = (item) => {
        const idItem = item._id;
        const listBorrowBookNew = listBorrowBook.filter(
            (item) => item._id !== idItem
        );
        props.setListBorrowBook(listBorrowBookNew);
    };
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
                                            className="book-cart-title"
                                            tag="h5"
                                            onClick={() => {
                                                navigate("/borrow");
                                            }}
                                        >
                                            <FaClipboardList
                                                style={{
                                                    fontSize: "30px",
                                                    color: "black",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            Book cart
                                        </MDBTypography>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <p className="mb-0">
                                                    You have{" "}
                                                    {listBorrowBook.length}{" "}
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
                                            {listBorrowBook.map((item) => {
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
                                                                        {
                                                                            item.bookName
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-row align-items-center">
                                                                    <div
                                                                        style={{
                                                                            width: "80px",
                                                                        }}
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                position:
                                                                                    "absolute",
                                                                                fontSize:
                                                                                    "23px",
                                                                                right: "110px",
                                                                                top: "35.5px",
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.quantityBorrow
                                                                            }
                                                                        </span>

                                                                        <MDBTypography
                                                                            tag="h5"
                                                                            className="mb-0"
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    display:
                                                                                        "flex",
                                                                                    flexDirection:
                                                                                        "column",
                                                                                    width: "20px",
                                                                                    alignItems:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                <FaPlus
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        position:
                                                                                            "absolute",
                                                                                        fontSize:
                                                                                            "20px",
                                                                                        right: "76px",
                                                                                        top: "31px",
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        handleIncreaseBook(
                                                                                            item
                                                                                        );
                                                                                    }}
                                                                                />
                                                                                <FaMinus
                                                                                    style={{
                                                                                        cursor: "pointer",
                                                                                        position:
                                                                                            "absolute",
                                                                                        fontSize:
                                                                                            "20px",
                                                                                        right: "76px",
                                                                                        top: "56px",
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        handleDescreaseBook(
                                                                                            item
                                                                                        );
                                                                                    }}
                                                                                />
                                                                            </span>
                                                                            <MDBIcon
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                fas
                                                                                icon="trash-alt"
                                                                                onClick={() => {
                                                                                    handleDeleteBook(
                                                                                        item
                                                                                    );
                                                                                }}
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
};

export default ListBorrow;

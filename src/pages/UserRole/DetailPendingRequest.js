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
import { FaListCheck } from "react-icons/fa6";
import { FloatButton } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";
import "./SCSS/DetailRequest.scss";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "../../components/utils/axiosCustomize.js";
import { useOutletContext } from "react-router-dom";
const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};

const UserBorrow = (props) => {
    let listPending = useRef();
    const navigate = useNavigate();
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const [pendingRequest, setPendingRequest] = useState(null);
    const [listBorrowBooks, setListBorrowBooks] = useState([]);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        const listSave = JSON.parse(
            localStorage.getItem("pending-list-kbrary")
        );
        if (listSave) {
            setListBorrowBooks(listSave);
        } else {
        }
        return () => {
            localStorage.setItem(
                "pending-list-kbrary",
                JSON.stringify(listPending.current)
            );
        };
    }, []);
    useEffect(() => {
        listPending.current = listBorrowBooks;
    });
    const onChange = (date, dateString) => {
        setIsSelectDate(!isSelectDate);
        console.log(date, dateString);
    };
    const handleIncreaseBook = (item) => {
        const idItem = item.bookId._id;

        listBorrowBooks.forEach((book) => {
            if (book.bookId._id === idItem) {
                book.quantityBorrow++;
            }
        });
        setListBorrowBooks([...listBorrowBooks]);
    };
    const handleDescreaseBook = (item) => {
        const idItem = item.bookId._id;
        listBorrowBooks.forEach((book) => {
            if (book.bookId._id === idItem) {
                book.quantityBorrow--;
            }
        });

        listBorrowBooks.forEach((book, index) => {
            if (book.quantityBorrow == 0) {
                listBorrowBooks.splice(index, 1);
            }
        });

        setListBorrowBooks([...listBorrowBooks]);
    };
    const handleDeleteBook = (item) => {
        const idItem = item.bookId._id;
        const listBorrowBookNew = listBorrowBooks.filter(
            (item) => item.bookId._id !== idItem
        );
        setListBorrowBooks(listBorrowBookNew);
    };
    const handleUpdateWithUserId = async () => {
        const modifiedListBorrow = [...listBorrowBooks];
        modifiedListBorrow.forEach((book) => {
            book.bookId = book.bookId._id;
        });
        const data = {
            userId: userInfo.userId,
            listBorrowBooks: modifiedListBorrow,
        };
        const response = await axios.put(
            `api/userRequest/pending/updateWithUserId`,
            data
        );
        navigate("/bookUser");
    };
    useEffect(() => {
        let count = null;
        listBorrowBooks.forEach((item) => {
            count += item.quantityBorrow;
        });
        setNumberBorrowBook(count);
    });

    return (
        <>
            <div>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCard style={{ height: "600px", marginTop: "30px" }}>
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <MDBCol lg="8">
                                        <MDBTypography
                                            tag="h5"
                                            onClick={handleUpdateWithUserId}
                                            style={{
                                                alignItems: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <MDBIcon
                                                fas
                                                icon="long-arrow-alt-left me-2"
                                            />
                                            Continue select books
                                        </MDBTypography>
                                        <div
                                            style={{
                                                paddingRight: "28px",
                                                paddingLeft: "10px",
                                                height: "560px",
                                                maxWidth: "100%",
                                                overflowX: "hidden",
                                                overflow: "auto",
                                                paddingTop: "10px",
                                            }}
                                        >
                                            {listBorrowBooks.map((book) => {
                                                return (
                                                    <MDBCard className="mb-3">
                                                        <div
                                                            className="d-flex"
                                                            style={{
                                                                padding:
                                                                    "15px 40px 15px 30px",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <div>
                                                                <img
                                                                    src={`http://localhost:8802/${book?.bookId?.imageName}`}
                                                                    alt=""
                                                                    style={{
                                                                        width: "65px",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginLeft:
                                                                        "80px",
                                                                }}
                                                            >
                                                                <h5
                                                                    style={{
                                                                        width: "260px",
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                        overflow:
                                                                            "hidden",
                                                                        textOverflow:
                                                                            "ellipsis",
                                                                    }}
                                                                >
                                                                    {
                                                                        book
                                                                            ?.bookId
                                                                            ?.bookName
                                                                    }
                                                                </h5>
                                                                <h6>
                                                                    <span
                                                                        style={{
                                                                            color: "#004380",
                                                                        }}
                                                                    >
                                                                        Category:{" "}
                                                                    </span>
                                                                    {
                                                                        book
                                                                            ?.bookId
                                                                            ?.category
                                                                            ?.categoryName
                                                                    }
                                                                </h6>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginLeft:
                                                                        "175px",
                                                                    alignItems:
                                                                        "center",
                                                                    display:
                                                                        "flex",
                                                                    gap: "5px",
                                                                }}
                                                            >
                                                                <FaMinus
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                    onClick={() => {
                                                                        handleDescreaseBook(
                                                                            book
                                                                        );
                                                                    }}
                                                                />
                                                                <span
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                        minWidth:
                                                                            "30px",
                                                                        fontSize:
                                                                            "26px",
                                                                    }}
                                                                >
                                                                    {
                                                                        book.quantityBorrow
                                                                    }
                                                                </span>
                                                                <FaPlus
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                    onClick={() => {
                                                                        handleIncreaseBook(
                                                                            book
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    marginLeft:
                                                                        "50px",
                                                                }}
                                                            >
                                                                <MDBIcon
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "18px",
                                                                    }}
                                                                    fas
                                                                    icon="trash-alt"
                                                                    onClick={() => {
                                                                        handleDeleteBook(
                                                                            book
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </MDBCard>
                                                );
                                            })}
                                        </div>
                                    </MDBCol>

                                    <MDBCol lg="4">
                                        <div
                                            className="user-infor-container"
                                            style={{
                                                paddingTop: "45px",
                                            }}
                                        >
                                            <div class="form-floating mb-4">
                                                <input
                                                    disabled
                                                    type="email"
                                                    class="form-control"
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    value="thanhtaile3242@gmail.com"
                                                />
                                                <label for="floatingInput">
                                                    Email address
                                                </label>
                                            </div>
                                            <div class="form-floating mb-4">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                />
                                                <label for="floatingInput">
                                                    Fullname
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "20px",
                                                }}
                                            >
                                                <div class="form-floating mb-3">
                                                    <DatePicker
                                                        style={{
                                                            height: "100%",
                                                            backgroundColor:
                                                                "white",
                                                            border: "1px solid #dee2e6",
                                                        }}
                                                        format={"DD-MM-YYYY"}
                                                        onChange={onChange}
                                                        disabledDate={
                                                            disabledDate
                                                        }
                                                        allowClear
                                                    />
                                                    <label
                                                        className={
                                                            isSelectDate
                                                                ? "hidden"
                                                                : ""
                                                        }
                                                    >
                                                        Select date
                                                    </label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="floatingInput"
                                                        placeholder="name@example.com"
                                                    />
                                                    <label for="floatingInput">
                                                        Phone number
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <textarea
                                                    class="form-control"
                                                    placeholder="Leave a comment here"
                                                    id="floatingTextarea2"
                                                    style={{
                                                        height: "110px",
                                                        resize: "none",
                                                    }}
                                                />
                                                <label for="floatingTextarea2">
                                                    Note
                                                </label>
                                            </div>
                                            <div className="mb-2">
                                                <span
                                                    style={{ fontSize: "17" }}
                                                >
                                                    Total books: {total}
                                                </span>
                                            </div>
                                            <div>
                                                <span
                                                    className="btn"
                                                    style={{
                                                        marginTop: "5px",
                                                        fontSize: "18px",
                                                        width: "100%",
                                                        marginLeft: "0",
                                                        color: "white",
                                                        backgroundColor:
                                                            "#004380",
                                                    }}
                                                >
                                                    CHECK OUT
                                                </span>
                                            </div>
                                        </div>
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

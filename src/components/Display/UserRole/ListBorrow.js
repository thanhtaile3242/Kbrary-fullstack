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
import React from "react";
import { FaListCheck } from "react-icons/fa6";
import { FloatButton } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { MdLibraryBooks } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../SCSS/ListBorrow.scss";
import { FaClipboardList } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../utils/axiosCustomize.js";
const ListBorrow = (props) => {
    let listCurrent = useRef(props.listBorrowBook);
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const navigate = useNavigate();
    const listBorrowBook = props.listBorrowBook;
    const idPendingRequest = props.idPendingRequest;
    const [total, setTotal] = useState(null);
    const handleIncreaseBook = (item) => {
        const idItem = item.bookId._id;
        listBorrowBook.forEach((book) => {
            if (book.bookId._id === idItem) {
                book.quantityBorrow++;
            }
        });
        props.setListBorrowBook([...listBorrowBook]);
    };
    const handleDescreaseBook = (item) => {
        const idItem = item.bookId._id;
        listBorrowBook.forEach((book) => {
            if (book.bookId._id === idItem) {
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
        const idItem = item.bookId._id;
        const listBorrowBookNew = listBorrowBook.filter(
            (item) => item.bookId._id !== idItem
        );
        props.setListBorrowBook(listBorrowBookNew);
    };

    useEffect(() => {
        let count = null;
        listBorrowBook.forEach((item) => {
            count += item.quantityBorrow;
        });
        setTotal(count);
    });
    useEffect(() => {
        listCurrent.current = listBorrowBook;
        console.log("check list: ", listCurrent.current);
        console.log("check id user: ", userInfo.userId);
    });
    useEffect(() => {
        return async () => {
            const modifiedListBorrow = [...listCurrent.current];
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
        };
    }, []);

    const handleCreatePendingRequest = async () => {
        const listBorrowBooks = listBorrowBook.map((item) => {
            const objectBook = {
                bookId: item.bookId._id,
                quantityBorrow: item.quantityBorrow,
            };
            return objectBook;
        });
        const pendingRequest = {
            userId: userInfo?.userId,
            listBorrowBooks: listBorrowBooks,
            status: "PENDING",
        };
        const response = await axios.post(
            `api/userRequest/create`,
            pendingRequest
        );
        if (response.status === true) {
            toast.success("Create request success");
            navigate("/borrowPending");
        } else {
            return;
        }
    };
    const handleUpdatePendingRequest = async () => {
        const modifiedListBorrow = [...listBorrowBook];
        modifiedListBorrow.forEach((book) => {
            book.bookId = book.bookId._id;
        });
        const data = {
            requestId: idPendingRequest,
            listBorrowBooks: modifiedListBorrow,
        };
        const response = await axios.put(
            `api/userRequest/pending/update`,
            data
        );
        if (response.status == true) {
            navigate("/borrowPending");
            return;
        } else {
            return;
        }
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
                                            style={{ marginBottom: "15px" }}
                                            className="book-cart-title"
                                            tag="h5"
                                        ></MDBTypography>

                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p className="mb-0">
                                                You have {total} books in your
                                                cart
                                            </p>
                                            {/* <FloatButton
                                                tooltip={
                                                    <div>Detail borrow</div>
                                                }
                                                badge={{ count: total }}
                                                className="icon-noti detail-borrow"
                                                icon={<FaClipboardList />}
                                                onClick={
                                                    handleUpdatePendingRequest
                                                }
                                            /> */}
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
                                                                <div>
                                                                    <img
                                                                        src={`http://localhost:8802/${item.bookId.imageName}`}
                                                                        alt=""
                                                                        style={{
                                                                            width: "65px",
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        width: "170px",
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                        overflow:
                                                                            "hidden",
                                                                        textOverflow:
                                                                            "ellipsis",
                                                                    }}
                                                                >
                                                                    {
                                                                        item
                                                                            .bookId
                                                                            .bookName
                                                                    }
                                                                </div>
                                                                <div
                                                                    style={{
                                                                        alignItems:
                                                                            "center",
                                                                        display:
                                                                            "flex",
                                                                        gap: "10px",
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
                                                                                item
                                                                            );
                                                                        }}
                                                                    />
                                                                    <span
                                                                        style={{
                                                                            fontSize:
                                                                                "23px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.quantityBorrow
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
                                                                                item
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div>
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
                                                                                item
                                                                            );
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                );
                                            })}
                                        </div>
                                        <span
                                            className="btn-borrow"
                                            onClick={handleUpdatePendingRequest}
                                        >
                                            Detail
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

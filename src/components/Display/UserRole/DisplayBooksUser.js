import "../SCSS/DisplayBooks.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import ListBorrow from "./ListBorrow.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "../../utils/axiosCustomize.js";
import { useOutletContext } from "react-router-dom";
const DisplayBooks = (props) => {
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const listBook = props.listBook;
    // const [listBorrowBook, setListBorrowBook] = useState([]);
    // const [idPendingRequest, setIdPendingRequest] = useState("");
    let listCurrentBook = useRef([]);
    const listBorrowBook = props.listBorrowBook;
    const idPendingRequest = props.idPendingRequest;
    // useEffect(() => {
    //     async function fetchPendingRequest() {
    //         const response = await axios.get(
    //             `api/userRequest/pending/${userInfo?.userId}`
    //         );

    //         if (response.status == true) {
    //             if (response.data.length == 1) {
    //                 response.data[0].listBorrowBooks.forEach((item) => {
    //                     delete item._id;
    //                 });

    //                 setIdPendingRequest(response.data[0]._id);
    //                 setListBorrowBook(response.data[0].listBorrowBooks);
    //                 listCurrentBook.current = response.data[0].listBorrowBooks;
    //                 return;
    //             } else {
    //                 const pendingRequest = {
    //                     userId: userInfo?.userId,
    //                     listBorrowBooks: [],
    //                     status: "PENDING",
    //                 };
    //                 const response = await axios.post(
    //                     `api/userRequest/create`,
    //                     pendingRequest
    //                 );
    //                 if (response.status == true) {
    //                     setIdPendingRequest(response.data._id);
    //                 }
    //                 return;
    //             }
    //         } else {
    //             return;
    //         }
    //     }
    //     fetchPendingRequest();
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         async function updatePending() {
    //             const modifiedListBorrow = [...listCurrentBook.current];
    //             modifiedListBorrow.forEach((book) => {
    //                 book.bookId = book.bookId._id;
    //             });
    //             const data = {
    //                 userId: userInfo.userId,
    //                 listBorrowBooks: modifiedListBorrow,
    //             };
    //             const response = await axios.put(
    //                 `api/userRequest/pending/updateWithUserId`,
    //                 data
    //             );
    //         }
    //         updatePending();
    //     };
    // }, []);

    const handleAddBook = async (book) => {
        const idBook = book._id;
        const isExist = listBorrowBook.find(
            (book) => book.bookId._id === idBook
        );
        if (!isExist) {
            const newBook = {
                bookId: {
                    _id: book._id,
                    bookName: book.bookName,
                    category: book.category,
                    imageName: book.imageName,
                },
                quantityBorrow: 1,
            };
            props.setListBorrowBook([...listBorrowBook, newBook]);
        } else {
            listBorrowBook.forEach((book) => {
                if (book.bookId._id === idBook) {
                    book.quantityBorrow++;
                }
            });
            props.setListBorrowBook([...listBorrowBook]);
        }
    };
    useEffect(() => {
        let total = null;
        listBorrowBook.forEach((item) => {
            total += item.quantityBorrow;
        });
        setNumberBorrowBook(total);
    });

    return (
        <>
            <div className="book-container">
                {listBook.map((item) => {
                    return (
                        <div className="book-item">
                            <div className="image-container">
                                <img
                                    src={`http://localhost:8802/${item.imageName}`}
                                />
                            </div>
                            <div className="info-container">
                                <div className="book-detail">
                                    <h2>{item.bookName}</h2>
                                    <span>
                                        <b>Author: </b>
                                        {item.author}
                                    </span>
                                    <span>
                                        <b>Category: </b>
                                        {item.category.categoryName}
                                    </span>
                                    <div className="btn-container">
                                        <span className="btn btn-warning btn-more">
                                            More
                                        </span>

                                        <span
                                            className="btn btn-borrow"
                                            onClick={() => {
                                                handleAddBook(item);
                                            }}
                                        >
                                            Borrow
                                        </span>
                                    </div>
                                </div>
                                {item.status === "AVAILABLE" ? (
                                    <div className="status status2">
                                        <FaCheckCircle className="icon" />
                                        <span>Available</span>
                                    </div>
                                ) : (
                                    <div className="status2">
                                        <IoMdCloseCircle className="icon2" />
                                        <span>Out of stock</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="list-borrow-container">
                <ListBorrow
                    idPendingRequest={idPendingRequest}
                    listBorrowBook={listBorrowBook}
                    setListBorrowBook={props.setListBorrowBook}
                />
            </div>
        </>
    );
};
export default DisplayBooks;

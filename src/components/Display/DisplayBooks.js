import "./SCSS/DisplayBooks.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import book1 from "../../assets/book1.png";
import book2 from "../../assets/book2.png";
import ListBorrow from "./ListBorrow.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "../utils/axiosCustomize.js";
const DisplayBooks = (props) => {
    const listBook = props.listBook;
    const listBorrowBook = props.listBorrowBook;
    const handleAddBook = (book) => {
        const idBook = book._id;
        const isExist = listBorrowBook.find((book) => book._id === idBook);
        if (!isExist) {
            const newBook = { ...book, quantityBorrow: 1 };

            props.setListBorrowBook([...listBorrowBook, newBook]);
            return;
        } else {
            listBorrowBook.forEach((book) => {
                if (book._id === idBook) {
                    book.quantityBorrow++;
                }
            });
            props.setListBorrowBook([...listBorrowBook]);
            return;
        }
    };

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
                {/* <ListBorrow
                    listBorrowBook={props.listBorrowBook}
                    setListBorrowBook={props.setListBorrowBook}
                /> */}
            </div>
        </>
    );
};
export default DisplayBooks;

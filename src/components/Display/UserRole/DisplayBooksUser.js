import "../SCSS/DisplayBooks.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

import ListBorrow from "./ListBorrow.js";

import { useEffect } from "react";

import { useOutletContext } from "react-router-dom";
const DisplayBooks = (props) => {
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const listBook = props.listBook;
    const listBorrowBook = props.listBorrowBook;
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
    const handleChooseDetailBook = (book) => {
        const bookId = book._id;
        props.setIdDetailBook(bookId);
        props.handleShowDetailBook();
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
                                        <span
                                            className="btn btn-warning btn-more"
                                            onClick={() => {
                                                handleChooseDetailBook(item);
                                            }}
                                        >
                                            More
                                        </span>

                                        <span
                                            className="btn btn-borrow"
                                            onClick={() => {
                                                if (
                                                    item.status === "AVAILABLE"
                                                ) {
                                                    handleAddBook(item);
                                                } else {
                                                    return;
                                                }
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
                    listBorrowBook={listBorrowBook}
                    setListBorrowBook={props.setListBorrowBook}
                />
            </div>
        </>
    );
};
export default DisplayBooks;

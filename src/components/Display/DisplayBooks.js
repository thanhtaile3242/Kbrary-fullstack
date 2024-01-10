import "./SCSS/DisplayBooks.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import book1 from "../../assets/book1.png";
import book2 from "../../assets/book2.png";
import RequestBorrow from "./RequestBorrow.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "../utils/axiosCustomize.js";
const DisplayBooks = (props) => {
    const listBook = props.listBook;
    console.log("check", listBook);
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

                                        <span className="btn btn-borrow">
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
                <RequestBorrow listBook={listBook} />
            </div>
        </>
    );
};
export default DisplayBooks;

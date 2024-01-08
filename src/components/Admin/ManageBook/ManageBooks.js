import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import "./SCSS/ManageBooks.scss";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
// import "../ManageUser/SCSS/ManageUser.scss";

import { Breadcrumb } from "antd";

import ListBook from "./ListBook.js";
import CreateBook from "./CreateBook.js";
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const ManageBooks = () => {
    // 1. List books
    const [showListBook, setShowListBook] = useState(true);
    // const [listBook, setListBook] = useState([]);
    // 2. Modal create book
    const [showCreateBook, setShowCreateBook] = useState(false);
    // Handle function
    const handleShowCreateBook = () => {
        setShowListBook(false);
        setShowCreateBook(true);
    };
    const handleShowListBook = () => {
        setShowListBook(true);
        setShowCreateBook(false);
    };
    return (
        <>
            <div className="manage-book-header">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: (
                                <span
                                    onClick={handleShowListBook}
                                    className="list-book-icon"
                                >
                                    List books
                                </span>
                            ),
                        },
                        {
                            title: <span>Detail</span>,
                        },
                    ]}
                />
            </div>
            {showListBook && (
                <ListBook handleShowCreateBook={handleShowCreateBook} />
            )}
            {showCreateBook && (
                <CreateBook handleShowListBook={handleShowListBook} />
            )}
        </>
    );
};
export default ManageBooks;

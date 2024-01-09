import React, { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import "./SCSS/ManageBooks.scss";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { Breadcrumb } from "antd";
import DetailBook from "./DetailBook.js";
import ListBook from "./ListBook.js";
import CreateBook from "./CreateBook.js";

const ManageBooks = () => {
    // 1. List books
    const [showListBook, setShowListBook] = useState(true);
    // 2. Create book
    const [showCreateBook, setShowCreateBook] = useState(false);
    // 3, Detail book
    const [showDetailBook, setShowDetailBook] = useState(false);
    const [idDetailBook, setIdDetailBook] = useState("");

    // Handle function
    const handleShowCreateBook = () => {
        setShowListBook(false);
        setShowDetailBook(false);
        setShowCreateBook(true);
    };
    const handleShowListBook = () => {
        setShowDetailBook(false);
        setShowCreateBook(false);
        setShowListBook(true);
    };
    const handleShowDetailBook = () => {
        setShowCreateBook(false);
        setShowListBook(false);
        setShowDetailBook(true);
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
                <ListBook
                    handleShowCreateBook={handleShowCreateBook}
                    handleShowDetailBook={handleShowDetailBook}
                    setIdDetailBook={setIdDetailBook}
                />
            )}
            {showCreateBook && (
                <CreateBook handleShowListBook={handleShowListBook} />
            )}
            {showDetailBook && (
                <DetailBook
                    handleShowListBook={handleShowListBook}
                    idDetailBook={idDetailBook}
                />
            )}
        </>
    );
};
export default ManageBooks;

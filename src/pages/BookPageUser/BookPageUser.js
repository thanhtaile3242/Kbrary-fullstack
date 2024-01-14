import Filter from "../../components/Filter/Filter.js";
import DisplayBooksUser from "../../components/Display/UserRole/DisplayBooksUser.js";
import "./BookPage.scss";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../components/utils/axiosCustomize.js";
import DetailPendingRequest from "../UserRole/DetailPendingRequest.js";
import DetailBookUser from "../../components/Display/UserRole/DetailBookUser";
const BookPageUser = () => {
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const [listBook, setListBook] = useState([]);
    const [listBorrowBook, setListBorrowBook] = useState([]);
    const [idDetailBook, setIdDetailBook] = useState("");
    let listPending = useRef();
    //
    const [showListBooks, setShowListBooks] = useState(true);
    const [showDetailBook, setShowDetailBook] = useState(false);
    const handleShowListBook = () => {
        setShowListBooks(true);
        setShowDetailBook(false);
    };
    const handleShowDetailBook = () => {
        setShowListBooks(false);
        setShowDetailBook(true);
    };
    useEffect(() => {
        async function fetchData() {
            const responseBook = await axios.get("api/book/find");
            if (responseBook.status === true) {
                setListBook(responseBook.data);
            } else {
                return;
            }
            const listSave = JSON.parse(
                localStorage.getItem("pending-list-kbrary")
            );
            if (listSave) {
                setListBorrowBook(listSave);
                return;
            } else {
                return;
            }
        }
        fetchData();

        return () => {
            localStorage.setItem(
                "pending-list-kbrary",
                JSON.stringify(listPending.current)
            );
        };
    }, []);
    useEffect(() => {
        listPending.current = listBorrowBook;
    });
    const handleAddBook1 = async (idBook, newBook) => {
        const isExist = listBorrowBook.find(
            (book) => book.bookId._id === idBook
        );
        if (!isExist) {
            setListBorrowBook([...listBorrowBook, newBook]);
        } else {
            listBorrowBook.forEach((book) => {
                if (book.bookId._id === idBook) {
                    book.quantityBorrow++;
                }
            });
            setListBorrowBook([...listBorrowBook]);
        }
    };
    return (
        <>
            {showListBooks && (
                <div className="manage-container">
                    <Filter setListBook={setListBook} />

                    <div className="manage-main">
                        <DisplayBooksUser
                            listBook={listBook}
                            setIdDetailBook={setIdDetailBook}
                            listBorrowBook={listBorrowBook}
                            setListBorrowBook={setListBorrowBook}
                            handleShowDetailBook={handleShowDetailBook}
                        />
                    </div>
                </div>
            )}
            {showDetailBook && (
                <div className="detail-book-user">
                    <DetailBookUser
                        idDetailBook={idDetailBook}
                        handleShowListBook={handleShowListBook}
                        handleAddBook1={handleAddBook1}
                    />
                </div>
            )}
        </>
    );
};
export default BookPageUser;

import "./BookPage.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../components/utils/axiosCustomize.js";
import Filter from "../../components/Filter/Filter.js";
import DetailBookUser from "../../components/Display/UserRole/DetailBookUser";
import DisplayBooksUser from "../../components/Display/UserRole/DisplayBooksUser.js";
const BookPageUser = () => {
    const navigate = useNavigate();
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
        const user = localStorage.getItem("user-info-kbrary");
        if (!user) {
            navigate("/signup");
            return;
        }

        async function fetchData() {
            const responseBook = await axios.get("api/book/find");
            if (responseBook.status === true) {
                setListBook(responseBook.data);
            }
        }
        fetchData();
        const listSave = JSON.parse(
            localStorage.getItem("pending-list-kbrary")
        );
        listPending.current = listSave;

        if (listSave?.length > 0) {
            setListBorrowBook(listSave);
        }
        return function clear() {
            localStorage.setItem(
                "pending-list-kbrary",
                JSON.stringify([...listPending.current])
            );
        };
    }, []);
    useEffect(() => {
        listPending.current = listBorrowBook;
    }, [listBorrowBook]);

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

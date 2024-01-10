import Filter from "../../components/Filter/Filter.js";
import DisplayBooks from "../../components/Display/DisplayBooks.js";
import "./BookPage.scss";
import { useState, useEffect } from "react";
import axios from "../../components/utils/axiosCustomize.js";
import UserBorrow from "../UserRole/UserBorrow.js";

const BookPageUser = () => {
    const [listBook, setListBook] = useState([]);
    const [listBorrowBook, setListBorrowBook] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const responseBook = await axios.get("api/book/find");
            if (responseBook.status === true) {
                setListBook(responseBook.data);
            } else {
                return;
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="manage-container">
                <Filter setListBook={setListBook} />

                <div className="manage-main">
                    <DisplayBooks
                        listBook={listBook}
                        listBorrowBook={listBorrowBook}
                        setListBorrowBook={setListBorrowBook}
                    />
                </div>
            </div>
        </>
    );
};
export default BookPageUser;

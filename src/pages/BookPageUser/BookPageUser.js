import Filter from "../../components/Filter/Filter.js";
import DisplayBooksUser from "../../components/Display/UserRole/DisplayBooksUser.js";
import "./BookPage.scss";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "../../components/utils/axiosCustomize.js";
import DetailPendingRequest from "../UserRole/DetailPendingRequest.js";

const BookPageUser = () => {
    const [avatar, setAvatar, role, setNumberBorrowBook, userInfo] =
        useOutletContext();
    const [listBook, setListBook] = useState([]);
    const [listBorrowBook, setListBorrowBook] = useState([]);
    let listPending = useRef();
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
    return (
        <>
            <div className="manage-container">
                <Filter setListBook={setListBook} />

                <div className="manage-main">
                    <DisplayBooksUser
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

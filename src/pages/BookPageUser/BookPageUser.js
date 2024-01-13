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
    const [idPendingRequest, setIdPendingRequest] = useState("");
    let listCurrentBook = useRef([]);
    useEffect(() => {
        async function fetchData() {
            const responseBook = await axios.get("api/book/find");
            if (responseBook.status === true) {
                setListBook(responseBook.data);
                const response = await axios.get(
                    `api/userRequest/pending/${userInfo?.userId}`
                );
                if (response.status == true) {
                    if (response.data.length == 1) {
                        response.data[0].listBorrowBooks.forEach((item) => {
                            delete item._id;
                        });
                        setIdPendingRequest(response.data[0]._id);
                        setListBorrowBook(response.data[0].listBorrowBooks);
                        listCurrentBook.current =
                            response.data[0].listBorrowBooks;
                        return;
                    } else {
                        const pendingRequest = {
                            userId: userInfo?.userId,
                            listBorrowBooks: [],
                            status: "PENDING",
                        };
                        const response = await axios.post(
                            `api/userRequest/create`,
                            pendingRequest
                        );
                        if (response.status == true) {
                            setIdPendingRequest(response.data._id);
                        }
                        return;
                    }
                } else {
                    return;
                }
            } else {
                return;
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        listCurrentBook.current = listBorrowBook;
    }, [listBorrowBook]);
    return (
        <>
            <div className="manage-container">
                <Filter setListBook={setListBook} />

                <div className="manage-main">
                    <DisplayBooksUser
                        listBook={listBook}
                        listBorrowBook={listBorrowBook}
                        setListBorrowBook={setListBorrowBook}
                        idPendingRequest={idPendingRequest}
                    />
                </div>
            </div>
        </>
    );
};
export default BookPageUser;

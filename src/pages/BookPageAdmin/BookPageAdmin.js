import Filter from "../../components/Filter/Filter.js";
import DisplayBooksAdmin from "../../components/Display/AdminRole/DisplayBooksAdmin.js";
import "./BookPage.scss";
import { useState, useEffect } from "react";
import axios from "../../components/utils/axiosCustomize.js";

//

//
const BookPage = () => {
    const [listBook, setListBook] = useState([]);
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
                    <DisplayBooksAdmin listBook={listBook} />
                </div>
            </div>
        </>
    );
};
export default BookPage;

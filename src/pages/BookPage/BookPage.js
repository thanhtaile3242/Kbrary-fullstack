import Header from "../../components/Header/Header.js";
import Filter from "../../components/Filter/Filter.js";
import DisplayBooks from "../../components/Display/DisplayBooks.js";
import "./BookPage.scss";
import { useState, useEffect } from "react";
import axios from "../../components/utils/axiosCustomize.js";
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
            // const responseCategory = await axios.get("api/category/getAll");
            // if (responseCategory.status === true) {
            //     setListCategory(responseCategory.data);
            // } else {
            //     return;
            // }
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="manage-container">
                <Filter setListBook={setListBook} />
                <div className="manage-main">
                    <DisplayBooks listBook={listBook} />
                </div>
            </div>
        </>
    );
};
export default BookPage;

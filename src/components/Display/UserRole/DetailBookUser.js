import { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import "../../Admin/ManageBook/SCSS/CreateBook.scss";

const DetailBookUser = (props) => {
    // Book name
    const [bookName, setBookName] = useState("");
    // Status
    const [status, setStatus] = useState("");
    // Category
    const [category, setCategory] = useState("");
    // Description
    const [description, setDescription] = useState("");
    // Author
    const [author, setAuthor] = useState("");
    // Image book
    const [urlImage, setURLImage] = useState("");
    // Handle function
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `api/book/detailBookUser/${props.idDetailBook}`
            );
            if (response.status == true) {
                setBookName(response.data.bookName);
                setStatus(response.data.status);
                setCategory(response.data.category.categoryName);
                setDescription(response.data.description);
                setAuthor(response.data.author);
                setURLImage(response.data.imageName);
            } else {
                return;
            }
        }
        fetchData();
    }, []);
    const handleAddBook2 = () => {
        const newBook = {
            bookId: {
                _id: props.idDetailBook,
                bookName: bookName,
                category: category,
                imageName: urlImage,
            },
            quantityBorrow: 1,
        };
        const idBook = props.idDetailBook;
        props.handleAddBook1(idBook, newBook);
        props.handleShowListBook();
    };
    return (
        <>
            <div className="detail-book-container">
                <div className="book-image">
                    <img src={`http://localhost:8802/${urlImage}`} alt="" />
                </div>
                <div className="book-content">
                    <div className="two-items-row-1">
                        <div class="form-floating mb-4">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="bookname"
                                value={bookName}
                            />
                            <label for="floatingInput">Book name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Author"
                                value={status}
                            />
                            <label for="floatingSelect">Status</label>
                        </div>
                    </div>
                    <div className="two-items-row-2 mb-4">
                        <div class="form-floating category-list">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Author"
                                value={category}
                            />
                            <label for="floatingPassword">Category</label>
                        </div>
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Author"
                                value={author}
                            />
                            <label for="floatingPassword">Author</label>
                        </div>
                    </div>
                    <div className="description-container mb-4">
                        <div class="form-floating">
                            <textarea
                                class="form-control description-text"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                value={description}
                            />
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                    <div className="save-book-btn">
                        <span
                            className="btn btn-secondary btn-back"
                            onClick={props.handleShowListBook}
                        >
                            Back
                        </span>
                        {status == "AVAILABLE" && (
                            <span
                                className="btn btn-primary"
                                onClick={handleAddBook2}
                            >
                                Borrow book
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBookUser;

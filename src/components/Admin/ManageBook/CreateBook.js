import BookDefault from "../../../assets/bookDefault.png";
import { useState, useEffect } from "react";
import ModalImageBook from "./ModalImageBook.js";
import ModalAddCategory from "./ModalAddCategory.js";
import Avatar from "react-avatar-edit";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../utils/axiosCustomize.js";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";
import "./SCSS/CreateBook.scss";

const CreateBook = (props) => {
    const navigate = useNavigate();
    // Image Book
    const [showImageEdit, setShowImageEdit] = useState(false);
    // The image file
    const [bookImageFile, setBookImageFile] = useState(null);
    // The edit image
    const [imageEditor, setImageEditor] = useState(null);
    // The final image URL
    const [bookImageFinalURL, setBookImageFinalURL] = useState("");
    // Modal add category
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // Book name
    const [bookName, setBookName] = useState(null);
    // Status
    const [status, setStatus] = useState(null);
    // Quantity
    const [quantity, setQuantity] = useState(null);
    // Description
    const [description, setDescription] = useState(null);

    // Handle function
    useEffect(() => {
        async function fetchCategory() {
            const response = await axios.get("api/category/getAll");
            if (response.status === true) {
                setListCategory(response.data);
                return;
            } else {
                return;
            }
        }
        fetchCategory();
    }, []);

    const handleCreateBook = async () => {
        // Validate
        if (
            bookName &&
            status &&
            quantity &&
            selectedCategory &&
            description &&
            bookImageFile
        ) {
            const data = new FormData();
            data.append("bookName", bookName);
            data.append("category", selectedCategory);
            data.append("quantity", +quantity);
            data.append("status", status);
            data.append("description", description);
            data.append("imageBook", bookImageFile);

            const response = await axios.post("api/book/create", data);
            if (response.status === true) {
                toast.success("Create a book successfully");
                props.handleShowListBook();
            } else {
            }
        } else {
            toast.error("Fulfill information required");
            return;
        }
    };

    return (
        <>
            <div className="create-book-container">
                <div className="book-content">
                    <div className="two-items-row-1">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="bookname"
                                onChange={(event) => {
                                    setBookName(event.target.value);
                                }}
                            />
                            <label for="floatingInput">Book name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <select
                                class="form-select"
                                id="floatingSelect"
                                onChange={(event) => {
                                    setStatus(event.target.value);
                                }}
                            >
                                <option value={null}>...</option>
                                <option value="AVAILABLE">Available</option>
                                <option value="OUTOFSTOCK">Out of Stock</option>
                            </select>
                            <label for="floatingSelect">Status</label>
                        </div>
                    </div>
                    <div className="two-items-row-2 mb-4">
                        <div class="form-floating">
                            <input
                                type="number"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Quality"
                                onChange={(event) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                            <label for="floatingPassword">Quantity</label>
                        </div>
                        <div class="form-floating category-list">
                            <select
                                class="form-select "
                                id="floatingSelect"
                                onChange={(event) => {
                                    setSelectedCategory(event.target.value);
                                }}
                            >
                                <option value={null}>...</option>
                                {listCategory.map((item) => {
                                    return (
                                        <option value={item.categoryName}>
                                            {item.categoryName}
                                        </option>
                                    );
                                })}
                            </select>
                            <label for="floatingPassword">Category</label>
                            <IoIosAddCircle
                                className="icon"
                                onClick={() => {
                                    setShowAddCategory(true);
                                }}
                            />
                        </div>
                    </div>
                    <div className="description-container mb-3">
                        <div class="form-floating">
                            <textarea
                                class="form-control description-text"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                    <div className="save-book-btn">
                        <span
                            className="btn btn-primary"
                            onClick={handleCreateBook}
                        >
                            Save book
                        </span>
                    </div>
                </div>
                <div className="book-image">
                    <div className="image-change-container">
                        <img
                            src={
                                bookImageFinalURL
                                    ? bookImageFinalURL
                                    : BookDefault
                            }
                            className="avatar-change"
                        />
                        <div className="image-editor">
                            <ModalImageBook
                                showImageEdit={showImageEdit}
                                imageEditor={imageEditor}
                                bookImageFile={bookImageFile}
                                setShowImageEdit={setShowImageEdit}
                                setImageEditor={setImageEditor}
                                setBookImageFile={setBookImageFile}
                                setBookImageFinalURL={setBookImageFinalURL}
                            />
                        </div>
                        <span
                            className="btn btn-primary"
                            onClick={() => {
                                setShowImageEdit(true);
                            }}
                        >
                            Update Image
                        </span>
                    </div>
                </div>
            </div>
            <ModalAddCategory
                listCategory={listCategory}
                setListCategory={setListCategory}
                showAddCategory={showAddCategory}
                setShowAddCategory={setShowAddCategory}
            />
        </>
    );
};

export default CreateBook;

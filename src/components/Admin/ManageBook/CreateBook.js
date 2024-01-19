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
    const [quantitySystem, setQuantitySystem] = useState(null);
    // Description
    const [description, setDescription] = useState(null);
    // Author
    const [author, setAuthor] = useState("");
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
            quantitySystem &&
            selectedCategory &&
            description &&
            bookImageFile &&
            author
        ) {
            const data = new FormData();
            data.append("bookName", bookName);
            data.append("category", selectedCategory);
            data.append("author", author);
            data.append("description", description);
            data.append("imageBook", bookImageFile);
            if (status == "OUTOFSTOCK" || quantitySystem == "0") {
                data.append("status", "OUTOFSTOCK");
                data.append("quantitySystem", +"0");
            } else {
                data.append("status", status);
                data.append("quantitySystem", +quantitySystem);
            }

            const response = await axios.post("api/book/create", data);
            if (response.status === true) {
                toast.success("Create a book successfully");
                props.handleShowListBook();
                return;
            } else {
                return;
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
                                style={{ fontWeight: "bold" }}
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="bookname"
                                onChange={(event) => {
                                    setBookName(event.target.value);
                                }}
                            />
                            <label
                                for="floatingInput"
                                style={{ fontWeight: "bold" }}
                            >
                                Book name
                            </label>
                        </div>
                        <div class="form-floating mb-3">
                            <select
                                style={{ fontWeight: "bold" }}
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
                            <label
                                for="floatingSelect"
                                style={{ fontWeight: "bold" }}
                            >
                                Status
                            </label>
                        </div>
                    </div>
                    <div className="two-items-row-2 mb-4 three-item">
                        <div class="form-floating">
                            <input
                                style={{ fontWeight: "bold" }}
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Author"
                                onChange={(event) => {
                                    setAuthor(event.target.value);
                                }}
                            />
                            <label
                                for="floatingPassword"
                                style={{ fontWeight: "bold" }}
                            >
                                Author
                            </label>
                        </div>
                        <div class="form-floating">
                            <input
                                style={{ fontWeight: "bold" }}
                                type="number"
                                class="form-control"
                                id="floatingPassword"
                                value={quantitySystem}
                                placeholder="Quality"
                                onChange={(event) => {
                                    setQuantitySystem(event.target.value);
                                }}
                            />
                            <label
                                for="floatingPassword"
                                style={{ fontWeight: "bold" }}
                            >
                                Quantity
                            </label>
                        </div>
                        <div class="form-floating category-list">
                            <select
                                style={{ fontWeight: "bold" }}
                                class="form-select "
                                id="floatingSelect"
                                onChange={(event) => {
                                    setSelectedCategory(event.target.value);
                                }}
                            >
                                <option value={null}>...</option>
                                {listCategory.map((item) => {
                                    return (
                                        <option value={item._id}>
                                            {item.categoryName}
                                        </option>
                                    );
                                })}
                            </select>
                            <label
                                for="floatingPassword"
                                style={{ fontWeight: "bold" }}
                            >
                                Category
                            </label>
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
                                style={{ fontWeight: "bold" }}
                                class="form-control description-text"
                                placeholder="Leave a comment here"
                                id="floatingTextarea2"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <label
                                for="floatingTextarea2"
                                style={{ fontWeight: "bold" }}
                            >
                                Description
                            </label>
                        </div>
                    </div>
                    <div className="save-book-btn">
                        <span
                            style={{ fontWeight: "bold", marginLeft: "0px" }}
                            className="btn btn-secondary"
                            onClick={props.handleShowListBook}
                        >
                            Back
                        </span>

                        <span
                            style={{ fontWeight: "bold" }}
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
                            style={{ fontWeight: "bold" }}
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
                setShowAddCategory={setShowAddCategory}
            />
        </>
    );
};

export default CreateBook;

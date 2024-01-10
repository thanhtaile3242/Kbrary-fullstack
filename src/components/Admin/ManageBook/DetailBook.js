import BookDefault from "../../../assets/bookDefault.png";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalImageBookDetail from "./ModalImageDetail.js";
import ModalAddCategory from "./ModalAddCategory.js";
import Avatar from "react-avatar-edit";
import axios from "../../utils/axiosCustomize.js";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import { IoIosAddCircle } from "react-icons/io";
import "./SCSS/CreateBook.scss";

const DetailBook = (props) => {
    // Image Book
    const [showImageEdit, setShowImageEdit] = useState(false);
    // The image file
    const [bookImageFile, setBookImageFile] = useState(null);
    // The edit image
    const [imageEditor, setImageEditor] = useState(null);
    // The final image URL (Preview)
    const [bookImageFinalURL, setBookImageFinalURL] = useState("");

    // URL image from database
    const [urlImageDB, setURLImageDB] = useState("");
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
    // Author
    const [author, setAuthor] = useState("");
    // Modal delete book
    const [show, setShow] = useState(false);
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

    useEffect(() => {
        async function fetchBook() {
            const response = await axios.get(
                `api/book/detailBook/${props.idDetailBook}`
            );

            if (response.status === true) {
                setBookName(response.data.bookName);
                setStatus(response.data.status);
                setQuantity(response.data.quantity);
                setSelectedCategory(response.data.category);
                setDescription(response.data.description);
                setAuthor(response.data.author);
                setURLImageDB(response.data.imageName);
                return;
            } else {
                return;
            }
        }
        fetchBook();
    }, []);

    const handleUpdateBook = async () => {
        // Validate
        if (
            bookName &&
            status &&
            quantity &&
            selectedCategory &&
            description &&
            author
        ) {
            const data = {
                id: props.idDetailBook,
                bookName: bookName,
                status: status,
                author: author,
                category: selectedCategory,
                description: description,
                quantity: quantity.toString(),
            };

            const response = await axios.put("api/book/update", data);
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

    const handleDeleteBook = async () => {
        const response = await axios.delete(
            `api/book/delete/${props.idDetailBook}`
        );
        if (response.status === true) {
            toast.success(response.message);
            props.handleShowListBook(true);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    return (
        <>
            <div className="create-book-container">
                <DeleteOutlined
                    className="delete-icon-detail"
                    onClick={() => {
                        setShow(true);
                    }}
                />
                <div className="book-content">
                    <div className="two-items-row-1">
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="bookname"
                                value={bookName}
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
                                value={status}
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
                    <div className="two-items-row-2 mb-4 three-item">
                        <div class="form-floating">
                            <input
                                type="text"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Author"
                                value={author}
                                onChange={(event) => {
                                    setAuthor(event.target.value);
                                }}
                            />
                            <label for="floatingPassword">Author</label>
                        </div>
                        <div class="form-floating">
                            <input
                                type="number"
                                class="form-control"
                                id="floatingPassword"
                                value={quantity}
                                placeholder="Quality"
                                onChange={(event) => {
                                    setQuantity(event.target.value);
                                }}
                            />
                            <label for="floatingPassword">Quantity</label>
                        </div>
                        <div class="form-floating category-list">
                            <select
                                class="form-select"
                                value={selectedCategory}
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
                                value={description}
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                            />
                            <label for="floatingTextarea2">Description</label>
                        </div>
                    </div>
                    <div className="save-book-btn">
                        <span
                            className="btn btn-secondary"
                            onClick={props.handleShowListBook}
                        >
                            Back
                        </span>
                        <span
                            className="btn btn-primary"
                            onClick={handleUpdateBook}
                        >
                            Update book
                        </span>
                    </div>
                </div>
                <div className="book-image">
                    <div className="image-change-container">
                        <img
                            src={
                                bookImageFinalURL
                                    ? bookImageFinalURL
                                    : `http://localhost:8802/${urlImageDB}`
                            }
                            className="avatar-change"
                        />
                        <div className="image-editor">
                            <ModalImageBookDetail
                                bookId={props.idDetailBook}
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
            <div className="modal-delete">
                {/* Modal delete */}
                <Modal
                    className="delete-modal"
                    style={{ top: "200px" }}
                    backdrop="static"
                    show={show}
                    onHide={() => {
                        setShow(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete the book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontWeight: "300" }}>
                        Having book name:&nbsp;<b>{bookName}</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <span
                            className="btn btn-secondary"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Close
                        </span>
                        <span
                            className="btn btn-primary"
                            onClick={() => {
                                handleDeleteBook();
                            }}
                        >
                            Confirm
                        </span>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default DetailBook;

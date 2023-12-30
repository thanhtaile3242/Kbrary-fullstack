import "./DisplayBooks.scss";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import book1 from "../../assets/book1.png";
import book2 from "../../assets/book2.png";
import RequestBorrow from "./RequestBorrow.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import { MDBIcon } from "mdb-react-ui-kit";

const DisplayBooks = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <div className="book-container">
                <div className="book-item">
                    <div className="image-container">
                        <img src={book1} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2>Hạt giống tâm hồn 2</h2>
                            <span>
                                <b>Tác giả: </b>Nhiều tác giả
                            </span>
                            <span>
                                <b>Nhà xuất bản: </b>Nhã Nam
                            </span>
                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status">
                            <FaCheckCircle className="icon" />
                            <span>Còn sách</span>
                        </div>
                    </div>
                </div>

                <div className="book-item">
                    <div className="image-container">
                        <img src={book2} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2 className="book-title">
                                Tái tạo mô hình kinh doanh hiệu quả
                            </h2>

                            <span>
                                <b>Tác giả: </b>Mark W JohnSon
                            </span>

                            <span>
                                <b>Nhà xuất bản: </b>1980 Books
                            </span>

                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status2">
                            <IoMdCloseCircle className="icon2" />
                            <span>Hết sách</span>
                        </div>
                    </div>
                </div>

                <div className="book-item">
                    <div className="image-container">
                        <img src={book1} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2>Hạt giống tâm hồn 2</h2>
                            <span>
                                <b>Tác giả: </b>Nhiều tác giả
                            </span>
                            <span>
                                <b>Nhà xuất bản: </b>Nhã Nam
                            </span>
                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status">
                            <FaCheckCircle className="icon" />
                            <span>Còn sách</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <div className="image-container">
                        <img src={book1} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2>Hạt giống tâm hồn 2</h2>
                            <span>
                                <b>Tác giả: </b>Nhiều tác giả
                            </span>
                            <span>
                                <b>Nhà xuất bản: </b>Nhã Nam
                            </span>
                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status">
                            <FaCheckCircle className="icon" />
                            <span>Còn sách</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <div className="image-container">
                        <img src={book1} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2>Hạt giống tâm hồn 2</h2>
                            <span>
                                <b>Tác giả: </b>Nhiều tác giả
                            </span>
                            <span>
                                <b>Nhà xuất bản: </b>Nhã Nam
                            </span>
                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status">
                            <FaCheckCircle className="icon" />
                            <span>Còn sách</span>
                        </div>
                    </div>
                </div>
                <div className="book-item">
                    <div className="image-container">
                        <img src={book1} />
                    </div>

                    <div className="info-container">
                        <div className="book-detail">
                            <h2>Hạt giống tâm hồn 2</h2>
                            <span>
                                <b>Tác giả: </b>Nhiều tác giả
                            </span>
                            <span>
                                <b>Nhà xuất bản: </b>Nhã Nam
                            </span>
                            <div className="btn-container">
                                <span className="btn btn-warning">
                                    Xem chi tiết
                                </span>

                                <span className="btn btn-borrow">
                                    Mượn sách
                                </span>
                            </div>
                        </div>

                        <div className="status">
                            <FaCheckCircle className="icon" />
                            <span>Còn sách</span>
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
            <div className="list-borrow-container">
                <RequestBorrow setModalShow={setModalShow} />
            </div>
        </>
    );
};
export default DisplayBooks;

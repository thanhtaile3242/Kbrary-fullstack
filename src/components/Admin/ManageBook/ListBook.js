import { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import { FaSearch } from "react-icons/fa";
import { Select } from "antd";
import "./SCSS/ListBook.scss";
import { MdFilterAltOff } from "react-icons/md";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
function filterArray(input, data) {
    const filteredData = data.filter(
        (item) => item.email.includes(input) || item.username.includes(input)
    );
    return filteredData;
}
const ListBook = (props) => {
    const [listBook, setListBook] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    //
    const [bookName, setBookName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const handleClearFilter = async () => {
        setBookName("");
        setCategory(null);
        setStatus(null);
        const response = await axios.get(`api/book/getAll`);
        if (response.status === true) {
            setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    useEffect(() => {
        if (bookName === "") {
            async function fetchListBook() {
                const response = await axios.get(`api/book/getAll`);
                if (response.status === true) {
                    setListBook(response.data);
                    return;
                } else {
                    return;
                }
            }
            fetchListBook();
        }
    }, [bookName]);

    useEffect(() => {
        async function fetchListBook() {
            const responseBook = await axios.get("api/book/getAll");
            if (responseBook.status === true) {
                setListBook(responseBook.data);
            } else {
                return;
            }
            const responseCategory = await axios.get("api/category/getAll");
            if (responseCategory.status === true) {
                setListCategory(responseCategory.data);
            } else {
                return;
            }
        }
        fetchListBook();
    }, []);

    const handleSelectBookId = (id) => {
        props.handleShowDetailBook();
        props.setIdDetailBook(id);
    };

    const handleSearchBooks = async (event) => {
        event.preventDefault();
        const queryParams = {
            bookName,
            category,
            status,
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`api/book/find?${queryString}`);
        if (response.status === true) {
            setListBook(response.data);
            return;
        } else {
            return;
        }
    };

    return (
        <>
            <div className="search-container">
                <div className="find-book-container">
                    <form
                        style={{ height: "38px" }}
                        onSubmit={(event) => {
                            handleSearchBooks(event);
                        }}
                    >
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search book name"
                            value={bookName}
                            onChange={(event) => {
                                setBookName(event.target.value);
                            }}
                        />
                        <FaSearch className="search-icon" />
                    </form>

                    <Select
                        className="category-select"
                        size="large"
                        allowClear
                        showSearch
                        value={category}
                        name="category nè"
                        placeholder="Select category"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setCategory(value);
                        }}
                        options={listCategory.map((item) => {
                            return {
                                value: item.categoryName,
                                label: item.categoryName,
                            };
                        })}
                    />
                    <Select
                        className="status-select"
                        size="large"
                        allowClear
                        showSearch
                        value={status}
                        name="status nè"
                        placeholder="Select status"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setStatus(value);
                        }}
                        options={[
                            {
                                value: "AVAILABLE",
                                label: "Available",
                            },
                            {
                                value: "OUTOFSTOCK",
                                label: "Out of stock",
                            },
                        ]}
                    />
                    <MdFilterAltOff
                        className="remove-filter-icon"
                        onClick={handleClearFilter}
                    />
                </div>

                <span
                    className="btn btn-primary"
                    onClick={props.handleShowCreateBook}
                >
                    Create new book
                </span>
            </div>
            <Table
                dataSource={listBook}
                pagination={{
                    pageSize: 8,
                }}
            >
                <Column
                    title="Book"
                    key="bookName"
                    ellipsis="true"
                    align="left"
                    render={(record) => (
                        <span
                            className="detail-account"
                            onClick={() => {
                                handleSelectBookId(record._id);
                            }}
                        >
                            {record.bookName}
                        </span>
                    )}
                />
                <Column
                    title="Category"
                    dataIndex="category"
                    key="category"
                    align="left"
                />
                <Column
                    title="Quantity"
                    dataIndex="quantity"
                    key="quantity"
                    align="left"
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(record) => {
                        let color = "";
                        if (record === "AVAILABLE") {
                            color = "green";
                        }
                        if (record === "OUTOFSTOCK") {
                            color = "volcano";
                        }
                        return <Tag color={color}>{record}</Tag>;
                    }}
                    align="left"
                />
            </Table>
        </>
    );
};

export default ListBook;

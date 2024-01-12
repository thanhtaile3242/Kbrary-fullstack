import { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import { FaSearch } from "react-icons/fa";
import { Select } from "antd";
import { FaArrowDown } from "react-icons/fa";
import "./SCSS/ListBook.scss";
import { MdFilterAltOff } from "react-icons/md";
import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

const ListBook = (props) => {
    const [listBook, setListBook] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [bookName, setBookName] = useState("");
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(null);

    useEffect(() => {
        async function fetchListBook() {
            const responseBook = await axios.get("api/book/find");
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
    const handleClearFilter = async () => {
        setBookName("");
        setCategory(null);
        setStatus(null);
        setSortCriteria(null);
        const response = await axios.get(`api/book/find`);
        if (response.status === true) {
            setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    useEffect(() => {
        handleSearchBooksNotPrevent();
    }, [bookName]);
    useEffect(() => {
        handleSearchBooksNotPrevent();
    }, [category]);
    useEffect(() => {
        handleSearchBooksNotPrevent();
    }, [status]);
    useEffect(() => {
        handleSearchBooksNotPrevent();
    }, [sortCriteria]);
    const handleSelectBookId = (id) => {
        props.handleShowDetailBook();
        props.setIdDetailBook(id);
    };
    const handleSearchBooks = async (event) => {
        event.preventDefault();
        let sortField = null;
        let sortOrder = null;
        if (sortCriteria === "nameASC") {
            sortField = "name";
            sortOrder = "ASC";
        }
        if (sortCriteria === "nameDESC") {
            sortField = "name";
            sortOrder = "DESC";
        }
        if (sortCriteria === "timeASC") {
            sortField = "time";
            sortOrder = "ASC";
        }
        if (sortCriteria === "timeDESC") {
            sortField = "time";
            sortOrder = "DESC";
        }

        const queryParams = {
            bookName,
            category,
            status,
            sortField,
            sortOrder,
        };
        if (!status) {
            delete queryParams.status;
        }
        if (!category) {
            delete queryParams.category;
        }
        if (!bookName) {
            delete queryParams.bookName;
        }
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`api/book/find?${queryString}`);
        if (response.status === true) {
            setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    const handleSearchBooksNotPrevent = async () => {
        let sortField = null;
        let sortOrder = null;
        if (sortCriteria === "nameASC") {
            sortField = "name";
            sortOrder = "ASC";
        }
        if (sortCriteria === "nameDESC") {
            sortField = "name";
            sortOrder = "DESC";
        }
        if (sortCriteria === "timeASC") {
            sortField = "time";
            sortOrder = "ASC";
        }
        if (sortCriteria === "timeDESC") {
            sortField = "time";
            sortOrder = "DESC";
        }

        const queryParams = {
            bookName,
            category,
            status,
            sortField,
            sortOrder,
        };
        if (!status) {
            delete queryParams.status;
        }
        if (!category) {
            delete queryParams.category;
        }
        if (!bookName) {
            delete queryParams.bookName;
        }
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
                                value: item._id,
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
                    <Select
                        className="status-select"
                        size="large"
                        allowClear
                        showSearch
                        value={sortCriteria}
                        name="sort nè"
                        placeholder="Select sort"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setSortCriteria(value);
                        }}
                        options={[
                            {
                                value: "nameDESC",
                                label: "Name A to Z",
                            },
                            {
                                value: "nameASC",
                                label: "Name Z to A",
                            },
                            {
                                value: "timeASC",
                                label: "Oldest",
                            },
                            {
                                value: "timeDESC",
                                label: "Newest",
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
                    key="category"
                    align="left"
                    render={(record) => (
                        <span className="detail-account">
                            {record.category.categoryName}
                        </span>
                    )}
                />
                <Column
                    title="Quantity"
                    align="left"
                    render={(record) => (
                        <span className="detail-account">
                            {record.quantitySystem}
                        </span>
                    )}
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
                        return (
                            <Tag color={color} className="detail-account">
                                {record}
                            </Tag>
                        );
                    }}
                    align="left"
                />
                <Column
                    title="Time"
                    dataIndex="updatedAt"
                    key="updatedAt"
                    render={(record) => {
                        const date = new Date(record);
                        const formattedDate = `${date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })} - ${date.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}`;
                        return (
                            <Tag
                                color={"gold"}
                                className="detail-account"
                            >{`${formattedDate}`}</Tag>
                        );
                    }}
                    align="left"
                />
            </Table>
        </>
    );
};

export default ListBook;

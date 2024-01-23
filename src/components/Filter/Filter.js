import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import "./Filter.scss";
import { Select } from "antd";
import axios from "../utils/axiosCustomize.js";
const Filter = (props) => {
    const [listCategory, setListCategory] = useState([]);
    const [bookName, setBookName] = useState("");
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(null);
    const [sortCriteria, setSortCriteria] = useState(null);

    useEffect(() => {
        async function fetchListCategory() {
            const response = await axios.get("api/category/getAll");
            if (response.status === true) {
                setListCategory(response.data);
            } else {
                return;
            }
        }
        fetchListCategory();
    }, []);
    const handleClearFilter = async () => {
        setBookName("");
        setCategory(null);
        setStatus(null);
        setSortCriteria(null);
        const response = await axios.get(`api/book/find`);
        if (response.status === true) {
            props.setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    useEffect(() => {
        if (!bookName) {
            handleSearchBooksNotPrevent();
        }
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
            props.setListBook(response.data);
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
            props.setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    return (
        <>
            <div className="filter-container">
                <div className="search-container">
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
                </div>
                <div className="item-container">
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
                </div>
                <div className="item-container">
                    <Select
                        className="category-select"
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
                </div>
                <div className="item-container">
                    <span>Sort by</span>
                    <Select
                        className="category-select"
                        size="large"
                        allowClear
                        showSearch
                        value={sortCriteria}
                        name="sort nè"
                        placeholder="Select field"
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
                </div>
                <div className="item-container">
                    <MdFilterAltOff
                        className="remove-filter-icon"
                        onClick={handleClearFilter}
                    />
                </div>
            </div>
        </>
    );
};
export default Filter;

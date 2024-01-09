import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaSearch } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa";
import "./Filter.scss";
import { Select } from "antd";
import axios from "../utils/axiosCustomize.js";
const Filter = (props) => {
    const [bookName, setBookName] = useState("");
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [sortField, setSortField] = useState(null);
    const [isAsc, setIsAsc] = useState(true);
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
    useEffect(() => {
        if (bookName === "") {
            async function fetchListBook() {
                let sortOrder;
                if (isAsc) sortOrder = "ASC";
                else sortOrder = "DESC";
                const queryParams = {
                    bookName,
                    category,
                    status,
                    sortField,
                    sortOrder,
                };
                const queryString = new URLSearchParams(queryParams).toString();
                const response = await axios.get(
                    `api/book/find?${queryString}`
                );
                if (response.status === true) {
                    props.setListBook(response.data);
                    return;
                } else {
                    return;
                }
            }
            fetchListBook();
        }
    }, [bookName]);
    //
    const handleChangeOrder = () => {
        setIsAsc(!isAsc);
    };
    const handleSearchBooks = async (event) => {
        event.preventDefault();
        let sortOrder;
        if (isAsc) sortOrder = "ASC";
        else sortOrder = "DESC";
        const queryParams = {
            bookName,
            category,
            status,
            sortField,
            sortOrder,
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`api/book/find?${queryString}`);
        if (response.status === true) {
            props.setListBook(response.data);
            return;
        } else {
            return;
        }
    };
    const handleClearFilter = async () => {
        setBookName("");
        setCategory(null);
        setStatus(null);
        setSortField(null);
        const response = await axios.get(`api/book/find`);
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
                                value: item.categoryName,
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
                        value={sortField}
                        name="sort nè"
                        placeholder="Select field"
                        optionFilterProp="children"
                        onChange={(value) => {
                            setSortField(value);
                        }}
                        options={[
                            {
                                value: "name",
                                label: "Name",
                            },
                            {
                                value: "time",
                                label: "Time",
                            },
                        ]}
                    />
                    <FaArrowDown
                        className={`arrow ${isAsc ? "rotated" : ""}`}
                        onClick={(event) => {
                            handleChangeOrder();
                            handleSearchBooks(event);
                        }}
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

import { useState, useEffect } from "react";
import axios from "../../utils/axiosCustomize.js";
import { FaSearch } from "react-icons/fa";
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

    const [inputSearch, setInputSearch] = useState("");
    // const [idDetailUser, setIdDetailUser] = useState("");

    useEffect(() => {
        async function fetchListBook() {
            const response = await axios.get("api/book/getAll");
            if (response.status === true) {
                setListBook(response.data);
                return;
            } else {
                return;
            }
        }
        fetchListBook();
    }, []);

    // const handleSearcBooks = async (event) => {
    //     event.preventDefault();
    //     const listSearchUser = filterArray(inputSearch, listUser);
    //     setListUser(listSearchUser);
    //     if (!inputSearch) {
    //         const response = await axios.get(`api/user/getAll`);
    //         setListUser(response.data);
    //     }
    // };
    return (
        <>
            <div className="search-container">
                <form
                    style={{ height: "38px" }}
                    // onSubmit={(event) => {
                    //     handleSearchUser(event);
                    // }}
                >
                    <input
                        type="text"
                        className="form-control"
                        value={inputSearch}
                        onChange={(event) => {
                            setInputSearch(event.target.value);
                        }}
                    />
                </form>
                <FaSearch className="search-icon" />
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
                    pageSize: 7,
                }}
            >
                <Column
                    title="Book name"
                    dataIndex="bookName"
                    key="bookName"
                    ellipsis="true"
                    align="left"
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
                <Column
                    title="Feature"
                    key="action"
                    render={(record) => (
                        <span
                            style={{
                                color: "black",
                                backgroundColor: "#ffc008",
                                marginLeft: "10px",
                            }}
                            className="btn"
                            onClick={() => {
                                console.log(record);
                            }}
                        >
                            Detail
                        </span>
                    )}
                    align="left"
                />
            </Table>
        </>
    );
};

export default ListBook;

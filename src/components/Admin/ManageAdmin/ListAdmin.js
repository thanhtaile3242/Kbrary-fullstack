import "../SCSS/ListAccount.scss";
import { Table, Tag } from "antd";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosCustomize.js";
function filterArray(input, data) {
    const filteredData = data.filter(
        (item) => item.email.includes(input) || item.username.includes(input)
    );
    return filteredData;
}
const { Column } = Table;
const ListAdmin = (props) => {
    const [listAdmin, setListAdmin] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    useEffect(() => {
        async function fetchListAdmin() {
            const response = await axios.get(`api/user/getAll/ADMIN`);
            setListAdmin(response.data);
        }
        fetchListAdmin();
    }, []);

    useEffect(() => {
        async function fetchListAdmin() {
            if (!inputSearch) {
                const response = await axios.get(`api/user/getAll/ADMIN`);
                setListAdmin(response.data);
            }
        }
        fetchListAdmin();
    }, [inputSearch]);

    const handleSearchAdmin = async (event) => {
        event.preventDefault();
        const listSearchAdmin = filterArray(inputSearch, listAdmin);
        setListAdmin(listSearchAdmin);
        if (!inputSearch) {
            const response = await axios.get(`api/user/getAll/ADMIN`);
            setListAdmin(response.data);
        }
    };

    return (
        <>
            <div className="search-container">
                <div className="find-user-admin">
                    <form
                        onSubmit={(event) => {
                            handleSearchAdmin(event);
                        }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            value={inputSearch}
                            onChange={(event) => {
                                setInputSearch(event.target.value);
                            }}
                        />
                        <FaSearch className="search-icon" />
                    </form>
                </div>
                <span
                    style={{ fontWeight: "bold" }}
                    className="btn btn-primary"
                    onClick={() => {
                        props.setShowCreateAdmin(true);
                        props.setShowListAdmins(false);
                    }}
                >
                    Create new admin
                </span>
            </div>
            <Table
                dataSource={listAdmin}
                pagination={{
                    pageSize: 8,
                }}
            >
                <Column
                    title="Username"
                    key="action"
                    render={(record) => (
                        <span
                            className="detail-account"
                            onClick={() => {
                                props.setIdDetailAdmin(record._id);
                                props.setShowDetailAdmin(true);
                                props.setShowListAdmins(false);
                            }}
                        >
                            {record.username}
                        </span>
                    )}
                />
                <Column
                    title="Email"
                    key="email"
                    ellipsis="true"
                    render={(record) => (
                        <span className="detail-account">{record.email}</span>
                    )}
                />
                <Column
                    title="Role"
                    dataIndex="role"
                    key="role"
                    render={(record) => {
                        return (
                            <Tag color="orange" className="detail-account">
                                {record}
                            </Tag>
                        );
                    }}
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

export default ListAdmin;

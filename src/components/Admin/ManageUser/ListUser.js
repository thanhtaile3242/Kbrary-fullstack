import "../SCSS/ListAccount.scss";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosCustomize.js";
import { Table, Tag } from "antd";
const { Column } = Table;
function filterArray(input, data) {
    const filteredData = data.filter(
        (item) => item.email.includes(input) || item.username.includes(input)
    );
    return filteredData;
}
const ListUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [inputSearch, setInputSearch] = useState("");
    useEffect(() => {
        async function fetchListUser() {
            const response = await axios.get(`api/user/getAll/USER`);
            setListUser(response.data);
        }
        fetchListUser();
    }, []);

    useEffect(() => {
        async function fetchListUser() {
            if (!inputSearch) {
                const response = await axios.get(`api/user/getAll/USER`);
                setListUser(response.data);
            }
        }
        fetchListUser();
    }, [inputSearch]);

    const handleSearchUser = async (event) => {
        event.preventDefault();
        const listSearchUser = filterArray(inputSearch, listUser);
        setListUser(listSearchUser);
        if (!inputSearch) {
            const response = await axios.get(`api/user/getAll/USER`);
            setListUser(response.data);
        }
    };
    return (
        <>
            <div className="search-container">
                <div className="find-user-admin">
                    <form
                        onSubmit={(event) => {
                            handleSearchUser(event);
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
                    className="btn btn-primary"
                    onClick={() => {
                        props.setShowCreateUser(true);
                        props.setShowListUsers(false);
                    }}
                >
                    Create new user
                </span>
            </div>
            <Table
                dataSource={listUser}
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
                                props.setIdDetailUser(record._id);
                                props.setShowDetailUser(true);
                                props.setShowListUsers(false);
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
                            <Tag color="green" className="detail-account">
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
                        const formattedDate = `${date.toLocaleDateString(
                            "en-US",
                            {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }
                        )}`;
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

export default ListUser;

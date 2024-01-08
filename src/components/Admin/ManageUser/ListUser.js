import "../SCSS/ListAccount.scss";
import { Breadcrumb } from "antd";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosCustomize.js";
import { Table } from "antd";
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
                    pageSize: 7,
                }}
            >
                <Column title="Username" dataIndex="username" key="username" />
                <Column
                    title="Email"
                    dataIndex="email"
                    key="email"
                    ellipsis="true"
                />
                <Column title="Role" dataIndex="role" key="role" />
                <Column
                    title="Feature"
                    key="action"
                    render={(record) => (
                        <span
                            className="btn btn-warning"
                            onClick={() => {
                                props.setIdDetailUser(record._id);
                                props.setShowDetailUser(true);
                                props.setShowListUsers(false);
                            }}
                        >
                            Detail
                        </span>
                    )}
                />
            </Table>
        </>
    );
};

export default ListUser;

import { useState, useEffect } from "react";
import { Select } from "antd";
import { Breadcrumb } from "antd";
import "../SCSS/ManageAccount.scss";
import axios from "../../utils/axiosCustomize.js";
import ListUser from "./ListUser.js";
import DetailUser from "./DetailUser.js";
import ModalCreateUser from "./ModalCreateUser.js";

const ManageUsers = () => {
    // 1. List users
    const [showListUsers, setShowListUsers] = useState(true);
    // 2. Modal create new user
    const [showCreateUser, setShowCreateUser] = useState(false);
    // 3. Detail user
    const [showDetailUser, setShowDetailUser] = useState(false);
    const [idDetailUser, setIdDetailUser] = useState("");

    // const handleShowList = (value) => {
    //     if (value == "USER") {
    //         setShowListUsers(true);
    //         setShowListAdmins(false);
    //         return;
    //     }
    //     if (value == "ADMIN") {
    //         setShowListAdmins(true);
    //         setShowListUsers(false);
    //         return;
    //     }
    // };

    // Search

    // Handle Function

    // const [filterKeyword, setFilterKeyword] = useState("");

    // const handleFilter = async (event) => {
    //     const response = await axios.get(`api/user/getAll`);
    //     let listFilter = [];
    //     let filterKeyword = event.target.value;
    //     if (filterKeyword === "USER") {
    //         listFilter = response.data.filter((item) => {
    //             return item.role === "USER";
    //         });
    //         setListUser(listFilter);
    //     }
    //     if (filterKeyword === "ADMIN") {
    //         listFilter = response.data.filter((item) => {
    //             return item.role === "ADMIN";
    //         });
    //         setListUser(listFilter);
    //     }
    // };

    return (
        <>
            <div className="breadcrumb-container">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: (
                                <>
                                    <span
                                        className="list-user-breadcrumb"
                                        onClick={() => {
                                            setShowListUsers(true);
                                            setShowDetailUser(false);
                                        }}
                                    >
                                        List users
                                    </span>
                                </>
                            ),
                        },
                        {
                            title: "Detail",
                        },
                    ]}
                />
            </div>

            {showListUsers && (
                <>
                    <ListUser
                        setShowCreateUser={setShowCreateUser}
                        setShowListUsers={setShowListUsers}
                        setShowDetailUser={setShowDetailUser}
                        setIdDetailUser={setIdDetailUser}
                    />
                </>
            )}

            {showCreateUser && (
                <ModalCreateUser
                    setShowCreateUser={setShowCreateUser}
                    showCreateUser={showCreateUser}
                    setShowListUsers={setShowListUsers}
                />
            )}

            {showDetailUser && (
                <DetailUser
                    idDetailUser={idDetailUser}
                    setShowDetailUser={setShowDetailUser}
                    setShowListUsers={setShowListUsers}
                />
            )}
        </>
    );
};
export default ManageUsers;

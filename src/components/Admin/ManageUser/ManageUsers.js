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
                                        style={{ fontWeight: "bold" }}
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
                            title: (
                                <span style={{ fontWeight: "bold" }}>
                                    Detail
                                </span>
                            ),
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

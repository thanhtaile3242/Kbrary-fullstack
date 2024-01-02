import React, { useState, useEffect } from "react";
import axios from "../utils/axiosCustomize.js";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import "./ManageUser.scss";
import { Breadcrumb } from "antd";
import { Space, Table, Tag } from "antd";
import DetailUser from "./DetailUser.js";
const { Column, ColumnGroup } = Table;

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const ManageUser = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //
    const [listUser, setListUser] = useState([]);
    // Account information
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    // Detail
    const [detailUser, setDetailUser] = useState(false);
    const [idDetailUser, setIdDetailUser] = useState("");
    // Handle Function
    useEffect(() => {
        async function fetchListUser() {
            const response = await axios.get(`api/user/getAll`);
            setListUser(response.data);
        }
        fetchListUser();
    }, []);

    const handleCreateNewAccount = async () => {
        // Validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!username) {
            toast.error("Invalid username");
            return;
        }
        if (!password) {
            toast.error("Invalid password");
            return;
        }
        if (!role) {
            toast.error("Invalid role");
            return;
        }
        const data = {
            email,
            username,
            password,
            role,
        };
        const response = await axios.post("api/user/create", data);
        if (response.status === true) {
            delete data.password;
            toast.success(response.message);
            const result = await axios.get(`api/user/getAll`);
            setListUser(result.data);
            setEmail("");
            setUsername("");
            setPassword("");

            setShow(false);
            return;
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    return (
        <>
            <div
                className="btn-modal"
                style={{ justifyContent: "space-between" }}
            >
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: (
                                <>
                                    <span
                                        onClick={() => {
                                            setDetailUser(false);
                                        }}
                                    >
                                        List users
                                    </span>
                                </>
                            ),
                        },
                        {
                            title: (
                                <>
                                    <span>Detail</span>
                                </>
                            ),
                        },
                    ]}
                />
                {!detailUser && (
                    <Button
                        style={{
                            backgroundColor: "#1777ff",
                            marginBottom: "8px",
                        }}
                        onClick={handleShow}
                    >
                        Create new user
                    </Button>
                )}

                <Modal
                    show={show}
                    onHide={handleClose}
                    size="xl"
                    backdrop="static"
                    className="modal-add-user"
                    style={{ top: "150px" }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Create new user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    className="form-control"
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input
                                    type="text"
                                    value={password}
                                    className="form-control"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Role</label>
                                <select
                                    value={role}
                                    className="form-select"
                                    onChange={(event) => {
                                        setRole(event.target.value);
                                    }}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleCreateNewAccount();
                            }}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {detailUser ? (
                <DetailUser
                    idDetailUser={idDetailUser}
                    setDetailUser={setDetailUser}
                    setListUser={setListUser}
                />
            ) : (
                <Table
                    dataSource={listUser}
                    pagination={{
                        pageSize: 7,
                    }}
                >
                    <Column
                        title="Username"
                        dataIndex="username"
                        key="username"
                    />
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
                                style={{
                                    color: "black",
                                    backgroundColor: "#ffc008",
                                    marginLeft: "10px",
                                }}
                                className="btn"
                                onClick={() => {
                                    setIdDetailUser(record._id);
                                    setDetailUser(true);
                                }}
                            >
                                Detail
                            </span>
                        )}
                    />
                </Table>
            )}
        </>
    );
};
export default ManageUser;

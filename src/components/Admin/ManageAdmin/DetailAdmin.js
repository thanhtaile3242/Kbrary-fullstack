import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import "../SCSS/DetailAccount.scss";
import Modal from "react-bootstrap/Modal";

import userAvatar from "../../../assets/userAvatar.png";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const DetailAdmin = (props) => {
    const [defaultAvatar, setDefaultAvatar] = useState("");
    const [show, setShow] = useState(false);
    const adminId = props.idDetailAdmin;
    const [adminInfor, setAdminInfor] = useState({
        email: "",
        username: "",
        role: "",
    });
    // Handle function
    useEffect(() => {
        async function fetchDetailAdmin() {
            const response = await axios.get(`api/user/detailUser/${adminId}`);
            setAdminInfor(response.data);
            setDefaultAvatar(response.data.avatarName);
        }
        fetchDetailAdmin();
    }, []);

    const handleChangeInfor = (event) => {
        setAdminInfor({
            ...adminInfor,
            [event.target.name]: event.target.value,
        });
    };

    const handleUpdateAdmin = async () => {
        // Validate
        const isValidEmail = validateEmail(adminInfor.email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!adminInfor.username) {
            toast.error("Invalid username");
            return;
        }
        if (!adminInfor.role) {
            toast.error("Invalid role");
            return;
        }
        const data = {
            id: adminId,
            email: adminInfor.email,
            username: adminInfor.username,
            role: adminInfor.role,
        };
        const response = await axios.put(`api/user/updateUser`, data);
        if (response.status === true) {
            toast.success(response.message);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    const handleDeleteUser = async () => {
        const response = await axios.delete(`api/user/deleteUser/${adminId}`);
        if (response.status === true) {
            toast.success(response.message);
            props.setShowDetailAdmin(false);
            props.setShowListAdmins(true);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    return (
        <>
            <div className="header-detail-container">
                <DeleteOutlined
                    className="btn-delete"
                    onClick={() => {
                        setShow(true);
                    }}
                />
                <span
                    style={{ fontWeight: "bold" }}
                    className="btn btn-secondary btn-close-user"
                    onClick={() => {
                        props.setShowDetailAdmin(false);
                        props.setShowListAdmins(true);
                    }}
                >
                    Back
                </span>
                <span
                    style={{ fontWeight: "bold" }}
                    className="btn btn-primary btn-update"
                    onClick={() => {
                        handleUpdateAdmin();
                    }}
                >
                    Update
                </span>
            </div>
            <div className="user-info-container">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Username
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                name="username"
                                value={adminInfor?.username}
                                onChange={(event) => {
                                    handleChangeInfor(event);
                                }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Role
                            </Form.Label>
                            <Form.Select
                                name="role"
                                value={adminInfor?.role}
                                onChange={(event) => {
                                    handleChangeInfor(event);
                                }}
                            >
                                <option>USER</option>
                                <option>ADMIN</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group
                        className="mb-3"
                        controlId="formGridAddress1"
                    ></Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                onChange={(event) => {
                                    handleChangeInfor(event);
                                }}
                                placeholder="Enter email"
                                value={adminInfor?.email}
                            />
                        </Form.Group>
                    </Row>
                </Form>
                <div className="avatar-change-container">
                    <img
                        src={
                            defaultAvatar
                                ? `http://localhost:8802/${defaultAvatar}`
                                : userAvatar
                        }
                        alt=""
                        className="avatar-change"
                    />
                </div>
            </div>

            <div className="modal-delete">
                {/* Modal delete */}
                <Modal
                    style={{ top: "200px" }}
                    backdrop="static"
                    show={show}
                    onHide={() => {
                        setShow(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm delete the account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontWeight: "300" }}>
                        Having email: &nbsp; <b>{adminInfor?.email}</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <span
                            className="btn btn-secondary"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Close
                        </span>
                        <span
                            className="btn btn-primary"
                            onClick={() => {
                                handleDeleteUser();
                            }}
                        >
                            Confirm
                        </span>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default DetailAdmin;

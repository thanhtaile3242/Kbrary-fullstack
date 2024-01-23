import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import "../SCSS/DetailAccount.scss";
import Modal from "react-bootstrap/Modal";
import { Table, Tag } from "antd";
import userAvatar from "../../../assets/userAvatar.png";
import DetailRequestAdmin from "../ManageRequest/DetailRequestAdmin.js";
const { Column } = Table;
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const DetailUser = (props) => {
    const [defaultAvatar, setDefaultAvatar] = useState("");
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState(props.idDetailUser);
    const [idDetailRequest, setIdDetailRequest] = useState("");
    const [listRequest, setListRequest] = useState([]);
    const [userInfor, setUserInfor] = useState({
        email: "",
        username: "",
        role: "",
    });
    const [showDetailRequest, setShowDetailRequest] = useState(false);
    const [showListRequest, setShowListRequest] = useState(true);

    const handleShowListRequest = async () => {
        setShowDetailRequest(false);
        setShowListRequest(true);
        const queryParams = {
            userId: userId,
        };
        const queryString = new URLSearchParams(queryParams).toString();
        const response2 = await axios.get(
            `api/userRequest/find?${queryString}`
        );
        if (response2.status === true) {
            const listRequestModified = response2.data;
            listRequestModified.forEach((item, index) => {
                item.No = index + 1;
                item.timeRequest = item.createdAt;
            });
            setListRequest([...listRequestModified]);
        } else {
            return;
        }
    };
    const handleShowDetailRequest = () => {
        setShowDetailRequest(true);
        setShowListRequest(false);
    };

    useEffect(() => {
        async function fetchDetailUser() {
            const response = await axios.get(`api/user/detailUser/${userId}`);
            setUserInfor(response.data);
            setDefaultAvatar(response.data.avatarName);
            const queryParams = {
                userId: userId,
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const response2 = await axios.get(
                `api/userRequest/find?${queryString}`
            );
            if (response2.status === true) {
                const listRequestModified = response2.data;
                listRequestModified.forEach((item, index) => {
                    item.No = index + 1;
                    item.timeRequest = item.createdAt;
                });
                setListRequest([...listRequestModified]);
            } else {
                return;
            }
        }
        fetchDetailUser();
    }, [userId]);

    const handleChangeInfor = (event) => {
        setUserInfor({ ...userInfor, [event.target.name]: event.target.value });
    };

    const handleUpdateUser = async () => {
        // Validate
        const isValidEmail = validateEmail(userInfor.email);
        if (!isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if (!userInfor.username) {
            toast.error("Invalid username");
            return;
        }
        if (!userInfor.role) {
            toast.error("Invalid role");
            return;
        }
        const data = {
            id: userId,
            email: userInfor.email,
            username: userInfor.username,
            role: userInfor.role,
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
        const response = await axios.delete(`api/user/deleteUser/${userId}`);
        if (response.status === true) {
            toast.success(response.message);
            props.setShowDetailUser(false);
            props.setShowListUsers(true);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    return (
        <>
            <div className="header-detail-container">
                <span
                    style={{ fontWeight: "bold" }}
                    className="btn btn-secondary btn-close-user"
                    onClick={() => {
                        props.setShowDetailUser(false);
                        props.setShowListUsers(true);
                    }}
                >
                    Back
                </span>
                <span
                    style={{ fontWeight: "bold" }}
                    className="btn btn-primary btn-update"
                    onClick={() => {
                        handleUpdateUser();
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
                                value={userInfor?.username}
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
                                value={userInfor?.role}
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
                                value={userInfor?.email}
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
            {showListRequest && (
                <div className="list-requests">
                    <label className="title" style={{ fontWeight: "bold" }}>
                        List of requests
                    </label>
                    <Table
                        dataSource={listRequest}
                        pagination={{
                            pageSize: 3,
                        }}
                    >
                        <Column
                            title="No"
                            key="action"
                            render={(record) => (
                                <span className="detail-account">
                                    {record.No}
                                </span>
                            )}
                        />
                        <Column
                            title="Username"
                            render={(record) => (
                                <span className="detail-account">
                                    {record.userId.username}
                                </span>
                            )}
                        />
                        <Column
                            title="Status"
                            ellipsis="true"
                            render={(record) => {
                                let color = "";
                                if (record.status === "INPROGRESS") {
                                    color = "default";
                                }
                                if (record.status === "DONE") {
                                    color = "green";
                                }
                                return (
                                    <Tag
                                        color={color}
                                        className="detail-account"
                                        onClick={() => {
                                            handleShowDetailRequest();
                                            setIdDetailRequest(record._id);
                                        }}
                                    >
                                        {record.status}
                                    </Tag>
                                );
                            }}
                        />
                        <Column
                            title="Date create"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={(record) => {
                                const date = new Date(record);
                                const formattedDate = `${date.toLocaleTimeString(
                                    [],
                                    {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )} - ${date.toLocaleDateString("en-US", {
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
                </div>
            )}
            {showDetailRequest && (
                <div style={{ marginTop: "30px" }}>
                    <DetailRequestAdmin
                        idDetailRequest={idDetailRequest}
                        handleShowListRequest={handleShowListRequest}
                    />
                </div>
            )}
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
                        Having email: <b>{userInfor?.email}</b>
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

export default DetailUser;

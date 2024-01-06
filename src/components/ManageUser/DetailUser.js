import Button from "react-bootstrap/Button";
import ModalImage from "react-modal";
import Avatar from "react-avatar-edit";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import "./DetailUser.scss";
import Modal from "react-bootstrap/Modal";
import { Space, Table, Tag } from "antd";
import { useOutletContext } from "react-router-dom";
import userAvatar from "../../assets/userAvatar.png";
const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};
const columns = [
    {
        title: "No",
        dataIndex: "no",
        key: "no",
    },
    {
        title: "Time",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => (
            <>
                {status.map((item) => {
                    let color = "";
                    if (item === "pending") {
                        color = "geekblue";
                    }
                    if (item === "success") {
                        color = "green";
                    }
                    if (item === "fail") {
                        color = "volcano";
                    }

                    return (
                        <Tag color={color} key={status}>
                            {item.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Quantity",
        key: "quantity",
        dataIndex: "quantity",
    },
    {
        title: "Action",
        key: "action",
        render: (record) => (
            <span
                style={{
                    color: "black",
                    backgroundColor: "#ffc008",
                    marginLeft: "10px",
                }}
                className="btn"
            >
                Detail
            </span>
        ),
    },
];
const data = [
    {
        no: 1,
        time: "1/2/2024",
        status: ["success"],
        quantity: 4,
    },
    {
        no: 2,
        time: "1/2/2024",
        status: ["pending"],
        quantity: 4,
    },
    {
        no: 3,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 4,
        time: "1/2/2024",
        status: ["success"],
        quantity: 4,
    },
    {
        no: 5,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 6,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 7,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
];
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};
function DetailUser(props) {
    // updata avatar image
    const [defaultAvatar, setDefaultAvatar] = useState("");
    const [modalAvatarOpen, setModalAvatarOpen] = useState(false);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [avatar, setAvatar, role] = useOutletContext();

    //
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(props.idDetailUser);
    const [userInfor, setUserInfor] = useState({
        email: "",
        username: "",
        role: "",
    });
    useEffect(() => {
        async function fetchDetailUser() {
            const response = await axios.get(`api/user/detailUser/${userId}`);
            setUserInfor(response.data);
            setDefaultAvatar(response.data.avatarName);
        }
        fetchDetailUser();
    }, []);

    const handleChangeInfor = (event) => {
        setUserInfor({ ...userInfor, [event.target.name]: event.target.value });
    };

    const onCrop = (event) => {
        setDefaultAvatar(event);
        const file = dataURLtoFile(event, "userAvatar.png");
        setImageAvatar(file);
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
            const result = await axios.get(`api/user/getAll`);
            props.setListUser(result.data);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    const handleDeleteUser = async () => {
        const response = await axios.delete(`api/user/deleteUser/${userId}`);
        if (response.status === true) {
            toast.success(response.message);
            const result = await axios.get(`api/user/getAll`);
            props.setListUser(result.data);
            props.setDetailUser(false);
        } else {
            toast.error("Invalid information");
            return;
        }
    };

    const handleUpdateAvatar = async () => {
        const email = userInfor.email;
        const data = new FormData();
        data.append("file", imageAvatar);
        data.append("email", email);
        const response = await axios.post(`api/user/uploadUserImage`, data);
        if (response.status === true) {
            toast.success(response.message);
            setModalAvatarOpen(false);
            setAvatar(response.filename);
            setDefaultAvatar(response.filename);
            const user = localStorage.getItem("user-info-kbrary");
            if (user) {
                const userObject = JSON.parse(user);
                userObject.avatarName = response.filename;
                console.log(userObject);
                localStorage.setItem(
                    "user-info-kbrary",
                    JSON.stringify(userObject)
                );
            }
        } else {
            toast.error("Error Update Avatar");
            return;
        }
    };

    return (
        <>
            <DeleteOutlined
                className="btn-delete"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    setShow(true);
                }}
            />
            <button
                className="btn btn-secondary btn-close-user"
                onClick={() => {
                    props.setDetailUser(false);
                }}
            >
                Back
            </button>
            <button
                className="btn btn-primary btn-update"
                onClick={() => {
                    handleUpdateUser();
                }}
            >
                Update
            </button>
            <div className="user-info-container">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Username</Form.Label>
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
                            <Form.Label>Role</Form.Label>
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
                            <Form.Label>Email</Form.Label>
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
                    <ModalImage
                        isOpen={modalAvatarOpen}
                        onRequestClose={() => {
                            setModalAvatarOpen(false);
                        }}
                        style={customStyles}
                    >
                        <Avatar width={300} height={300} onCrop={onCrop} />
                        <span
                            className="btn btn-primary btn-avatar"
                            onClick={() => {
                                handleUpdateAvatar();
                            }}
                        >
                            Save Avatar
                        </span>
                    </ModalImage>
                    {role === "USER" ? (
                        <span
                            className="btn btn-primary btn-avatar"
                            onClick={() => {
                                setModalAvatarOpen(true);
                            }}
                        >
                            Update Avatar
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className="list-requests">
                <label className="title">List of requests</label>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 3,
                    }}
                />
            </div>
            <div>
                <Modal
                    style={{ top: "200px" }}
                    backdrop="static"
                    show={show}
                    onHide={() => {
                        setShow(false);
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontWeight: "300" }}>
                        Confirm you want to delete the account
                        <br />
                        Having email: <b>{userInfor?.email}</b>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleDeleteUser();
                            }}
                        >
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default DetailUser;

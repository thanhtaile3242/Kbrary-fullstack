import Button from "react-bootstrap/Button";
import ModalImage from "react-modal";
import userAvatar from "../../assets/userAvatar.png";
import Avatar from "react-avatar-edit";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import "../ManageUser/DetailUser.scss";
import Modal from "react-bootstrap/Modal";
import { Space, Table, Tag } from "antd";
import { useOutletContext } from "react-router-dom";

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
    const [defaultAvatar, setDefaultAvatar] = useState(null);
    const [modalAvatarOpen, setModalAvatarOpen] = useState(false);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [avatar, setAvatar, role] = useOutletContext();
    //
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [userInfor, setUserInfor] = useState({
        email: "",
        username: "",
        role: "",
    });

    //
    const [isPreview, setIsPreview] = useState(false);

    useEffect(() => {
        async function fetchDetailUser() {
            const user = JSON.parse(localStorage.getItem("user-info-kbrary"));

            if (user) {
                const response = await axios.get(
                    `api/user/detailUser/${user.id}`
                );
                setUserInfor(response.data);
                setDefaultAvatar(user.avatarName);
            } else {
                return;
            }
        }
        fetchDetailUser();
    }, []);

    // const handleChangeInfor = (event) => {
    //     setUserInfor({ ...userInfor, [event.target.name]: event.target.value });
    // };

    const onCrop = (event) => {
        setDefaultAvatar(event);
        const file = dataURLtoFile(event, "userAvatar.png");
        setImageAvatar(file);
    };

    // const handleUpdateUser = async () => {
    //     // Validate
    //     const isValidEmail = validateEmail(userInfor.email);
    //     if (!isValidEmail) {
    //         toast.error("Invalid email");
    //         return;
    //     }
    //     if (!userInfor.username) {
    //         toast.error("Invalid username");
    //         return;
    //     }
    //     if (!userInfor.role) {
    //         toast.error("Invalid role");
    //         return;
    //     }
    //     const data = {
    //         id: userId,
    //         email: userInfor.email,
    //         username: userInfor.username,
    //         role: userInfor.role,
    //     };
    //     const response = await axios.put(`api/user/updateUser`, data);
    //     if (response.status === true) {
    //         toast.success(response.message);
    //         const result = await axios.get(`api/user/getAll`);
    //         props.setListUser(result.data);
    //     } else {
    //         toast.error("Invalid information");
    //         return;
    //     }
    // };

    const handleUpdateAvatar = async () => {
        setIsPreview(false);
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
            <div className="user-info-container" style={{ marginTop: "50px" }}>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                placeholder="username"
                                name="username"
                                value={userInfor?.username}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                placeholder="username"
                                name="role"
                                value={userInfor?.role}
                            />
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
                                disabled
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                value={userInfor?.email}
                            />
                        </Form.Group>
                    </Row>
                    <button className="btn btn-primary btn-change-passw">
                        Change password
                    </button>
                </Form>
                <div className="avatar-change-container">
                    {isPreview ? (
                        <img
                            src={defaultAvatar ? defaultAvatar : userAvatar}
                            alt=""
                            className="avatar-change"
                        />
                    ) : (
                        <img
                            src={
                                defaultAvatar
                                    ? `http://localhost:8802/${defaultAvatar}`
                                    : userAvatar
                            }
                            alt=""
                            className="avatar-change"
                        />
                    )}

                    <ModalImage
                        isOpen={modalAvatarOpen}
                        onRequestClose={() => {
                            setModalAvatarOpen(false);
                            setIsPreview(false);
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
                            className="btn btn-warning btn-avatar"
                            onClick={() => {
                                setModalAvatarOpen(true);
                                setIsPreview(true);
                                setDefaultAvatar(userAvatar);
                            }}
                        >
                            Update Avatar
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailUser;

import ModalAvatarChange from "./ModalAvatarChange.js";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import "../../Admin/SCSS/DetailAccount.scss";

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
const DetailAccount = (props) => {
    const [userInfor, setUserInfor] = useState({
        email: "",
        username: "",
        role: "",
    });
    const [userAvatar, setUserAvatar] = useState("");

    useEffect(() => {
        async function fetchDetailUser() {
            const user = JSON.parse(localStorage.getItem("user-info-kbrary"));
            if (user) {
                const response = await axios.get(
                    `api/user/detailUser/${user.id}`
                );
                setUserInfor(response.data);
                setUserAvatar(user.avatarName);
            } else {
                return;
            }
        }
        fetchDetailUser();
    }, []);

    return (
        <>
            <div className="user-info-container" style={{ marginTop: "50px" }}>
                <Form>
                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name="username"
                                value={userInfor?.username}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name="role"
                                value={userInfor?.role}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                disabled
                                name="email"
                                type="email"
                                value={userInfor?.email}
                            />
                        </Form.Group>
                    </Row>
                    <span
                        className="btn btn-primary btn-change-password"
                        onClick={props.handleShowResetPass}
                    >
                        Change password
                    </span>
                </Form>
                <ModalAvatarChange
                    setUserAvatar={setUserAvatar}
                    userAvatar={userAvatar}
                    userInfor={userInfor}
                />
            </div>
        </>
    );
};

export default DetailAccount;

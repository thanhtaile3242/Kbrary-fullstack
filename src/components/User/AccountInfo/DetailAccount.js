import ModalAvatarChange from "./ModalAvatarChange.js";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "../../utils/axiosCustomize.js";
import { useState, useEffect } from "react";
import "../../Admin/SCSS/DetailAccount.scss";

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
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Username
                            </Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                name="username"
                                value={userInfor?.username}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Role
                            </Form.Label>
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
                            <Form.Label style={{ fontWeight: "bold" }}>
                                Email
                            </Form.Label>
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

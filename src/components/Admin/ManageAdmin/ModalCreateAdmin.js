import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosCustomize.js";
import "../SCSS/ModalCreateAccount.scss";
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const ModalCreateAdmin = (props) => {
    // Account information
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    // Handle function
    const handleCloseModal = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setRole("");
        props.setShowCreateAdmin(false);
        props.setShowListAdmins(true);
    };
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
            setEmail("");
            setUsername("");
            setPassword("");
            setRole("");
            props.setShowCreateAdmin(false);
            props.setShowListAdmins(true);
            return;
        } else {
            toast.error("Invalid information");
            return;
        }
    };
    return (
        <>
            <Modal
                show={props.showCreateAdmin}
                onHide={handleCloseModal}
                size="xl"
                backdrop="static"
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create new admin</Modal.Title>
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
                                <option value="">...</option>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <span
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                    >
                        Close
                    </span>
                    <span
                        className="btn btn-primary"
                        onClick={() => {
                            handleCreateNewAccount();
                        }}
                    >
                        Save
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCreateAdmin;

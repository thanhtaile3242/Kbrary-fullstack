import ModalImage from "react-modal";
import userAvatarDefault from "../../../assets/userAvatar.png";
import Avatar from "react-avatar-edit";
import { toast } from "react-toastify";
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
const ModalAvatarChange = (props) => {
    const [avatar, setAvatar, role] = useOutletContext();
    // updata avatar image
    const [modalAvatarOpen, setModalAvatarOpen] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);

    const onCrop = (event) => {
        const file = dataURLtoFile(event, "userAvatar.png");
        setAvatarFile(file);
    };
    const handleUpdateAvatar = async () => {
        const email = props.userInfor.email;
        const data = new FormData();
        data.append("avatar", avatarFile);
        data.append("email", email);
        const response = await axios.post(`api/user/uploadUserImage`, data);
        if (response.status === true) {
            toast.success(response.message);
            setModalAvatarOpen(false);
            setAvatar(response.filename);
            props.setUserAvatar(response.filename);
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
            <div className="avatar-change-container">
                <img
                    onClick={() => {
                        setModalAvatarOpen(true);
                    }}
                    src={
                        props.userAvatar
                            ? `http://localhost:8802/${props.userAvatar}`
                            : userAvatarDefault
                    }
                    alt=""
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
            </div>
        </>
    );
};
export default ModalAvatarChange;

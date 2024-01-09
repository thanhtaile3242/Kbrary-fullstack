import Modal from "react-bootstrap/Modal";
import AvatarEditor from "react-avatar-editor";
import { IoIosAddCircle } from "react-icons/io";
import axios from "../../utils/axiosCustomize.js";
import { toast } from "react-toastify";
import "./SCSS/ModalImageBook.scss";
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
const ModalImageBookDetail = (props) => {
    // First
    const bookImageChange = (fileChangeEvent) => {
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (
            type.endsWith("jpeg") ||
            type.endsWith("png") ||
            type.endsWith("jpg")
        ) {
            props.setBookImageFile(file);
        }
    };
    // Second
    const setEditorRef = (editor) => {
        props.setImageEditor(editor);
    };
    // Final
    const onCrop = async () => {
        const editor = props.imageEditor;
        if (editor != null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            props.setBookImageFinalURL(url);
            const file = dataURLtoFile(url, "book-image.png");
            const data = new FormData();
            data.append("id", props.bookId);
            data.append("imageBook", file);
            const response = await axios.put("api/book/updateImage", data);
            if (response.status === true) {
                toast.success("Update image successfully");
                props.setShowImageEdit(false);
                return;
            } else {
                return;
            }
        }
    };
    //Handle function
    const handleCloseModal = () => {
        props.setBookImageFile(null);
        props.setBookImageFinalURL(null);
        props.setShowImageEdit(false);
    };
    const handleUpdateImage = () => {
        onCrop();
    };
    return (
        <>
            <Modal
                className="image-modal"
                size="lg"
                backdrop="static"
                show={props.showImageEdit}
                onHide={handleCloseModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="upload-image-container">
                            <label for="upload-image">
                                <IoIosAddCircle className="icon" />
                                <span>Upload image</span>
                            </label>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        hidden
                        id="upload-image"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={bookImageChange}
                    />
                    <div className="image-center">
                        <AvatarEditor
                            ref={setEditorRef}
                            borderRadius={50}
                            image={props.bookImageFile}
                            width={300}
                            border={0}
                            height={330}
                            scale={0.75}
                        />
                    </div>
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
                        onClick={handleUpdateImage}
                    >
                        Save Image
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalImageBookDetail;

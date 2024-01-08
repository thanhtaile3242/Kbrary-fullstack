import Modal from "react-bootstrap/Modal";
import AvatarEditor from "react-avatar-editor";
import { IoIosAddCircle } from "react-icons/io";
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
const ModalImageBook = (props) => {
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
    const onCrop = () => {
        const editor = props.imageEditor;
        if (editor != null) {
            const url = editor.getImageScaledToCanvas().toDataURL();
            props.setBookImageFinalURL(url);
            const file = dataURLtoFile(url, "book-image.png");
            props.setBookImageFile(file);
            props.setShowImageEdit(false);
        }
    };
    return (
        <>
            <Modal
                className="image-modal"
                size="lg"
                backdrop="static"
                show={props.showImageEdit}
                onHide={() => {
                    if (props.bookImageFile) {
                        props.setShowImageEdit(false);
                        return;
                    }
                    props.setBookImageFile(null);
                    props.setBookImageFinalURL(null);
                    props.setShowImageEdit(false);
                }}
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
                            width={300}
                            border={0}
                            height={300}
                            borderRadius={50}
                            image={props.bookImageFile}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span
                        className="btn btn-secondary"
                        onClick={() => {
                            if (props.bookImageFile) {
                                props.setShowImageEdit(false);
                                return;
                            }
                            props.setBookImageFile(null);
                            props.setBookImageFinalURL(null);
                            props.setShowImageEdit(false);
                        }}
                    >
                        Close
                    </span>
                    <span
                        className="btn btn-primary"
                        onClick={() => {
                            onCrop();
                        }}
                    >
                        Save Image
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalImageBook;

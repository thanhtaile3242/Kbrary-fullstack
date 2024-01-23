import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../utils/axiosCustomize.js";
import "./SCSS/ModalAddCategory.scss";

const ModalUpdateCategory = (props) => {
    const [updateCategory, setUpdateCategory] = useState("");

    useEffect(() => {
        async function fetchCategory() {
            const response = await axios.get(
                `api/category/${props.idCategoryUpdate}`
            );
            if (response.status === true) {
                setUpdateCategory(response.data.categoryName);
                return;
            } else {
                return;
            }
        }
        fetchCategory();
    }, []);
    const handleUpdateCategory = async () => {
        const data = {
            id: props.idCategoryUpdate,
            updateCategory: updateCategory,
        };
        const response = await axios.put("api/category/update", data);
        if (response.status === true) {
            toast.success("Update category successfully");
            setUpdateCategory("");

            const responseList = await axios.get("api/category/getAll");
            props.setListCategory(responseList.data);

            props.setShowModalUpdate(false);
            props.setShowAddCategory(true);
            return;
        } else {
            toast.error("Can not update category");
            setUpdateCategory("");
            props.setShowModalUpdate(false);
            props.setShowAddCategory(true);
            return;
        }
    };
    return (
        <>
            <Modal
                size="md"
                className="modal-add-category"
                backdrop="static"
                show={props.showModalUpdate}
                onHide={() => {
                    props.setShowModalUpdate(false);
                    props.setShowAddCategory(true);
                    setUpdateCategory("");
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control add-category"
                                id="floatingInput"
                                placeholder="New category"
                                value={updateCategory}
                                onChange={(event) => {
                                    setUpdateCategory(event.target.value);
                                }}
                            />
                            <label for="floatingInput">New category</label>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <span
                        className="btn btn-secondary"
                        onClick={() => {
                            setUpdateCategory("");
                            props.setShowModalUpdate(false);
                            props.setShowAddCategory(true);
                        }}
                    >
                        Close
                    </span>
                    <span
                        className="btn btn-primary"
                        onClick={() => {
                            handleUpdateCategory();
                        }}
                    >
                        Update
                    </span>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalUpdateCategory;

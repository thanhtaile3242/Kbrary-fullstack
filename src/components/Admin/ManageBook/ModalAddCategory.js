import { useState } from "react";
import { Table } from "antd";
import ModalUpdateCategory from "./ModalUpdateCategory";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../utils/axiosCustomize.js";
import "./SCSS/ModalAddCategory.scss";
import { FiEdit } from "react-icons/fi";
const { Column } = Table;

const ModalAddCategory = (props) => {
    const [newCategory, setNewCategory] = useState("");
    //
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const handleAddCategory = async (event) => {
        event.preventDefault();
        const response = await axios.post("/api/category/create", {
            categoryName: newCategory,
        });
        if (response.status === true) {
            toast.success(response.message);
            const item = {
                _id: response.data.id,
                categoryName: response.data.category,
            };
            props.setListCategory([item, ...props.listCategory]);
            setNewCategory("");
            return;
        } else {
            toast.error("Can not create category");
            props.setShowAddCategory(false);
            setNewCategory("");
            return;
        }
    };
    const [idCategoryUpdate, setIdCategoryUpdate] = useState("");
    const handleDeleteCategory = async (record) => {
        const idCategory = record._id;
        setIdCategoryUpdate(idCategory);
        setShowModalUpdate(true);
        props.setShowAddCategory(false);
    };
    return (
        <>
            <Modal
                size="lg"
                className="modal-add-category"
                backdrop="static"
                show={props.showAddCategory}
                onHide={() => {
                    props.setShowAddCategory(false);
                    setNewCategory("");
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleAddCategory}>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control add-category"
                                id="floatingInput"
                                placeholder="New category"
                                value={newCategory}
                                onChange={(event) => {
                                    setNewCategory(event.target.value);
                                }}
                            />
                            <label for="floatingInput">New category</label>
                        </div>
                    </form>
                    <div>
                        <Table
                            className="table-category"
                            dataSource={props.listCategory}
                            pagination={{
                                pageSize: 2,
                            }}
                        >
                            <Column
                                dataIndex="categoryName"
                                key="categoryName"
                            />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column dataIndex="" key="" />
                            <Column
                                key="action"
                                render={(record) => (
                                    <span
                                        onClick={() => {
                                            handleDeleteCategory(record);
                                        }}
                                    >
                                        <FiEdit className="edit-btn" />
                                    </span>
                                )}
                            />
                        </Table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <span
                        className="btn btn-secondary"
                        onClick={() => {
                            setNewCategory("");
                            props.setShowAddCategory(false);
                        }}
                    >
                        Close
                    </span>
                    <span
                        className="btn btn-primary"
                        onClick={() => {
                            props.setShowAddCategory(false);
                        }}
                    >
                        Save category
                    </span>
                </Modal.Footer>
            </Modal>
            {showModalUpdate && (
                <ModalUpdateCategory
                    showModalUpdate={showModalUpdate}
                    setShowModalUpdate={setShowModalUpdate}
                    idCategoryUpdate={idCategoryUpdate}
                    setShowAddCategory={props.setShowAddCategory}
                    setListCategory={props.setListCategory}
                />
            )}
        </>
    );
};

export default ModalAddCategory;

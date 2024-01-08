import { useState, useEffect } from "react";
import { Table } from "antd";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import axios from "../../utils/axiosCustomize.js";
import "./SCSS/ModalAddCategory.scss";
const { Column } = Table;

const ModalAddCategory = (props) => {
    const [newCategory, setNewCategory] = useState("");

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
    const handleDeleteCategory = async (record) => {
        const idCategory = record._id;

        const response = await axios.delete(
            `api/category/delete/${idCategory}`
        );
        if (response.status === true) {
            const newCategoryList = props.listCategory.filter(
                (item) => item._id !== idCategory
            );
            props.setListCategory(newCategoryList);
            toast.success("Delete a category");
            return;
        } else {
            toast.error("Can not delete a category");
            return;
        }
    };
    return (
        <>
            <Modal
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
                            <Column dataIndex="" key="" />
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
                            <Column
                                key="action"
                                render={(record) => (
                                    <span
                                        className="btn btn-warning delete-btn"
                                        onClick={() => {
                                            handleDeleteCategory(record);
                                        }}
                                    >
                                        Delete
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
        </>
    );
};

export default ModalAddCategory;

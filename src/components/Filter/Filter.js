import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaSearch } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import "./Filter.scss";

const Filter = () => {
    const [selectedCatagory, setSelectedCatagory] = useState("");
    const [listCatagory, setListCatagory] = useState([
        {
            id: 1,
            name: "Lập trình",
        },
        {
            id: 2,
            name: "Kỹ năng sống",
        },
        {
            id: 3,
            name: "Kinh tế",
        },
        {
            id: 4,
            name: "Lịch sử",
        },
    ]);
    const [selectedPublisher, setSelectedPublisher] = useState("");
    const [listPublisher, setListPublisher] = useState([
        {
            id: 1,
            name: "Nhã Nam",
        },
        {
            id: 2,
            name: "Alpha Book",
        },
        {
            id: 3,
            name: "NXB Trẻ",
        },
        {
            id: 4,
            name: "AZ Book",
        },
        {
            id: 5,
            name: "Skybooks",
        },
    ]);
    const [listField, setListField] = useState(["Tên", "Trạng thái"]);
    const [selectedField, setSelectedFeild] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(["ASC", "DESC"]);

    const [isAsc, setIsAsc] = useState(true);

    const handleChangeCatagory = (event) => {
        setSelectedCatagory(event.target.innerHTML);
    };
    const handleChangePublisher = (event) => {
        setSelectedPublisher(event.target.innerHTML);
    };
    const handleChangeField = (event) => {
        setSelectedFeild(event.target.innerHTML);
    };
    const handleChangeOrder = () => {
        setIsAsc(!isAsc);
    };
    return (
        <>
            <div className="filter-container">
                <div className="search-container">
                    <input type="text" className="form-control" />
                    <FaSearch className="search-icon" />
                </div>
                <div className="item-container">
                    <span>Chủ đề</span>
                    <DropdownButton
                        className="select-dropdown"
                        title={selectedCatagory ? selectedCatagory : ""}
                        variant={""}
                    >
                        {listCatagory.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={`catagory-${index + 1}`}
                                    className="option-item"
                                    onClick={(event) => {
                                        handleChangeCatagory(event, index);
                                    }}
                                >
                                    {item.name}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                </div>
                <div className="item-container">
                    <span>Nhà xuất bản</span>
                    <DropdownButton
                        className="select-dropdown"
                        title={selectedPublisher ? selectedPublisher : ""}
                        variant={""}
                    >
                        {listPublisher.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={`catagory-${index + 1}`}
                                    className="option-item"
                                    onClick={(event) => {
                                        handleChangePublisher(event);
                                    }}
                                >
                                    {item.name}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                </div>
                <div className="item-container">
                    <span>Sắp xếp theo</span>
                    <FaArrowUp
                        className={`arrow ${isAsc ? "rotated" : ""}`}
                        onClick={() => {
                            handleChangeOrder();
                        }}
                    />
                    <DropdownButton
                        className="select-dropdown"
                        title={selectedField ? selectedField : ""}
                        variant={""}
                    >
                        {listField.map((item, index) => {
                            return (
                                <Dropdown.Item
                                    key={`catagory-${index + 1}`}
                                    className="option-item"
                                    onClick={(event) => {
                                        handleChangeField(event);
                                    }}
                                >
                                    {item}
                                </Dropdown.Item>
                            );
                        })}
                    </DropdownButton>
                </div>
            </div>
        </>
    );
};
export default Filter;

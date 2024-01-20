import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";
import { Select } from "antd";
import { useEffect, useState } from "react";
import "../SCSS/ManageRequest.scss";
import axios from "../../utils/axiosCustomize.js";
import DetailRequestAdmin from "./DetailRequestAdmin.js";
import ListRequest from "./ListRequest.js";
const { Column } = Table;
const list = [
    {
        key: "1",
        label: "In progress",
    },
    {
        key: "2",
        label: "Done",
    },
];
const ManageRequest = (props) => {
    const [showListRequest, setShowListRequest] = useState(true);
    const [showDetailRequest, setShowDetailRequest] = useState(false);
    const [idDetailRequest, setIdDetailRequest] = useState("");
    //
    const handleShowListRequest = () => {
        setShowDetailRequest(false);
        setShowListRequest(true);
    };
    const handleShowDetailRequest = () => {
        setShowDetailRequest(true);
        setShowListRequest(false);
    };
    return (
        <>
            <div className="manage-request-container">
                {showListRequest && (
                    <ListRequest
                        handleShowDetailRequest={handleShowDetailRequest}
                        setIdDetailRequest={setIdDetailRequest}
                    />
                )}
                {showDetailRequest && (
                    <DetailRequestAdmin
                        idDetailRequest={idDetailRequest}
                        handleShowListRequest={handleShowListRequest}
                    />
                )}
            </div>
        </>
    );
};

export default ManageRequest;

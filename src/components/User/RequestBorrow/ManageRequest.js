import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";
import { Select } from "antd";
import { useEffect, useState } from "react";
import "./RequestUser.scss";
import { useOutletContext } from "react-router-dom";
import ListRequest from "./ListRequest.js";
import DetailRequestUser from "./DetailRequestUser.js";
import axios from "../../utils/axiosCustomize.js";

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
                    <DetailRequestUser
                        idDetailRequest={idDetailRequest}
                        handleShowListRequest={handleShowListRequest}
                    />
                )}
            </div>
        </>
    );
};

export default ManageRequest;
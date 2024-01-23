import { useState } from "react";
import "../SCSS/ManageRequest.scss";
import DetailRequestAdmin from "./DetailRequestAdmin.js";
import ListRequest from "./ListRequest.js";

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

import { useState } from "react";
import "./RequestUser.scss";
import ListRequest from "./ListRequest.js";
import DetailRequestUser2 from "./DetailRequestUser2.js";
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
                    <DetailRequestUser2
                        idDetailRequest={idDetailRequest}
                        handleShowListRequest={handleShowListRequest}
                    />
                )}
            </div>
        </>
    );
};

export default ManageRequest;

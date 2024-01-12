import React from "react";
import { Tabs } from "antd";
import ListProgress from "./ListProgress.js";
const onChange = (key) => {
    console.log(key);
};

const list = [
    {
        key: "1",
        label: "In progress",
    },
    {
        key: "2",
        label: "Success",
    },
];

const ManageRequests = () => {
    return (
        <>
            <div className="tab-container">
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={list}
                    size="large"
                />
            </div>
            <div className="request-container">
                <ListProgress />
            </div>
        </>
    );
};

export default ManageRequests;

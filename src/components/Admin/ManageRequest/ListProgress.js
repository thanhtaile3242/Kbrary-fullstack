import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import { Table, Tag } from "antd";
import { useOutletContext } from "react-router-dom";

const columns = [
    {
        title: "No",
        dataIndex: "no",
        key: "no",
    },
    {
        title: "Time",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => (
            <>
                {status.map((item) => {
                    let color = "";
                    if (item === "pending") {
                        color = "geekblue";
                    }
                    if (item === "success") {
                        color = "green";
                    }
                    if (item === "fail") {
                        color = "volcano";
                    }

                    return (
                        <Tag color={color} key={status}>
                            {item.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: "Quantity",
        key: "quantity",
        dataIndex: "quantity",
    },
    {
        title: "Action",
        key: "action",
        render: (record) => (
            <span
                style={{
                    color: "black",
                    backgroundColor: "#ffc008",
                    marginLeft: "10px",
                }}
                className="btn"
            >
                Detail
            </span>
        ),
    },
];
const data = [
    {
        no: 1,
        time: "1/2/2024",
        status: ["success"],
        quantity: 4,
    },
    {
        no: 2,
        time: "1/2/2024",
        status: ["pending"],
        quantity: 4,
    },
    {
        no: 3,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 4,
        time: "1/2/2024",
        status: ["success"],
        quantity: 4,
    },
    {
        no: 5,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 6,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
    {
        no: 7,
        time: "1/2/2024",
        status: ["fail"],
        quantity: 4,
    },
];

const ListProgress = (props) => {
    return (
        <>
            <div className="list-requests">
                <label className="title">List of requests</label>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 7,
                    }}
                />
            </div>
        </>
    );
};

export default ListProgress;

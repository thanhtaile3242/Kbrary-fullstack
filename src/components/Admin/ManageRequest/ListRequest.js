import { Table, Tag } from "antd";
import { Tabs } from "antd";
import { Select } from "antd";
import { useEffect, useState } from "react";
import "../SCSS/ManageRequest.scss";
import axios from "../../utils/axiosCustomize.js";

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
    {
        key: "3",
        label: "Borrowed",
    },
    {
        key: "4",
        label: "Received",
    },
];
const ListRequest = (props) => {
    const { handleShowDetailRequest, setIdDetailRequest } = props;
    const [listRequest, setListRequest] = useState([]);
    const [filterField, setFilterField] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    useEffect(() => {
        async function fetchListRequest() {
            const queryParams = {
                status: "INPROGRESS",
            };
            const queryString = new URLSearchParams(queryParams).toString();
            const response = await axios.get(
                `api/userRequest/find?${queryString}`
            );
            if (response.status == true) {
                const listRequestModified = response.data;
                listRequestModified.forEach((item, index) => {
                    item.No = index + 1;
                    item.timeRequest = item.createdAt;
                });
                setListRequest([...listRequestModified]);
                setFilterField("INPROGRESS");
            } else {
                return;
            }
        }
        fetchListRequest();
    }, []);
    const handleFilterRequest = async (key) => {
        let status;
        if (key == "1") {
            status = "INPROGRESS";
            setFilterField("INPROGRESS");
        }
        if (key == "2") {
            status = "DONE";
            setFilterField("DONE");
        }
        if (key == "3") {
            status = "BORROWED";
            setFilterField("BORROWED");
        }
        if (key == "4") {
            status = "RECEIVED";
            setFilterField("RECEIVED");
        }
        const queryParams = { status };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`api/userRequest/find?${queryString}`);
        if (response.status == true) {
            const listRequestModified = response.data;
            listRequestModified.forEach((item, index) => {
                item.No = index + 1;
                item.timeRequest = item.createdAt;
            });
            setListRequest([...listRequestModified]);
            setSortOrder(null);
        } else {
            return;
        }
    };
    const handleSortRequest = async (value) => {
        setSortOrder(value);
        const queryParams = { status: filterField, sortOrder: value };
        const queryString = new URLSearchParams(queryParams).toString();
        const response = await axios.get(`api/userRequest/find?${queryString}`);
        if (response.status == true) {
            const listRequestModified = response.data;
            listRequestModified.forEach((item, index) => {
                item.No = index + 1;
                item.timeRequest = item.createdAt;
            });
            setListRequest([...listRequestModified]);
        } else {
            return;
        }
    };
    return (
        <>
            <div className="tab-container">
                <Tabs
                    style={{ fontWeight: "bold" }}
                    onChange={handleFilterRequest}
                    type="card"
                    items={list}
                    size="large"
                />
                <div className="sort-by">
                    <span className="sort-by-span">Sort by</span>
                    <div className="item-container">
                        <Select
                            className="sort-select"
                            size="large"
                            allowClear
                            showSearch
                            value={sortOrder}
                            name="status nè"
                            placeholder="Select status"
                            optionFilterProp="children"
                            onChange={(value) => {
                                handleSortRequest(value);
                            }}
                            options={[
                                {
                                    value: "DESC",
                                    label: "Newest",
                                },
                                {
                                    value: "ASC",
                                    label: "Oldest",
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Table
                    dataSource={listRequest}
                    pagination={{
                        pageSize: 8,
                    }}
                >
                    <Column
                        title="No"
                        key="action"
                        render={(record) => (
                            <span className="detail-account">{record.No}</span>
                        )}
                    />
                    <Column
                        title="Username"
                        render={(record) => (
                            <span className="detail-account">
                                {record?.userId?.username}
                            </span>
                        )}
                    />
                    <Column
                        title="Status"
                        ellipsis="true"
                        render={(record) => {
                            let color = "";
                            if (record.status === "INPROGRESS") {
                                color = "default";
                            }
                            if (record.status === "DONE") {
                                color = "green";
                            }
                            if (record.status === "BORROWED") {
                                color = "geekblue";
                            }
                            if (record.status === "RECEIVED") {
                                color = "cyan";
                            }
                            return (
                                <Tag
                                    color={color}
                                    className="detail-account"
                                    onClick={() => {
                                        handleShowDetailRequest();
                                        setIdDetailRequest(record._id);
                                    }}
                                >
                                    {record.status}
                                </Tag>
                            );
                        }}
                    />
                    <Column
                        title="Date create"
                        dataIndex="createdAt"
                        key="createdAt"
                        render={(record) => {
                            const date = new Date(record);
                            const formattedDate = `${date.toLocaleTimeString(
                                [],
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )} - ${date.toLocaleDateString("en-US", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}`;
                            return (
                                <Tag
                                    color={"gold"}
                                    className="detail-account"
                                >{`${formattedDate}`}</Tag>
                            );
                        }}
                        align="left"
                    />
                </Table>
            </div>
        </>
    );
};

export default ListRequest;

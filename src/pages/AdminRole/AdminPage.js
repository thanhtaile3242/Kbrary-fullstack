import React, { useState } from "react";
import "./Admin.scss";
import ManageUsers from "../../components/Admin/ManageUser/ManageUsers.js";
import ManageAdmins from "../../components/Admin/ManageAdmin/ManageAdmins.js";
import ManageBooks from "../../components/Admin/ManageBook/ManageBooks.js";
import ManageRequests from "../../components/Admin/ManageRequest/ManageRequest.js";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    BookFilled,
    ProfileFilled,
    LaptopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, SubMenu } from "antd";
const { Sider, Content } = Layout;

const list = [
    {
        key: null,
        icon: React.createElement(UserOutlined),
        label: "Manage accounts",
        children: [
            {
                key: "1",
                label: "User",
            },
            {
                key: "2",
                label: "Admin",
            },
        ],
    },
    {
        key: null,
        icon: React.createElement(BookFilled),
        label: "Manage system",
        children: [
            {
                key: "3",
                label: "Books",
            },
            {
                key: "4",
                label: "Request",
            },
        ],
    },
];

const Admin = () => {
    const [isManageUsers, setIsManageUsers] = useState(true);
    const [isManageAdmins, setIsManageAdmins] = useState(false);
    const [isManageBooks, setIsManageBooks] = useState(false);
    const [isManageRequests, setIsManageRequests] = useState(false);
    const handleMenuItemClick = (event) => {
        if (event.key === "1") {
            setIsManageUsers(true);
            setIsManageAdmins(false);
            setIsManageBooks(false);
            setIsManageRequests(false);
        }
        if (event.key === "2") {
            setIsManageAdmins(true);
            setIsManageUsers(false);
            setIsManageBooks(false);
            setIsManageRequests(false);
        }
        if (event.key === "3") {
            setIsManageBooks(true);
            setIsManageUsers(false);
            setIsManageAdmins(false);
            setIsManageRequests(false);
        }
        if (event.key === "4") {
            setIsManageRequests(true);
            setIsManageBooks(false);
            setIsManageUsers(false);
            setIsManageAdmins(false);
        }
    };
    return (
        <Layout style={{ maxHeight: "calc(100vh - 120px)" }}>
            <Sider style={{ width: "150px", padding: "30px 0" }}>
                <Menu
                    style={{ width: "100%" }}
                    theme="dark"
                    mode="inline"
                    items={list}
                    onClick={(event) => handleMenuItemClick(event)}
                />
            </Sider>

            <Layout style={{ minHeight: "calc(100vh - 120px)" }}>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                    }}
                >
                    {isManageUsers && <ManageUsers />}
                    {isManageAdmins && <ManageAdmins />}
                    {isManageBooks && <ManageBooks />}
                    {isManageRequests && <ManageRequests />}
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;

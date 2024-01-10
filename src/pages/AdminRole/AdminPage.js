import React, { useState } from "react";
import "./Admin.scss";
import ManageUsers from "../../components/Admin/ManageUser/ManageUsers.js";
import ManageAdmins from "../../components/Admin/ManageAdmin/ManageAdmins.js";
import ManageBooks from "../../components/Admin/ManageBook/ManageBooks.js";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    BookFilled,
    ProfileFilled,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;

const Admin = () => {
    const [isManageUsers, setIsManageUsers] = useState(true);
    const [isManageAdmins, setIsManageAdmins] = useState(false);
    const [isManageBooks, setIsManageBooks] = useState(false);
    const handleMenuItemClick = (event) => {
        if (event.key === "1") {
            setIsManageUsers(true);
            setIsManageAdmins(false);
            setIsManageBooks(false);
        }
        if (event.key === "2") {
            setIsManageAdmins(true);
            setIsManageUsers(false);
            setIsManageBooks(false);
        }
        if (event.key === "3") {
            setIsManageBooks(true);
            setIsManageUsers(false);
            setIsManageAdmins(false);
        }
    };
    return (
        <Layout style={{ maxHeight: "calc(100vh - 120px)" }}>
            <Sider trigger={null} collapsible>
                <div className="demo-logo-vertical" />
                <Menu
                    style={{ padding: "40px", width: "300px" }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    onClick={(event) => handleMenuItemClick(event)}
                    items={[
                        {
                            key: 1,
                            icon: <UserOutlined />,
                            label: "Manage users",
                        },
                        {
                            key: 2,
                            icon: <UserOutlined />,
                            label: "Manage admins",
                        },
                        {
                            key: 3,
                            icon: <BookFilled />,
                            label: "Manage books",
                        },
                        {
                            key: 4,
                            icon: <ProfileFilled />,
                            label: "Manage requests",
                        },
                    ]}
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
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;

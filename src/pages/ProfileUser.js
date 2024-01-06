import React, { useState } from "react";
import ProfileAccout from "../components/ProfileUser/DetailAccount.js";
import "./Admin.scss";
import ManageUser from "../components/ManageUser/ManageUser.js";
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

const ProfileUser = () => {
    const [isManageUser, setIsManageUser] = useState(true);
    const handleMenuItemClick = (event) => {
        if (event.key === "1") {
            setIsManageUser(true);
        }
        if (event.key === "2") {
            setIsManageUser(false);
        }
        if (event.key === "") {
            setIsManageUser(false);
        }
    };
    return (
        <Layout style={{ maxHeight: "calc(100vh - 120px)" }}>
            <Sider trigger={null} collapsible>
                <div className="demo-logo-vertical" />
                <Menu
                    style={{ padding: "40px" }}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[1]}
                    onClick={(event) => handleMenuItemClick(event)}
                    items={[
                        {
                            key: 1,
                            icon: <UserOutlined />,
                            label: "Account information",
                        },
                        {
                            key: 2,
                            icon: <BookFilled />,
                            label: "List requests",
                        },
                        {
                            key: 3,
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
                    {/* <div>{isManageUser && <ManageUser />}</div> */}
                    <ProfileAccout />
                </Content>
            </Layout>
        </Layout>
    );
};
export default ProfileUser;

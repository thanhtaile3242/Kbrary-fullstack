import { useState } from "react";
import ManageAccount from "../../components/User/AccountInfo/ManageAccount.js";
import ManageRequest from "../../components/User/RequestBorrow/ManageRequest.js";
import "../AdminRole/Admin.scss";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    BookFilled,
    ProfileFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
const UserPage = () => {
    const [isManageAccount, setIsManageAccount] = useState(true);
    const [isMangeBorrow, setIsMangeBorrow] = useState(false);
    const handleMenuItemClick = (event) => {
        if (event.key === "1") {
            setIsManageAccount(true);
            setIsMangeBorrow(false);
        }
        if (event.key === "2") {
            setIsManageAccount(false);
            setIsMangeBorrow(true);
        }
        if (event.key === "") {
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
                    defaultSelectedKeys={["1"]}
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
                    ]}
                />
            </Sider>
            <Layout style={{ minHeight: "calc(100vh - 120px)" }}>
                <Content
                    className="content-container"
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                    }}
                >
                    {isManageAccount && <ManageAccount />}
                    {isMangeBorrow && <ManageRequest />}
                </Content>
            </Layout>
        </Layout>
    );
};
export default UserPage;

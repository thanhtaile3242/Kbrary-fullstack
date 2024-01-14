import { Breadcrumb } from "antd";
import ListAdmin from "./ListAdmin.js";
import ModalCreateAdmin from "./ModalCreateAdmin.js";
import DetailAdmin from "./DetailAdmin.js";
import { useEffect, useState } from "react";
const ManageAdmins = () => {
    // List Admins
    const [showListAdmins, setShowListAdmins] = useState(true);
    const [listAdmins, setListAdmins] = useState([]);
    // 2. Modal create new user
    const [showCreateAdmin, setShowCreateAdmin] = useState(false);
    //  Detail admin
    const [showDetailAdmin, setShowDetailAdmin] = useState(false);
    const [idDetailAdmin, setIdDetailAdmin] = useState("");

    return (
        <>
            <div className="breadcrumb-container">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: (
                                <>
                                    <span
                                        style={{ fontWeight: "bold" }}
                                        className="list-user-breadcrumb"
                                        onClick={() => {
                                            setShowListAdmins(true);
                                            setShowDetailAdmin(false);
                                        }}
                                    >
                                        List admins
                                    </span>
                                </>
                            ),
                        },
                        {
                            title: (
                                <span style={{ fontWeight: "bold" }}>
                                    Detail
                                </span>
                            ),
                        },
                    ]}
                />
            </div>
            {showListAdmins && (
                <>
                    <ListAdmin
                        setShowCreateAdmin={setShowCreateAdmin}
                        setShowListAdmins={setShowListAdmins}
                        setShowDetailAdmin={setShowDetailAdmin}
                        setIdDetailAdmin={setIdDetailAdmin}
                    />
                </>
            )}
            {showDetailAdmin && (
                <DetailAdmin
                    idDetailAdmin={idDetailAdmin}
                    setShowDetailAdmin={setShowDetailAdmin}
                    setShowListAdmins={setShowListAdmins}
                />
            )}

            {showCreateAdmin && (
                <ModalCreateAdmin
                    setShowCreateAdmin={setShowCreateAdmin}
                    showCreateAdmin={showCreateAdmin}
                    setShowListAdmins={setShowListAdmins}
                />
            )}
        </>
    );
};

export default ManageAdmins;

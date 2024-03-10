import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import axios from "../../utils/axiosCustomize.js";

const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};

const converDate = (dateString) => {
    const dateObject = new Date(dateString);

    // Format date to the desired format (dd-mm-yyyy)
    const formattedDate =
        (dateObject.getDate() < 10 ? "0" : "") +
        dateObject.getDate() +
        "-" +
        (dateObject.getMonth() + 1 < 10 ? "0" : "") +
        (dateObject.getMonth() + 1) +
        "-" +
        dateObject.getFullYear();
    return formattedDate;
};

const DetailRequest = (props) => {
    const { handleShowListRequest, idDetailRequest } = props;
    const [objectDetail, setObjectDetail] = useState(null);
    const [status, setStatus] = useState(null);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [dateAllow, setDateAllow] = useState(null);
    const [durationAllow, setDurationAllow] = useState(null);
    const [noteAllow, setNoteAllow] = useState("");
    const [outofstock, setOutOfStock] = useState(false);
    const [isHandle, setIsHandle] = useState(false);
    const [isNotAllow, setIsNotAllow] = useState(false);
    const [isDeleteRequest, setIsDeleteRequest] = useState(false);
    const a = useRef(null);
    const b = useRef("");
    //
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `api/userRequest/detailRequest/${idDetailRequest}`
                );
                setObjectDetail(response?.data);
                setIsNotAllow(response?.data?.isProgressing);
                if (response?.data?.status === "DONE") {
                    setIsHandle(true);
                    for (const book of response?.data?.listBorrowBooks) {
                        if (book?.bookId?.quantitySystem !== 0) {
                            setOutOfStock(false);
                            break;
                        }
                        setOutOfStock(true);
                    }
                    setStatus(response?.data?.status);
                    setDurationAllow(
                        response?.data?.responseInfor?.allowDuration
                    );
                    setNoteAllow(response?.data?.responseInfor?.allowNote);
                    if (response?.data?.responseInfor?.allowDate) {
                        setIsSelectDate(!isSelectDate);
                        setDateAllow(response?.data?.responseInfor?.allowDate);
                    }
                } else {
                    setStatus(response?.data?.status);
                    for (const book of response?.data?.listBorrowBooks) {
                        if (book?.bookId?.quantitySystem !== 0) {
                            setOutOfStock(false);
                            break;
                        }
                        setOutOfStock(true);
                    }
                }
            } catch (error) {
                return;
            }
        }
        fetchData();

        const handleBeforeUnload = async (event) => {
            const newData = {
                requestId: b.current,
                isProgressing: false,
            };
            await axios.put("api/userRequest/lockFromUser", newData);
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return async () => {
            if (a.current) {
                const newData = {
                    requestId: b.current,
                    isProgressing: false,
                };
                await axios.put("api/userRequest/lockFromUser", newData);
            }
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    const isHandleRequest = async () => {
        const response = await axios.get(
            `api/userRequest/detailRequest/${idDetailRequest}`
        );
        if (response.data.isProgressing) {
            toast.error("This request is updated by User!");
        } else {
            a.current = true;
            b.current = objectDetail._id;

            setIsHandle(true);
            // setRequestInfor({
            //     ...requestInfor,
            //     dateBorrow: null,
            // });
            try {
                const newData = {
                    requestId: objectDetail._id,
                    isProgressing: true,
                };

                await axios.put("api/userRequest/lockFromUser", newData);
            } catch (error) {
                setIsHandle(false);
            }
        }
    };
    const handleChangeQuantity = (bookId, value) => {
        // if (typeof value != "number") {
        //     toast.error("Invalid number1");
        //     return;
        // }
        objectDetail?.listBorrowBooks.forEach((book) => {
            if (book._id == bookId) {
                if (
                    Number(value) < 0 ||
                    Number(value) > book.bookId?.quantitySystem
                ) {
                    toast.error("Invalid number");
                    return;
                }

                book.quantityAllow = Number(value);
                book.detalQuantity =
                    book.bookId?.quantitySystem - book.quantityAllow;
                setObjectDetail({ ...objectDetail });
            }
        });
    };
    const onChangeDate = (date, dateString) => {
        setIsSelectDate(true);
        setDateAllow(date);
    };
    const handleUpdateRequest = async () => {
        if (status === "INPROGRESS") {
            for (const book of objectDetail?.listBorrowBooks) {
                if (!book?.bookId || !book?.bookId?.quantitySystem) {
                    book.bookId.quantitySystem = 0;
                    book.quantityAllow = 0;
                    book.detalQuantity = 0;
                }
            }

            // for (const book of objectDetail?.listBorrowBooks || []) {
            //     if (book?.bookId?.quantitySystem != 0) {
            //         if (
            //             !book?.quantityAllow ||
            //             book?.quantityAllow <= 0 ||
            //             book?.quantityAllow > book?.bookId?.quantitySystem
            //         ) {
            //             toast.error("Fulfill required");
            //             hasNullQuantityAllow = true;
            //             // if (hasNullQuantityAllow) {
            //             //     return;
            //             // }
            //         }
            //     }
            // }

            if (!outofstock) {
                if (dateAllow && durationAllow && noteAllow) {
                    const data = {
                        ...objectDetail,
                        ...{
                            dateAllow: dateAllow,
                            durationAllow: durationAllow,
                            noteAllow: noteAllow,
                        },
                        status: "DONE",
                    };
                    const response = await axios.put(
                        "api/userRequest/update",
                        data
                    );
                    if (response.status == true) {
                        const response2 = await axios.post(
                            "/api/userRequest/sendEmailRequest",
                            {
                                idRequest: idDetailRequest,
                                email: objectDetail?.userId?.email,
                            }
                        );
                        if (response2.status == true) {
                            toast.success("Update successfully");
                            handleShowListRequest();
                            return;
                        } else {
                            toast.error("Can not update");
                            return;
                        }
                    }
                } else {
                    toast.error("Fulfill required");
                }
            } else {
                if (noteAllow) {
                    const data = {
                        ...objectDetail,
                        ...{
                            dateAllow: null,
                            durationAllow: null,
                            noteAllow: noteAllow,
                        },
                        status: "DONE",
                    };
                    const response = await axios.put(
                        "api/userRequest/update",
                        data
                    );
                    if (response.status == true) {
                        const response2 = await axios.post(
                            "/api/userRequest/sendEmailRequest",
                            {
                                idRequest: idDetailRequest,
                                email: objectDetail?.userId?.email,
                            }
                        );
                        if (response2.status == true) {
                            toast.success("Update successfully");
                            handleShowListRequest();
                            return;
                        } else {
                            toast.error("Can not update");
                            return;
                        }
                    }
                } else {
                    toast.error("Fulfill required");
                }
            }
        }
    };
    const handleOk = () => {
        handleShowListRequest();
    };
    const handleUpdateBorrow = async () => {
        const data = {
            idRequest: idDetailRequest,
            status: "BORROWED",
        };
        const response = await axios.put("api/userRequest/updateStatus", data);
        if (response.status) {
            toast.success(response.message);
            handleShowListRequest();
        } else {
            toast.error(response.message);
        }
    };
    const handleUpdateReceive = async () => {
        const data = {
            idRequest: idDetailRequest,
            status: "RECEIVED",
        };
        const response = await axios.put(
            "api/userRequest/completeReceiveRequest",
            data
        );
        if (response.status) {
            toast.success(response.message);
            handleShowListRequest();
        } else {
            toast.error(response.message);
        }
    };
    const handleDeleteRequest = async () => {
        const data = {
            idRequest: idDetailRequest,
            isDeleted: true,
        };
        const response = await axios.put("api/userRequest/deleteRequest", data);
        if (response.status) {
            toast.success(response.message);
            handleShowListRequest();
        } else {
            toast.error(response.message);
        }
    };
    return (
        <>
            <div>
                <MDBCard style={{ height: "740px" }}>
                    <MDBCardBody className="p-4">
                        <MDBRow>
                            <MDBCol lg="8">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        paddingRight: "28px",
                                    }}
                                >
                                    <span
                                        style={{ fontWeight: "bold" }}
                                        className="btn btn-secondary"
                                        onClick={handleShowListRequest}
                                    >
                                        Back
                                    </span>
                                    {status === "INPROGRESS" && (
                                        <button
                                            disabled={isHandle ? true : false}
                                            style={{ fontWeight: "bold" }}
                                            className="btn btn-primary"
                                            onClick={isHandleRequest}
                                        >
                                            Hanlde
                                        </button>
                                    )}
                                    {status === "DONE" && (
                                        <>
                                            <button
                                                style={{ fontWeight: "bold" }}
                                                className="btn btn-danger"
                                                onClick={() => {
                                                    setIsDeleteRequest(true);
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div
                                    style={{
                                        marginTop: "20px",
                                        paddingRight: "28px",
                                        paddingLeft: "10px",
                                        height: "650px",
                                        maxWidth: "100%",
                                        overflowX: "hidden",
                                        overflow: "auto",
                                        paddingTop: "10px",
                                    }}
                                >
                                    {objectDetail?.listBorrowBooks?.map(
                                        (book) => {
                                            return (
                                                <MDBCard className="mb-4">
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            padding:
                                                                "15px 30px 0",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <div>
                                                            <img
                                                                src={`http://localhost:8802/${book?.bookId?.imageName}`}
                                                                alt=""
                                                                style={{
                                                                    width: "65px",
                                                                }}
                                                            />
                                                        </div>

                                                        <h5
                                                            style={{
                                                                width: "260px",
                                                                whiteSpace:
                                                                    "nowrap",
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                            }}
                                                        >
                                                            {
                                                                book?.bookId
                                                                    ?.bookName
                                                            }
                                                        </h5>

                                                        <h6
                                                            style={{
                                                                color: "#004380",
                                                                fontWeight:
                                                                    "600",
                                                            }}
                                                        >
                                                            Category:{" "}
                                                            {
                                                                book?.bookId
                                                                    ?.category
                                                                    ?.categoryName
                                                            }
                                                        </h6>
                                                    </div>
                                                    <div
                                                        style={{
                                                            padding:
                                                                "10px 30px 15px",
                                                            alignItems:
                                                                "center",
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                alignItems:
                                                                    "center",
                                                                display: "flex",
                                                                gap: "15px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "white",
                                                                    padding:
                                                                        "5px 8px",
                                                                    backgroundColor:
                                                                        "#003eb3",
                                                                    borderRadius:
                                                                        "5px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                Request quantity
                                                            </span>
                                                            <span
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                    fontSize:
                                                                        "20px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                {
                                                                    book?.quantityBorrow
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                padding:
                                                                    "10px 30px 15px",
                                                                alignItems:
                                                                    "center",
                                                                display: "flex",
                                                                gap: "15px",
                                                            }}
                                                        >
                                                            {status ==
                                                                "INPROGRESS" && (
                                                                <>
                                                                    <span
                                                                        style={{
                                                                            color: "white",
                                                                            padding:
                                                                                "5px 8px",
                                                                            backgroundColor:
                                                                                "#237804",
                                                                            borderRadius:
                                                                                "5px",
                                                                            fontWeight:
                                                                                "600",
                                                                        }}
                                                                    >
                                                                        Instock
                                                                        quantity
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            textAlign:
                                                                                "center",
                                                                            fontSize:
                                                                                "20px",
                                                                            fontWeight:
                                                                                "600",
                                                                        }}
                                                                    >
                                                                        {
                                                                            book
                                                                                ?.bookId
                                                                                ?.quantitySystem
                                                                        }
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                padding:
                                                                    "10px 30px 15px",
                                                                alignItems:
                                                                    "center",
                                                                display: "flex",
                                                                gap: "15px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "white",
                                                                    padding:
                                                                        "5px 8px",
                                                                    backgroundColor:
                                                                        "#d48806",
                                                                    borderRadius:
                                                                        "5px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                Allow quantity
                                                            </span>
                                                            {status ===
                                                                "INPROGRESS" && (
                                                                <input
                                                                    disabled={
                                                                        book
                                                                            ?.bookId
                                                                            ?.quantitySystem ===
                                                                            0 ||
                                                                        status !=
                                                                            "INPROGRESS"
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        handleChangeQuantity(
                                                                            book?._id,
                                                                            event
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                    value={
                                                                        book
                                                                            ?.bookId
                                                                            ?.quantitySystem ===
                                                                        0
                                                                            ? 0
                                                                            : book.quantityAllow
                                                                    }
                                                                    className="form-control"
                                                                    type="number"
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                        width: "65px",
                                                                    }}
                                                                />
                                                            )}
                                                            {status ===
                                                                "DONE" && (
                                                                <input
                                                                    disabled
                                                                    value={
                                                                        book.quantityAllow
                                                                    }
                                                                    className="form-control"
                                                                    type="number"
                                                                    style={{
                                                                        textAlign:
                                                                            "center",
                                                                        width: "65px",
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </MDBCard>
                                            );
                                        }
                                    )}
                                </div>
                            </MDBCol>

                            <MDBCol lg="4">
                                <div className="user-infor-container">
                                    <h5 style={{ fontWeight: "600" }}>
                                        User request information
                                    </h5>
                                    <div class="form-floating mb-4">
                                        <input
                                            disabled
                                            type="email"
                                            class="form-control"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            value={objectDetail?.userId?.email}
                                        />
                                        <label for="floatingInput">Email</label>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "20px",
                                        }}
                                    >
                                        <div class="form-floating mb-4">
                                            <input
                                                disabled
                                                type="text"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={
                                                    objectDetail?.requestInfor
                                                        ?.userFullname
                                                }
                                            />
                                            <label for="floatingInput">
                                                Fullname
                                            </label>
                                        </div>

                                        <div class="form-floating mb-4">
                                            <input
                                                disabled
                                                type="text"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={
                                                    objectDetail?.requestInfor
                                                        ?.phoneNumber
                                                }
                                            />
                                            <label for="floatingInput">
                                                Phone number
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "20px",
                                        }}
                                    >
                                        <div class="form-floating mb-3">
                                            <input
                                                disabled
                                                type="text"
                                                class="form-control"
                                                value={converDate(
                                                    objectDetail?.requestInfor
                                                        ?.dateBorrow
                                                )}
                                            />
                                            <label>Borrow date</label>
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input
                                                disabled
                                                type="number"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={
                                                    objectDetail?.requestInfor
                                                        ?.duration
                                                }
                                            />
                                            <label for="floatingInput">
                                                Duration (days)
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <textarea
                                            disabled
                                            class="form-control"
                                            placeholder="Leave a comment here"
                                            id="floatingTextarea2"
                                            style={{
                                                height: "80px",
                                                resize: "none",
                                            }}
                                            value={
                                                objectDetail?.requestInfor?.note
                                            }
                                        />
                                        <label for="floatingTextarea2">
                                            Note
                                        </label>
                                    </div>

                                    {isHandle ? (
                                        <div className="mb-2">
                                            <h5 style={{ fontWeight: "600" }}>
                                                Response information
                                            </h5>

                                            {!outofstock ? (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "20px",
                                                    }}
                                                >
                                                    {status == "DONE" ? (
                                                        <div class="form-floating mb-3">
                                                            <input
                                                                disabled
                                                                type="text"
                                                                class="form-control"
                                                                value={converDate(
                                                                    dateAllow
                                                                )}
                                                            />
                                                            <label>
                                                                Allow date
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div class="form-floating mb-3">
                                                            <DatePicker
                                                                style={{
                                                                    height: "100%",
                                                                    backgroundColor:
                                                                        "white",
                                                                    border: "1px solid #dee2e6",
                                                                }}
                                                                format={
                                                                    "DD-MM-YYYY"
                                                                }
                                                                onChange={(
                                                                    date,
                                                                    dateString
                                                                ) => {
                                                                    onChangeDate(
                                                                        date,
                                                                        dateString
                                                                    );
                                                                }}
                                                                onClick={() => {
                                                                    setIsSelectDate(
                                                                        true
                                                                    );
                                                                }}
                                                                disabledDate={
                                                                    disabledDate
                                                                }
                                                                allowClear={
                                                                    false
                                                                }
                                                            />
                                                            <label
                                                                hidden={
                                                                    isSelectDate ==
                                                                    false
                                                                        ? false
                                                                        : true
                                                                }
                                                            >
                                                                Select date
                                                                allow
                                                            </label>
                                                        </div>
                                                    )}

                                                    <div class="form-floating mb-3">
                                                        <input
                                                            disabled={
                                                                status == "DONE"
                                                            }
                                                            type="number"
                                                            class="form-control"
                                                            id="floatingInput"
                                                            placeholder="name@example.com"
                                                            value={
                                                                durationAllow
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setDurationAllow(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                        <label for="floatingInput">
                                                            Duration allow
                                                        </label>
                                                    </div>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            <div class="form-floating mb-3">
                                                <textarea
                                                    disabled={status == "DONE"}
                                                    class="form-control"
                                                    placeholder="Leave a comment here"
                                                    id="floatingTextarea2"
                                                    style={{
                                                        height: "110px",
                                                        resize: "none",
                                                    }}
                                                    value={noteAllow}
                                                    onChange={(event) => {
                                                        setNoteAllow(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                                <label for="floatingTextarea2">
                                                    Note
                                                </label>
                                            </div>

                                            <div>
                                                <span
                                                    hidden={status == "DONE"}
                                                    className="btn"
                                                    style={{
                                                        width: "100%",
                                                        cursor: "pointer",
                                                        padding: "8px",
                                                        margin: "0",
                                                        backgroundColor:
                                                            "#019cda",
                                                        fontWeight: "600",
                                                        color: "white",
                                                    }}
                                                    onClick={() => {
                                                        handleUpdateRequest();
                                                    }}
                                                >
                                                    Complete request
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    {status == "DONE" && (
                                        <>
                                            <span
                                                hidden={
                                                    status == "DONE"
                                                        ? false
                                                        : true
                                                }
                                                className="btn"
                                                style={{
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    padding: "8px",
                                                    margin: "0",
                                                    backgroundColor: "#019cda",
                                                    fontWeight: "600",
                                                    color: "white",
                                                }}
                                                onClick={handleUpdateBorrow}
                                            >
                                                Borrow
                                            </span>
                                        </>
                                    )}
                                    {/*  */}
                                    {status == "BORROWED" && (
                                        <>
                                            <span
                                                hidden={
                                                    status == "BORROWED"
                                                        ? false
                                                        : true
                                                }
                                                className="btn"
                                                style={{
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    padding: "8px",
                                                    margin: "0",
                                                    backgroundColor: "#019cda",
                                                    fontWeight: "600",
                                                    color: "white",
                                                }}
                                                onClick={handleUpdateReceive}
                                            >
                                                Receive
                                            </span>
                                        </>
                                    )}
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
                <Modal
                    title="Basic Modal"
                    open={isNotAllow}
                    centered
                    // onOk={handleOk}
                    onCancel={handleOk}
                    footer={[
                        <Button type="primary" onClick={handleOk}>
                            Return
                        </Button>,
                    ]}
                >
                    <p>This request is updated by user, come back later</p>
                </Modal>
                <Modal
                    title="Basic Modal"
                    open={isDeleteRequest}
                    centered
                    onOk={handleDeleteRequest}
                    onCancel={() => {
                        setIsDeleteRequest(false);
                    }}
                >
                    <p>Are you sure to delete this request</p>
                </Modal>
            </div>
        </>
    );
};
export default DetailRequest;

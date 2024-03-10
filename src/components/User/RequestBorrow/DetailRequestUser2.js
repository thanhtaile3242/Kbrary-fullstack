import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBIcon,
} from "mdb-react-ui-kit";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "../../utils/axiosCustomize.js";

const disabledDate = (current) => {
    return current && current < moment().endOf("day");
};
const convertDateType = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const dateObject = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return dateObject;
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
    const [requestInfor, setRequestInfor] = useState(null);
    const [status, setStatus] = useState(null);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [dateAllow, setDateAllow] = useState(null);
    const [durationAllow, setDurationAllow] = useState(null);
    const [noteAllow, setNoteAllow] = useState("");
    const [outofstock, setOutOfStock] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isNotAllow, setIsNotAllow] = useState(false);
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
                setRequestInfor(response?.data?.requestInfor);
                setIsNotAllow(response?.data?.isProgressing);
                if (response?.data?.status === "DONE") {
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
    const isChangeHandle = async () => {
        const response = await axios.get(
            `api/userRequest/detailRequest/${idDetailRequest}`
        );
        if (response.data.isProgressing) {
            toast.error("This request is updated by Admin!");
        } else {
            a.current = true;
            b.current = objectDetail._id;
            setIsChange(true);
            setRequestInfor({
                ...requestInfor,
                dateBorrow: null,
            });
            try {
                const newData = {
                    requestId: objectDetail._id,
                    isProgressing: true,
                };

                await axios.put("api/userRequest/lockFromUser", newData);
            } catch (error) {
                setIsChange(false);
            }
        }
    };
    const handleChangeQuantity = (bookId, value) => {
        objectDetail?.listBorrowBooks.forEach((book) => {
            if (book._id == bookId) {
                book.quantityAllow = Number(value);
                book.detalQuantity =
                    book.bookId?.quantitySystem - book.quantityAllow;
                setObjectDetail({ ...objectDetail });
            }
        });
    };
    const onChangeDate = (date, dateString) => {
        // setIsSelectDate(!isSelectDate);
        const dateObject = convertDateType(dateString);

        setRequestInfor({
            ...requestInfor,
            dateBorrow: dateObject,
        });
    };
    const handleUpdateRequest = async () => {
        if (
            requestInfor.dateBorrow &&
            requestInfor.userFullname &&
            requestInfor.phoneNumber &&
            requestInfor.duration &&
            requestInfor.note
        ) {
            const newData = {
                requestId: objectDetail._id,
                requestInfor: requestInfor,
                listBorrowBooks: objectDetail.listBorrowBooks,
            };
            try {
                const response = await axios.put(
                    "api/userRequest/updateFromUser",
                    newData
                );
                if (response.status) {
                    setObjectDetail({ ...response.data });
                    setRequestInfor({ ...response.data.requestInfor });
                    const newData2 = {
                        requestId: objectDetail._id,
                        isProgressing: false,
                    };

                    await axios.put("api/userRequest/lockFromUser", newData2);
                }
            } catch (error) {}

            setIsChange(false);
        } else {
            toast.error("Error date");
        }
    };
    const handleIncreaseBook = (item) => {
        const idItem = item.bookId._id;
        objectDetail.listBorrowBooks.forEach((book) => {
            if (book.bookId._id === idItem) {
                book.quantityBorrow++;
            }
        });
        setObjectDetail({
            ...objectDetail,
            listBorrowBooks: [...objectDetail.listBorrowBooks],
        });
    };
    const handleDescreaseBook = (item) => {
        const idItem = item.bookId._id;
        objectDetail.listBorrowBooks.forEach((book) => {
            if (book.bookId._id === idItem) {
                book.quantityBorrow--;
            }
        });

        objectDetail.listBorrowBooks.forEach((book, index) => {
            if (book.quantityBorrow == 0) {
                objectDetail.listBorrowBooks.splice(index, 1);
            }
        });

        setObjectDetail({
            ...objectDetail,
            listBorrowBooks: [...objectDetail.listBorrowBooks],
        });
    };
    const handleDeleteBook = (item) => {
        const idItem = item.bookId._id;
        const listBorrowBookNew = objectDetail.listBorrowBooks.filter(
            (item) => item.bookId._id !== idItem
        );
        setObjectDetail({
            ...objectDetail,
            listBorrowBooks: [...listBorrowBookNew],
        });
    };
    const handleOk = () => {
        handleShowListRequest();
    };
    return (
        <>
            <div>
                <MDBCard style={{ height: "740px" }}>
                    <MDBCardBody className="p-4">
                        <MDBRow>
                            <MDBCol lg="7">
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
                                                <MDBCard className="mb-3">
                                                    <div
                                                        className="d-flex"
                                                        style={{
                                                            padding:
                                                                "15px 40px 15px 30px",
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
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "60px",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    fontSize:
                                                                        "22px",
                                                                    width: "260px",
                                                                    whiteSpace:
                                                                        "nowrap",
                                                                    overflow:
                                                                        "hidden",
                                                                    textOverflow:
                                                                        "ellipsis",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {
                                                                    book?.bookId
                                                                        ?.bookName
                                                                }
                                                            </div>
                                                            <h6>
                                                                <span
                                                                    style={{
                                                                        color: "#004380",
                                                                        fontWeight:
                                                                            "bold",
                                                                    }}
                                                                >
                                                                    Category:{" "}
                                                                </span>
                                                                {
                                                                    book?.bookId
                                                                        ?.category
                                                                        ?.categoryName
                                                                }
                                                            </h6>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "100px",
                                                                alignItems:
                                                                    "center",
                                                                display: "flex",
                                                                gap: "5px",
                                                            }}
                                                        >
                                                            {isChange && (
                                                                <FaMinus
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                    onClick={() => {
                                                                        handleDescreaseBook(
                                                                            book
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                            {}
                                                            <span
                                                                style={{
                                                                    textAlign:
                                                                        "center",
                                                                    minWidth:
                                                                        "30px",
                                                                    fontSize:
                                                                        "26px",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {status ==
                                                                "DONE" ? (
                                                                    <>
                                                                        {" "}
                                                                        {
                                                                            book.quantityAllow
                                                                        }
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            book.quantityBorrow
                                                                        }
                                                                    </>
                                                                )}
                                                            </span>
                                                            {isChange && (
                                                                <FaPlus
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "14px",
                                                                    }}
                                                                    onClick={() => {
                                                                        handleIncreaseBook(
                                                                            book
                                                                        );
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "30px",
                                                            }}
                                                        >
                                                            {isChange && (
                                                                <MDBIcon
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        fontSize:
                                                                            "18px",
                                                                    }}
                                                                    fas
                                                                    icon="trash-alt"
                                                                    onClick={() => {
                                                                        handleDeleteBook(
                                                                            book
                                                                        );
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

                            <MDBCol lg="5">
                                <div className="user-infor-container">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <h5 style={{ fontWeight: "600" }}>
                                            Request information
                                        </h5>

                                        {status != "DONE" ? (
                                            <>
                                                <button
                                                    disabled={
                                                        isChange ? true : false
                                                    }
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                    className="btn btn-primary"
                                                    onClick={isChangeHandle}
                                                >
                                                    Change
                                                </button>
                                                {/*  */}
                                                <button
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                    className="btn btn-danger"
                                                    onClick={() => {
                                                        setIsDelete(true);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
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
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "20px",
                                        }}
                                    >
                                        <div class="form-floating mb-4">
                                            <input
                                                disabled={
                                                    isChange ? false : true
                                                }
                                                type="text"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={
                                                    requestInfor?.userFullname
                                                }
                                                onChange={(event) => {
                                                    setRequestInfor({
                                                        ...requestInfor,
                                                        userFullname:
                                                            event.target.value,
                                                    });
                                                }}
                                            />
                                            <label for="floatingInput">
                                                Fullname
                                            </label>
                                        </div>

                                        <div class="form-floating mb-4">
                                            <input
                                                disabled={
                                                    isChange ? false : true
                                                }
                                                type="text"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={
                                                    requestInfor?.phoneNumber
                                                }
                                                onChange={(event) => {
                                                    setRequestInfor({
                                                        ...requestInfor,
                                                        phoneNumber:
                                                            event.target.value,
                                                    });
                                                }}
                                            />
                                            <label for="floatingInput">
                                                Phone number
                                            </label>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "20px",
                                        }}
                                    >
                                        <div class="form-floating mb-3">
                                            {isChange ? (
                                                <>
                                                    <DatePicker
                                                        style={{
                                                            height: "100%",
                                                            backgroundColor:
                                                                "white",
                                                            border: "1px solid #dee2e6",
                                                        }}
                                                        format={"DD-MM-YYYY"}
                                                        onChange={onChangeDate}
                                                        onClick={() => {
                                                            setIsSelectDate(
                                                                !isSelectDate
                                                            );
                                                        }}
                                                        disabledDate={
                                                            disabledDate
                                                        }
                                                        allowClear={false}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        disabled={
                                                            isChange
                                                                ? false
                                                                : true
                                                        }
                                                        type="text"
                                                        class="form-control"
                                                        value={converDate(
                                                            objectDetail
                                                                ?.requestInfor
                                                                ?.dateBorrow
                                                        )}
                                                    />
                                                    <label>Borrow date</label>
                                                </>
                                            )}
                                        </div>

                                        <div class="form-floating mb-3">
                                            <input
                                                disabled={
                                                    isChange ? false : true
                                                }
                                                type="number"
                                                class="form-control"
                                                id="floatingInput"
                                                placeholder="name@example.com"
                                                value={requestInfor?.duration}
                                                onChange={(event) => {
                                                    setRequestInfor({
                                                        ...requestInfor,
                                                        duration:
                                                            event.target.value,
                                                    });
                                                }}
                                            />
                                            <label for="floatingInput">
                                                Duration (days)
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-floating mb-3">
                                        <textarea
                                            disabled={isChange ? false : true}
                                            class="form-control"
                                            placeholder="Leave a comment here"
                                            id="floatingTextarea2"
                                            style={{
                                                height: "80px",
                                                resize: "none",
                                            }}
                                            value={requestInfor?.note}
                                            onChange={(event) => {
                                                setRequestInfor({
                                                    ...requestInfor,
                                                    note: event.target.value,
                                                });
                                            }}
                                        />
                                        <label for="floatingTextarea2">
                                            Note
                                        </label>
                                    </div>
                                    {isChange && (
                                        <div>
                                            <span
                                                hidden={status == "DONE"}
                                                className="btn btn-primary"
                                                style={{
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    padding: "8px",
                                                    margin: "0",
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
                                    )}
                                    <div className="mb-2">
                                        {status == "DONE" ? (
                                            <>
                                                <h5
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    Response information
                                                </h5>
                                                {!outofstock ? (
                                                    <>
                                                        <div
                                                            style={{
                                                                display: "grid",
                                                                gridTemplateColumns:
                                                                    "1fr 1fr",
                                                                gap: " 20px",
                                                            }}
                                                        >
                                                            {status ==
                                                            "DONE" ? (
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
                                                                        Allow
                                                                        date
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
                                                                        onChange={
                                                                            onChangeDate
                                                                        }
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
                                                                </div>
                                                            )}

                                                            <div class="form-floating mb-3">
                                                                <input
                                                                    disabled={
                                                                        status ==
                                                                        "DONE"
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
                                                                            event
                                                                                .target
                                                                                .value
                                                                        );
                                                                    }}
                                                                />
                                                                <label for="floatingInput">
                                                                    Duration
                                                                    allow
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="form-floating mb-3">
                                                            <textarea
                                                                disabled={
                                                                    status ==
                                                                    "DONE"
                                                                }
                                                                class="form-control"
                                                                placeholder="Leave a comment here"
                                                                id="floatingTextarea2"
                                                                style={{
                                                                    height: "110px",
                                                                    resize: "none",
                                                                }}
                                                                value={
                                                                    noteAllow
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) => {
                                                                    setNoteAllow(
                                                                        event
                                                                            .target
                                                                            .value
                                                                    );
                                                                }}
                                                            />
                                                            <label for="floatingTextarea2">
                                                                Note
                                                            </label>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div class="form-floating mb-3">
                                                        <textarea
                                                            disabled={
                                                                status == "DONE"
                                                            }
                                                            class="form-control"
                                                            placeholder="Leave a comment here"
                                                            id="floatingTextarea2"
                                                            style={{
                                                                height: "110px",
                                                                resize: "none",
                                                            }}
                                                            value={noteAllow}
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setNoteAllow(
                                                                    event.target
                                                                        .value
                                                                );
                                                            }}
                                                        />
                                                        <label for="floatingTextarea2">
                                                            Note
                                                        </label>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
                {/*  */}
                <Modal
                    title="Basic Modal"
                    open={isDelete}
                    centered
                    // onOk={handleOk}
                    onCancel={() => {
                        setIsDelete(false);
                    }}
                >
                    <p>Are you sure to delete this request</p>
                </Modal>
                {/*  */}
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
            </div>
        </>
    );
};
export default DetailRequest;

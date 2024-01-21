import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Modal from "react-bootstrap/Modal";
import React from "react";
import ShortUniqueId from "short-unique-id";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { FaListCheck } from "react-icons/fa6";
import { FloatButton } from "antd";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { Tooltip } from "antd";
import style from "../SCSS/DetailRequest.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import axios from "../../utils/axiosCustomize.js";
import { useOutletContext } from "react-router-dom";
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
    const navigate = useNavigate();
    const { handleShowListRequest, idDetailRequest } = props;
    const [objectDetail, setObjectDetail] = useState(null);
    const [status, setStatus] = useState(null);
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [dateAllow, setDateAllow] = useState(null);
    const [durationAllow, setDurationAllow] = useState(null);
    const [noteAllow, setNoteAllow] = useState("");
    const [outofstock, setOutOfStock] = useState(false);

    const [show, setShow] = useState(false);
    let a = useRef();
    //
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `api/userRequest/detailRequest/${idDetailRequest}`
                );
                setObjectDetail(response?.data);
                if (response?.data?.isProgressing == false) {
                    a.current = true;

                    for (const book of response?.data?.listBorrowBooks) {
                        if (book?.bookId?.quantitySystem != 0) {
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

                    await axios.put("api/userRequest/updateProgress", {
                        idRequest: idDetailRequest,
                        isProgressing: true,
                    });
                } else {
                    a.current = false;
                    setShow(response?.data?.isProgressing);
                }
            } catch (error) {
                return;
            }
        }
        fetchData();
        return async () => {
            if (a.current) {
                await axios.put("api/userRequest/updateProgress", {
                    idRequest: idDetailRequest,
                    isProgressing: !a.current,
                });
            } else {
                await axios.put("api/userRequest/updateProgress", {
                    idRequest: idDetailRequest,
                    isProgressing: !a.current,
                });
            }
        };
    }, []);

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
            let hasNullQuantityAllow = false;
            for (const book of objectDetail?.listBorrowBooks || []) {
                if (book?.bookId?.quantitySystem != 0) {
                    if (
                        !book?.quantityAllow ||
                        book?.quantityAllow <= 0 ||
                        book?.quantityAllow > book?.bookId?.quantitySystem
                    ) {
                        toast.error("Fulfill required");
                        hasNullQuantityAllow = true;
                        break;
                    }
                }
            }
            if (hasNullQuantityAllow) {
                return;
            }

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
                        toast.success("OK");
                    }
                } else {
                    toast.error("Fulfill required");
                }
            } else {
                if (noteAllow) {
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
                        toast.success("OK");
                    }
                } else {
                    toast.error("Fulfill required");
                }
            }
        }
    };
    console.log("ABC");
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
                                    <select
                                        disabled={
                                            status == "INPROGRESS"
                                                ? true
                                                : false
                                        }
                                        value={status}
                                        style={{
                                            fontWeight: "bold",
                                            width: "150px",
                                        }}
                                        class="form-select"
                                        id="floatingSelect"
                                        onChange={(event) => {
                                            setStatus(event.target.value);
                                        }}
                                    >
                                        <option value="INPROGRESS">
                                            In Progress
                                        </option>
                                        <option value="DONE">Done</option>
                                    </select>
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
                                                                    padding:
                                                                        "5px 8px",
                                                                    backgroundColor:
                                                                        "#79bfea",
                                                                    borderRadius:
                                                                        "15px",
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
                                                            <span
                                                                style={{
                                                                    padding:
                                                                        "5px 8px",
                                                                    backgroundColor:
                                                                        "#eaecef",
                                                                    borderRadius:
                                                                        "15px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                System quantity
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
                                                                    book?.bookId
                                                                        ?.quantitySystem
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
                                                            <span
                                                                style={{
                                                                    padding:
                                                                        "5px 8px",
                                                                    backgroundColor:
                                                                        "#ffc109",
                                                                    borderRadius:
                                                                        "15px",
                                                                    fontWeight:
                                                                        "600",
                                                                }}
                                                            >
                                                                Allow quantity
                                                            </span>
                                                            <input
                                                                disabled={
                                                                    book?.bookId
                                                                        ?.quantitySystem ===
                                                                        0 ||
                                                                    status ==
                                                                        "DONE"
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
                                                                    book?.bookId
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
                                                                    width: "80px",
                                                                }}
                                                            />
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
                                    <div className="mb-2">
                                        <h5 style={{ fontWeight: "600" }}>
                                            Response information
                                        </h5>

                                        {!outofstock && (
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
                                                            allowClear={false}
                                                        />
                                                        <label
                                                            hidden={
                                                                isSelectDate ==
                                                                false
                                                                    ? false
                                                                    : true
                                                            }
                                                        >
                                                            Select date allow
                                                        </label>
                                                        {/* <label
                                                            style={{
                                                                top: "1px",
                                                                fontWeight:
                                                                    "bold",
                                                                fontSize:
                                                                    "17px",
                                                            }}
                                                            hidden={
                                                                isSelectDate ==
                                                                false
                                                                    ? false
                                                                    : true
                                                            }
                                                        >
                                                            {converDate(
                                                                objectDetail
                                                                    ?.requestInfor
                                                                    ?.dateBorrow
                                                            )}
                                                        </label> */}
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
                                                        value={durationAllow}
                                                        onChange={(event) => {
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
                                                    backgroundColor: "#019cda",
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
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </div>
            <div className="modal-delete">
                {/* Modal delete */}
                <Modal style={{ top: "200px" }} backdrop="static" show={show}>
                    <Modal.Header>
                        <Modal.Title>Notification!!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fontWeight: "300" }}>
                        This request is updating by user, come back later!
                    </Modal.Body>
                    <Modal.Footer>
                        <span
                            className="btn btn-secondary"
                            onClick={() => {
                                handleShowListRequest();
                            }}
                        >
                            Close
                        </span>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};
export default DetailRequest;

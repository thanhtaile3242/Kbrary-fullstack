// import {
//     MDBBtn,
//     MDBCard,
//     MDBCardBody,
//     MDBCardImage,
//     MDBCol,
//     MDBContainer,
//     MDBIcon,
//     MDBInput,
//     MDBRow,
//     MDBTypography,
// } from "mdb-react-ui-kit";
// import React from "react";
// import "./DetailRequest.scss";
// import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
// import { DatePicker } from "antd";
// const onChange = (date, dateString) => {
//     console.log(date, dateString);
// };
// const DetailRequest = () => {
//     return (
//         <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
//             <MDBContainer className="py-5 h-100">
//                 <MDBRow className="justify-content-center align-items-center h-100">
//                     <MDBCol>
//                         <MDBCard>
//                             <MDBCardBody className="p-4">
//                                 <MDBRow>
//                                     <MDBCol lg="7">
//                                         <MDBTypography tag="h5">
//                                             <a href="#!" className="text-body">
//                                                 <MDBIcon
//                                                     fas
//                                                     icon="long-arrow-alt-left me-2"
//                                                 />{" "}
//                                                 Tiếp tục mượn sách
//                                             </a>
//                                         </MDBTypography>

//                                         <hr />

//                                         <div className="d-flex justify-content-between align-items-center mb-4">
//                                             <div>
//                                                 <p className="mb-0">
//                                                     You have 4 books in your
//                                                     list
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div
//                                             style={{
//                                                 paddingRight: "28px",
//                                                 paddingLeft: "10px",
//                                                 height: "400px",
//                                                 maxWidth: "100%",
//                                                 overflowX: "hidden",
//                                                 overflow: "auto",
//                                             }}
//                                         >
//                                             <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div
//                                                             className="d-flex flex-row align-items-center"
//                                                             style={{
//                                                                 gap: "30px",
//                                                             }}
//                                                         >
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     Iphone 11
//                                                                     pro
//                                                                 </MDBTypography>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                     display:
//                                                                         "flex",
//                                                                     alignItems:
//                                                                         "center",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     2
//                                                                 </MDBTypography>
//                                                                 <span
//                                                                     style={{
//                                                                         display:
//                                                                             "flex",
//                                                                         flexDirection:
//                                                                             "column",
//                                                                         width: "25px",
//                                                                         alignItems:
//                                                                             "center",
//                                                                     }}
//                                                                 >
//                                                                     <IoIosArrowUp />
//                                                                     <IoIosArrowDown />
//                                                                 </span>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             ></div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard>

//                                             <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     Samsung
//                                                                     galaxy Note
//                                                                     10
//                                                                 </MDBTypography>
//                                                                 <p className="small mb-0">
//                                                                     256GB, Navy
//                                                                     Blue
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     2
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="mb-0"
//                                                                 >
//                                                                     $900
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard>

//                                             <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     Canon EOS
//                                                                     M50
//                                                                 </MDBTypography>
//                                                                 <p className="small mb-0">
//                                                                     Onyx Black
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     1
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="mb-0"
//                                                                 >
//                                                                     $1199
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard>

//                                             {/* <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     MacBook Pro
//                                                                 </MDBTypography>
//                                                                 <p className="small mb-0">
//                                                                     1TB,
//                                                                     Graphite
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     1
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="mb-0"
//                                                                 >
//                                                                     $1799
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard> */}

//                                             {/* <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     MacBook Pro
//                                                                 </MDBTypography>
//                                                                 <p className="small mb-0">
//                                                                     1TB,
//                                                                     Graphite
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     1
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="mb-0"
//                                                                 >
//                                                                     $1799
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard>

//                                             <MDBCard className="mb-3">
//                                                 <MDBCardBody>
//                                                     <div className="d-flex justify-content-between">
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div>
//                                                                 <MDBCardImage
//                                                                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
//                                                                     fluid
//                                                                     className="rounded-3"
//                                                                     style={{
//                                                                         width: "65px",
//                                                                     }}
//                                                                     alt="Shopping item"
//                                                                 />
//                                                             </div>
//                                                             <div className="ms-3">
//                                                                 <MDBTypography tag="h5">
//                                                                     MacBook Pro
//                                                                 </MDBTypography>
//                                                                 <p className="small mb-0">
//                                                                     1TB,
//                                                                     Graphite
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                         <div className="d-flex flex-row align-items-center">
//                                                             <div
//                                                                 style={{
//                                                                     width: "50px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="fw-normal mb-0"
//                                                                 >
//                                                                     1
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <div
//                                                                 style={{
//                                                                     width: "80px",
//                                                                 }}
//                                                             >
//                                                                 <MDBTypography
//                                                                     tag="h5"
//                                                                     className="mb-0"
//                                                                 >
//                                                                     $1799
//                                                                 </MDBTypography>
//                                                             </div>
//                                                             <a
//                                                                 href="#!"
//                                                                 style={{
//                                                                     color: "#cecece",
//                                                                 }}
//                                                             >
//                                                                 <MDBIcon
//                                                                     fas
//                                                                     icon="trash-alt"
//                                                                 />
//                                                             </a>
//                                                         </div>
//                                                     </div>
//                                                 </MDBCardBody>
//                                             </MDBCard> */}
//                                         </div>
//                                     </MDBCol>

//                                     <MDBCol lg="5">
//                                         <MDBCard className="bg-primary text-white rounded-3">
//                                             <MDBCardBody
//                                                 style={{ height: "483px" }}
//                                             >
//                                                 <div className="d-flex justify-content-between align-items-center mb-4">
//                                                     <MDBTypography
//                                                         tag="h5"
//                                                         className="mb-0"
//                                                     >
//                                                         Thông tin bạn mượn
//                                                     </MDBTypography>
//                                                     <MDBCardImage
//                                                         src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                                         fluid
//                                                         className="rounded-3"
//                                                         style={{
//                                                             width: "45px",
//                                                         }}
//                                                         alt="Avatar"
//                                                     />
//                                                 </div>

//                                                 <form className="mt-4">
//                                                     <MDBInput
//                                                         className="mb-4"
//                                                         label="Cardholder's Name"
//                                                         type="text"
//                                                         size="lg"
//                                                         placeholder="Cardholder's Name"
//                                                         contrast
//                                                     />

//                                                     <MDBInput
//                                                         className="mb-4"
//                                                         label="Card Number"
//                                                         type="text"
//                                                         size="lg"
//                                                         minLength="19"
//                                                         maxLength="19"
//                                                         placeholder="1234 5678 9012 3457"
//                                                         contrast
//                                                     />

//                                                     <MDBRow className="mb-4">
//                                                         <MDBCol md="6">
//                                                             <MDBInput
//                                                                 className="mb-4"
//                                                                 label="Expiration"
//                                                                 type="text"
//                                                                 size="lg"
//                                                                 minLength="7"
//                                                                 maxLength="7"
//                                                                 placeholder="MM/YYYY"
//                                                                 contrast
//                                                             />
//                                                         </MDBCol>
//                                                         <MDBCol md="6">
//                                                             <DatePicker
//                                                                 onChange={
//                                                                     onChange
//                                                                 }
//                                                             />
//                                                         </MDBCol>
//                                                     </MDBRow>
//                                                 </form>

//                                                 <hr />

//                                                 <div className="d-flex justify-content-between">
//                                                     <p className="mb-2">
//                                                         Thời gian mượn sách
//                                                     </p>
//                                                     <p className="mb-2">
//                                                         $4798.00
//                                                     </p>
//                                                 </div>

//                                                 <div className="d-flex justify-content-between">
//                                                     <p className="mb-2">
//                                                         Số lượng sách
//                                                     </p>
//                                                     <p className="mb-2">
//                                                         $20.00
//                                                     </p>
//                                                 </div>

//                                                 <MDBBtn
//                                                     color="info"
//                                                     block
//                                                     size="lg"
//                                                 >
//                                                     <div>
//                                                         <span>Hoàn tất</span>
//                                                     </div>
//                                                 </MDBBtn>
//                                             </MDBCardBody>
//                                         </MDBCard>
//                                     </MDBCol>
//                                 </MDBRow>
//                             </MDBCardBody>
//                         </MDBCard>
//                     </MDBCol>
//                 </MDBRow>
//             </MDBContainer>
//         </section>
//     );
// };

// export default DetailRequest;

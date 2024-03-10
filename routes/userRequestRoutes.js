import express from "express";
const router = express.Router();
import {
    createUserRequestController,
    getDetailRequestController,
    findRequestController,
    updateRequestControllerAdmin,
    updateProgressController,
    updateRequestControllerUser,
    deleteRequestController,
    sendEmailRequestController,
    updateFromUserController,
    lockFromUserController,
    updateBorrowController,
    completeReceiveRequestController,
} from "../controllers/userRequestControllers.js";
// Create a request of user
router.post("/create", createUserRequestController);
// Get detail a request
router.get("/detailRequest/:id", getDetailRequestController);
router.get("/find", findRequestController);
router.put("/update", updateRequestControllerAdmin);
router.put("/updateProgress", updateProgressController);
// Update request - Role: user
router.put("/update/userrole", updateRequestControllerUser);
// Delete request - Role: user
router.delete("/deleteRequest/:id", deleteRequestController);
// Send Email to user
router.post("/sendEmailRequest", sendEmailRequestController);
// Update user request (Role: User)
router.put("/updateFromUser", updateFromUserController);
// Lock request by User (Role: User)
router.put("/lockFromUser", lockFromUserController);
// Update request status (role: Admin)
router.put("/updateStatus", updateBorrowController);
// Update receive request and quantity of books (role: Admin)
router.put("/completeReceiveRequest", completeReceiveRequestController);
// Delete request (role: Admin)
router.put("/deleteRequest", deleteRequestController);

export default router;

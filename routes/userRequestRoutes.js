import express from "express";
const router = express.Router();
import {
    createUserRequestController,
    getDetailRequestController,
    getPendingRequestController,
    updatePendingRequestController,
    updatePendingRequestWithUserID,
    findRequestController,
    updateRequestControllerAdmin,
    updateProgressController,
    updateRequestControllerUser,
} from "../controllers/userRequestControllers.js";
// Create a request of user
router.post("/create", createUserRequestController);
// Get detail a request
router.get("/detailRequest/:id", getDetailRequestController);
// Get pending request
router.get("/pending/:id", getPendingRequestController);
// Delete a category
// router.put("/pending/update", updatePendingRequestController);
//
router.put("/pending/updateWithUserId", updatePendingRequestWithUserID);

//
router.get("/find", findRequestController);
//
router.put("/update", updateRequestControllerAdmin);
router.put("/updateProgress", updateProgressController);
// Update request - Role: user
router.put("/update/userrole", updateRequestControllerUser);
export default router;

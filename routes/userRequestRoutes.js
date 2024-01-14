import express from "express";
const router = express.Router();
import {
    createUserRequestController,
    getDetailRequestController,
    getPendingRequestController,
    updatePendingRequestController,
    updatePendingRequestWithUserID,
    findRequestControllerUser,
} from "../controllers/userRequestControllers.js";
// Create a request of user
router.post("/create", createUserRequestController);
// Get detail a request
router.get("/detailRequest/:id", getDetailRequestController);
// Get pending request
router.get("/pending/:id", getPendingRequestController);
// Delete a category
router.put("/pending/update", updatePendingRequestController);
//
router.put("/pending/updateWithUserId", updatePendingRequestWithUserID);

router.get("/find", findRequestControllerUser);

export default router;

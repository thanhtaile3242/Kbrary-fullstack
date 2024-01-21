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
export default router;

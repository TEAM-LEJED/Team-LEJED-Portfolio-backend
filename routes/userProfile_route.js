import { Router } from "express";
import { getUserProfile, newUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkAuth } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";


// Create and export router
export const userProfileRouter = Router()


// Define routes
userProfileRouter.post('/users/userProfile', remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }, { name: "resume", maxCount: 1 },]), checkAuth, newUserProfile);

userProfileRouter.patch('/users/userProfile', remoteUpload.fields([{ name: "profilePicture", maxCount: 1 }, { name: "resume", maxCount: 1 },]), checkAuth, updateUserProfile);

userProfileRouter.get('/users/userProfile', getUserProfile);


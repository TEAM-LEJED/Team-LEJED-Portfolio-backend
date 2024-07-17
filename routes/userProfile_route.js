import { Router } from "express";
import { getUserProfile, newUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkAuth } from "../middlewares/auth.js";


// Create and export router
export const userProfileRouter = Router()


// Define routes
userProfileRouter.post('/users/userProfile', checkAuth, newUserProfile);

userProfileRouter.patch('/users/userProfile', checkAuth, updateUserProfile);

userProfileRouter.get('/users/userProfile', checkAuth, getUserProfile);


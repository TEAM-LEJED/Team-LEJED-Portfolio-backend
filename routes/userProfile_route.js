import { Router } from "express";
import { getUserProfile, newUserProfile, updateUserProfile } from "../controllers/userProfile_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


// Create and export router
export const userProfileRouter = Router()


// Define routes
userProfileRouter.post('users/userProfile', checkUserSession, newUserProfile);

userProfileRouter.patch('users/userProfile', checkUserSession, updateUserProfile);

userProfileRouter.get('users/userProfile', getUserProfile);


import { createEducation, deleteEducation,  getEducation, patchEducation } from "../controllers/education_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const educationRouter = Router()

educationRouter.post('/users/education', checkUserSession, createEducation)

educationRouter.get('/users/education', checkUserSession, getEducation)

educationRouter.patch('/users/education/:id', checkUserSession, patchEducation)

educationRouter.delete('/users/education/:id', checkUserSession, deleteEducation)
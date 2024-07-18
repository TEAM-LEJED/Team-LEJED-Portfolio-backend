import { createEducation, deleteEducation,  getEducation, getOneEducation, patchEducation } from "../controllers/education_controller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const educationRouter = Router()

educationRouter.post('/users/education', checkAuth, createEducation)

educationRouter.get('/users/education', checkAuth, getEducation)

educationRouter.get('/users/education/:id', getOneEducation)

educationRouter.patch('/users/education/:id', checkAuth, patchEducation)

educationRouter.delete('/users/education/:id', checkAuth, deleteEducation)
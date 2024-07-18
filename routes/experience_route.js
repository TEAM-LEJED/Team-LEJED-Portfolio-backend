import { createExperience, deleteExperience, getExperience, getOneExperience, patchExperience } from "../controllers/experience_controller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkAuth, createExperience)

experienceRouter.get('/users/experiences', checkAuth, getExperience)

experienceRouter.get('/users/experiences/:id', getOneExperience)

experienceRouter.patch('/users/experiences/:id', checkAuth, patchExperience)

experienceRouter.delete('/users/experiences/:id', checkAuth, deleteExperience)
import { createExperience, deleteExperience, getExperience, patchExperience } from "../controllers/experience_contoller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkAuth, createExperience)

experienceRouter.get('/users/experiences', checkAuth, getExperience)

experienceRouter.patch('/users/experiences/:id', checkAuth, patchExperience)


experienceRouter.delete('/users/experiences/:id', checkAuth, deleteExperience)
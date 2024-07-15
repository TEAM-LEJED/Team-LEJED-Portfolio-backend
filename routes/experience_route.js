import { createExperience, deleteExperience, getExperience, patchExperience } from "../controllers/experience_contoller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkUserSession, createExperience)

experienceRouter.get('/users/experiences', checkUserSession, getExperience)

experienceRouter.patch('/users/experiences/:id', checkUserSession, patchExperience)


experienceRouter.delete('/users/experiences/:id', checkUserSession, deleteExperience)
import { createExperience, deleteExperience, getExperience, patchExperience } from "../controllers/experience_contoller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const ExperienceRouter = Router()

ExperienceRouter.post('/users/experiences', checkUserSession, createExperience)

ExperienceRouter.get('/users/experiences', checkUserSession, getExperience)

ExperienceRouter.patch('/users/experiences/:id', checkUserSession, patchExperience)


ExperienceRouter.delete('/users/experiences/:id', checkUserSession, deleteExperience)
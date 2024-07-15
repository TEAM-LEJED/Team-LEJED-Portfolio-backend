
import { createAchievements, deleteAchievements, findAllAchievements, patchAchievements } from "../controllers/achievements_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkUserSession, createAchievements)

achievementRouter.get('/users/achievements', checkUserSession, findAllAchievements)

achievementRouter.patch('/users/achievements/:id', checkUserSession, patchAchievements)

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteAchievements)
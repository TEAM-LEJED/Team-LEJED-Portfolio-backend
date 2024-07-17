
import { createAchievements, deleteAchievements, findAllAchievements, patchAchievements } from "../controllers/achievements_controller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkAuth, createAchievements)

achievementRouter.get('/users/achievements', checkAuth, findAllAchievements)

achievementRouter.patch('/users/achievements/:id', checkAuth, patchAchievements)

achievementRouter.delete('/users/achievements/:id', checkAuth, deleteAchievements)
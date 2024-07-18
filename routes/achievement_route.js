
import { createAchievements, deleteAchievements, findAllAchievements, patchAchievements } from "../controllers/achievements_controller.js";
import { checkAuth } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkAuth, remoteUpload.fields([
    { name: 'award' },
    { name: 'image' },
]), createAchievements)

achievementRouter.post('/users/achievements', remoteUpload.single('image'), checkAuth, createAchievements)

achievementRouter.get('/users/achievements', checkAuth, findAllAchievements)

achievementRouter.patch('/users/achievements/:id', remoteUpload.single('image'), checkAuth, patchAchievements)

achievementRouter.delete('/users/achievements/:id', checkAuth, deleteAchievements)
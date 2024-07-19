
import { createAchievements, deleteAchievements, findAllAchievements, getOneAchievement, patchAchievements } from "../controllers/achievements_controller.js";
import { checkAuth } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

import { Router } from "express";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkAuth, remoteUpload.single('image'), createAchievements);

achievementRouter.get('/users/achievements', findAllAchievements);

achievementRouter.get('/users/achievements/:id', getOneAchievement);

achievementRouter.patch('/users/achievements/:id',checkAuth, remoteUpload.single('image'),  patchAchievements);

achievementRouter.delete('/users/achievements/:id', checkAuth, deleteAchievements);
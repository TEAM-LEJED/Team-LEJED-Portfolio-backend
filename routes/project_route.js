import { createProjects, deleteProjects, getProjects, patchProjects } from "../controllers/project_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";


export const projectRouter = Router()

projectRouter.post('/users/projects', remoteUpload.single('image'), checkUserSession, createProjects)

projectRouter.get('/users/projects', checkUserSession, getProjects)

projectRouter.patch('/users/projects/:id', remoteUpload.single('image'), checkUserSession, patchProjects)

projectRouter.delete('/users/projects/:id',  checkUserSession, deleteProjects)
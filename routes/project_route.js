import { createProjects, deleteProjects, getOneProject, getProjects, patchProjects } from "../controllers/project_controller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";


export const projectRouter = Router()

projectRouter.post('/users/projects', remoteUpload.single('image'), checkAuth, createProjects)

projectRouter.get('/users/projects', checkAuth, getProjects)

projectRouter.get('/users/projects/:id', getOneProject)

projectRouter.patch('/users/projects/:id', remoteUpload.single('image'), checkAuth, patchProjects)

projectRouter.delete('/users/projects/:id',  checkAuth, deleteProjects)
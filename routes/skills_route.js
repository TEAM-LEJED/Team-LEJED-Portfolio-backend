import { Router } from "express";
import { deleteSkill, getAllSkills, getOneSkill, updateSkill, addSkill } from "../controllers/skills_controller.js";
import { checkAuth } from "../middlewares/auth.js";


// Create router
export const skillRouter = Router();


// Define routes
skillRouter.post('/users/skills', checkAuth, addSkill);

skillRouter.get('/users/skills', getAllSkills);

skillRouter.get('/users/skills/:id', getOneSkill);

skillRouter.patch('/users/skills/:id', checkAuth, updateSkill);

skillRouter.delete('/users/skills/:id', checkAuth, deleteSkill);
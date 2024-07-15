import { Router } from "express";
import { deleteSkill, getAllSkills, getOneSkill, updateSkill, addSkill } from "../controllers/skills_controller.js";
import { checkUserSession } from "../middlewares/auth.js";


// Create router
export const skillRouter = Router();


// Define routes
skillRouter.post('/users/skills', checkUserSession, addSkill);

skillRouter.get('/users/skills', getAllSkills);

skillRouter.get('/users/skills/:id', getOneSkill);

skillRouter.patch('/users/skills/:id', checkUserSession, updateSkill);

skillRouter.delete('/users/skills/:id', checkUserSession, deleteSkill);
import { createVolunteering, deleteVolunteering, getAllVolunteering, updateVolunteering } from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createVolunteering)

volunteeringRouter.get('/users/volunteering', checkUserSession, getAllVolunteering)

volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, updateVolunteering)

volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteVolunteering)
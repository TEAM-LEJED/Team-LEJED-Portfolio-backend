import { createVolunteering, deleteVolunteering, getAllVolunteering, updateVolunteering } from "../controllers/volunteering_controller.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkAuth, createVolunteering)

volunteeringRouter.get('/users/volunteering', checkAuth, getAllVolunteering)

volunteeringRouter.patch('/users/volunteering/:id', checkAuth, updateVolunteering)

volunteeringRouter.delete('/users/volunteering/:id', checkAuth, deleteVolunteering)
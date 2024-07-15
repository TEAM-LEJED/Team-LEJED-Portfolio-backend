import { createVolunteering, deleteVolunteer, getVolunteer, patchVolunteer } from "../controllers/volunteering_controller.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createVolunteering)

volunteeringRouter.get('/users/volunteering', checkUserSession, getVolunteer)

volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, patchVolunteer)

volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteVolunteer)
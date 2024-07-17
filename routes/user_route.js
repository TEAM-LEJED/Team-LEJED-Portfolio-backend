import { getUser, patchUser, signup, login, logout, tokenLogin } from "../controllers/user_controller.js";
import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";



export const userRouter = Router()

userRouter.post('/users/auth/signup', signup);

userRouter.post('/users/auth/login', login);

userRouter.post('/users/auth/logout', checkAuth, logout);

userRouter.get('/users/auth/:userName', getUser);

userRouter.patch('/users/:id', checkAuth, patchUser);

userRouter.post('/users/token', tokenLogin)
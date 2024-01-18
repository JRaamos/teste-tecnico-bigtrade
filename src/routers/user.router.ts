import express from 'express';
import { UserModel, model } from '../models/User.model';
import { UserService } from '../services/User.service';
import UserController from '../controllers/User.controller';



const userModel = new UserModel(model);
const userService = new UserService(userModel);
const userController = new UserController(userService)



const userRouter = express.Router();

userRouter.get('/users/:id', userController.getById.bind
(userController));

export default userRouter;

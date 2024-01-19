import express from 'express';
import { UserModel, model } from '../models/User.model';
import { UserService } from '../services/User.service';
import UserController from '../controllers/User.controller';
import UserValidationMiddleware from '../middlewares/ValidationsCreate'; // Certifique-se de importar o middleware correto

const userModel = new UserModel(model);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userValidationMiddleware = new UserValidationMiddleware(userModel); 

const userRouter = express.Router();

userRouter.get('/users/:id', userController.getById.bind(userController));
userRouter.get('/users', userController.getAll.bind(userController));

userRouter.post('/users', userValidationMiddleware.validateUserCreation.bind(userValidationMiddleware), userController.create.bind(userController));

export default userRouter;

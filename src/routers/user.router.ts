import express from "express";
import { UserModel, model } from "../models/User.model";
import { UserService } from "../services/User.service";
import UserController from "../controllers/User.controller";
import UserMiddleware from "../middlewares/UserMiddleware";

const userModel = new UserModel(model);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userMiddleware = new UserMiddleware(userModel);

const userRouter = express.Router();

const validateUserParans =
  userMiddleware.validateUserParans.bind(userMiddleware);
const validateIdEmailInUse =
  userMiddleware.validateIdEmailInUse.bind(userMiddleware);
const validateUserUpdate =
  userMiddleware.validateUserUpdate.bind(userMiddleware);

userRouter.get("/users/:id", userController.getById.bind(userController));

userRouter.get("/users", userController.getAll.bind(userController));

userRouter.post(
  "/users",
  validateUserParans,
  validateIdEmailInUse,
  userController.create.bind(userController)
);

userRouter.put(
  "/users/:id",
  validateUserParans,
  validateUserUpdate,
  userController.update.bind(userController)
);

userRouter.delete("/users/:id", userController.delete.bind(userController));

export default userRouter;

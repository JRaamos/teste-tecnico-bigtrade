import express from "express";
import { PostModel, model } from "../models/Post.model";
import { PostService } from "../services/Post.service";
import PostController from "../controllers/Post.controller";
import PostMiddleware from "../middlewares/PostMiddleware";

const postModel = new PostModel(model);
const postService = new PostService(postModel);
const postController = new PostController(postService);
const postMiddleware = new PostMiddleware(postModel);

const validatePostBody = postMiddleware.validatePostBody.bind(postMiddleware);
const validatePostTextInUse =
  postMiddleware.validatePostTextInUse.bind(postMiddleware);
const validateUpdatePostBody =
  postMiddleware.validateUpdatePostBody.bind(postMiddleware);

const postRouter = express.Router();

postRouter.get("/posts", postController.getAll.bind(postController));

postRouter.post(
  "/posts",
  validatePostBody,
  validatePostTextInUse,
  postController.create.bind(postController)
);
postRouter.get("/posts/:id", postController.getById.bind(postController));

postRouter.put(
  "/posts/:id",
  validatePostBody,
  validateUpdatePostBody,
  postController.update.bind(postController)
);

postRouter.delete("/posts/:id", postController.delete.bind(postController));

export default postRouter;

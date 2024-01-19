import express from 'express';
import { PostModel, model } from '../models/Post.model';
import { PostService } from '../services/Post.service';
import PostController from '../controllers/Post.controller';



const postModel = new PostModel(model);
const postService = new PostService(postModel);
const postController = new PostController(postService)



const postRouter = express.Router();

postRouter.post('/posts', postController.create.bind(postController))

export default postRouter;

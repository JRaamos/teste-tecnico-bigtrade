import { NextFunction, Request, Response } from "express";
import ModelAdapter from "../shared/model.adapter";

export default class PostMiddleware {
  private model: ModelAdapter<any>;

  constructor(model: ModelAdapter<any>) {
    this.model = model;
  }

  async validatePostBody(req: Request, res: Response, next: NextFunction) {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res
        .status(400)
        .json({ message: "All fields must be filled, title, content, userId" });
    }
    const posts = await this.model.getAll();

    const existingPost = posts.find((post) => post.title === title);
    if (existingPost) {
      return res
        .status(409)
        .json({
          message: "I used another 'title', this one is already in use",
        });
    }

    const existingContent = posts.find((post) => post.content === content);
    if (existingContent) {
      return res.status(409).json({
        message: "I used another 'content', this one is already in use",
      });
    }

    next();
  }
}

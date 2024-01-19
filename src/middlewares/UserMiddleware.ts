import { NextFunction, Request, Response } from "express";
import ModelAdapter from "../shared/model.adapter";
const regexEmail = /[A-Za-z0-9]+@[A-Za-z]+\.com/;

export default class UserMiddleware {
  private model: ModelAdapter<any>;

  constructor(model: ModelAdapter<any>) {
    this.model = model;
  }

  async validateUserParans(req: Request, res: Response, next: NextFunction) {
    const { displayName, email, password } = req.body;
    if (!displayName || !email || !password) {
      return res
        .status(400)
        .json({
          message: "All fields must be filled,displayName, email, password",
        });
    }

    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    next();
  }

  async validateIdEmailInUse(req: Request, res: Response, next: NextFunction) {
    const { id, email } = req.body;

    const existingUser = id && (await this.model.getById(id));
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "I used another 'id', this one is already in use" });
    }

    const existingEmail = await this.model.getByEmail(email);
    if (existingEmail) {
      return res.status(409).json({
        message: "I used another 'email', this one is already in use",
      });
    }
    next();
  }

  async validateUserUpdate(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.id;
    const { id, email } = req.body;

    const user = await this.model.getById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email !== email) {
      const existingEmail = await this.model.getByEmail(email);
      if (existingEmail) {
        return res.status(409).json({
          message: "I used another 'email', this one is already in use",
        });
      }
    }

    if (user.id !== id) {
      const existingUser = await this.model.getById(id);
      if (existingUser) {
        return res
          .status(409)
          .json({ message: "I used another 'id', this one is already in use" });
      }
    }

    next();
  }
}

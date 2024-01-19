import { NextFunction, Request, Response } from 'express';
import ModelAdapter from "../shared/model.adapter";

class UserValidationMiddleware {
  private model: ModelAdapter<any>;

  constructor(model: ModelAdapter<any>) {
    this.model = model;
  }

  async validateUserCreation(req: Request, res: Response, next: NextFunction) {
    const { id, displayName, email, password } = req.body;
    const regexEmail = /[A-Za-z0-9]+@[A-Za-z]+\.com/;

    if (!id || !displayName || !email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    
    const existingUser = await this.model.getById(id);
    if (existingUser) {
      return res.status(409).json({ message: "I used another 'id', this one is already in use" });
    }

    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    const existingEmail = await this.model.getByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ message: "I used another 'email', this one is already in use" });
    }
    next();
  }
}

export default UserValidationMiddleware;

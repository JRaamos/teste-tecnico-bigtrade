import User from "../interfaces/User.interface";
import ModelAdapter from "../shared/model.adapter";
import ServiceAdapter from "../shared/service.adapter";

export class UserService extends ServiceAdapter<User> {
  constructor(model: ModelAdapter<User>) {
    super(model);
  }
}
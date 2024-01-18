import User from "../interfaces/User.interface";
import ControllerAdapter from "../shared/controller.adapter";
import ServiceAdapter from "../shared/service.adapter";

export default class UserController extends ControllerAdapter<User> {
  constructor(service: ServiceAdapter<User>) {
    super(service);
  }
}
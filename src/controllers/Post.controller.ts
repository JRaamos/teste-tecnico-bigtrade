import Post from "../interfaces/Post.interface";
import ControllerAdapter from "../shared/controller.adapter";
import ServiceAdapter from "../shared/service.adapter";

export default class PostController extends ControllerAdapter<Post> {
  constructor(service: ServiceAdapter<Post>) {
    super(service);
  }
}
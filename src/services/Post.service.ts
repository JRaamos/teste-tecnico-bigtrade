import Post from "../interfaces/Post.interface";
import ModelAdapter from "../shared/model.adapter";
import ServiceAdapter from "../shared/service.adapter";

export class PostService extends ServiceAdapter<Post> {
  constructor(model: ModelAdapter<Post>) {
    super(model);
  }
}
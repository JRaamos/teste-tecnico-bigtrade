import Post from "../interfaces/Post.interface";
import mongoose, { Document, Model, Schema } from "mongoose";
import ModelAdapter from "../shared/model.adapter";

const PostSchema: Schema = new Schema<Post>({
  id: { type: Number, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Number, required: true },
  published: Date,
  updated: Date,
});

export const model = mongoose.model<Post & Document>("Post", PostSchema);

export class PostModel extends ModelAdapter<Post> {
  constructor(model: Model<Post & Document>) {
    super(model as unknown as Model<Post>);
  }

  async create(data: Partial<Post>): Promise<Post> {
    const { title, content, userId } = data;
    if (!title || !content || !userId) {
      throw new Error("Missing required fields");
    }
    const results = await this.model.find().exec();
    const newData: Post = {
      title,
      content,
      userId,
      id: results.length + 1,
      published: new Date(),
      updated: new Date(),
    };

    return this.model.create(newData);
  }
}

import Post from "../interfaces/Post.interface";
import mongoose, { Document, Model, Schema } from 'mongoose';
import ModelAdapter from "../shared/model.adapter";


const PostSchema: Schema = new Schema<Post>({
  id: { type: String, required: true, unique: true, },
  title: { type: String, required: true },
  content: { type: String, required: true},
  userId: { type: Number, required: true },
  published: Date,
  updated: Date
});

export const model = mongoose.model<Post & Document>('Post', PostSchema);

export class PostModel extends ModelAdapter<Post> {
  constructor(model: Model<Post & Document>) {
    super(model as unknown as Model<Post>);
  }
}
import mongoose, { Document, Model, Schema } from 'mongoose';
import User from '../interfaces/User.interface';
import ModelAdapter from '../shared/model.adapter'

const UserSchema: Schema = new Schema<User>({
  id: { type: Number, required: true, unique: true, }, 
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const model = mongoose.model<User & Document>('User', UserSchema);

export class UserModel extends ModelAdapter<User> {
  constructor(model: Model<User & Document>) {
    super(model as unknown as Model<User>);
  }
}


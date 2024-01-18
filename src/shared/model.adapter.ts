import { Model } from "mongoose";

export default abstract class ModelAdapter<T> {
  protected model: Model<T>;
  constructor(
    model: Model<T>,
  ) {
    this.model = model;
  }
  async getById(id: string): Promise<Partial<T> | null> {
    const result = await this.model.findOne({ id }).exec();
    if (!result) {
      return null;
    }
    const { _id, ...filteredObject } = result.toObject();
    if ('__v' in result) {
      delete filteredObject['__v'];
    }

    return filteredObject as Partial<T>;
  }
}
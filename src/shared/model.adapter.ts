import { Model } from "mongoose";

export default abstract class ModelAdapter<T> {
  protected model: Model<T>;
  constructor(
    model: Model<T>,
  ) {
    this.model = model;
  }
  async getById(id: string): Promise<Partial<T> | null> {
    console.log(id);
    const result = await this.model.findOne({ id }).exec();

    if (!result) {
      return null;
    }
    const plainObject = result.toObject();

    const { _id, ...filteredObject } = plainObject as {
      _id: any;
      [key: string]: any;
    };

    if (result.__v !== undefined) {
      delete filteredObject['__v'];
    }

    return filteredObject as Partial<T>;
  }

}
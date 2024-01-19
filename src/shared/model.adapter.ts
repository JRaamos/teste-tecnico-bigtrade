import { Model } from "mongoose";

export default abstract class ModelAdapter<T> {
  protected model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const results = await this.model.find().exec();
    const newData: T = { ...(data as T), id: results.length + 1 };

    return this.model.create(newData);
  }

  async update(id: string, data: Partial<T>): Promise<Partial<T | null>> {
    const result = await this.model.updateOne({ id }, data).exec();

    if (result.modifiedCount === 0) {
      return null;
    }
    return data;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      return false;
    }
    return true;
  }

  async getById(id: string): Promise<Partial<T> | null> {
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
      delete filteredObject["__v"];
    }

    return filteredObject as Partial<T>;
  }

  async getAll(): Promise<Partial<T>[]> {
    const results = await this.model.find().exec();

    return results.map((result) => {
      const plainObject = result.toObject();

      const { _id, ...filteredObject } = plainObject as {
        _id: any;
        [key: string]: any;
      };

      if (result.__v !== undefined) {
        delete filteredObject["__v"];
      }

      return filteredObject as Partial<T>;
    });
  }

  async getByEmail(email: string): Promise<boolean | null> {
    const result = await this.model.findOne({ email }).exec();

    if (!result) {
      return null;
    }
    return true;
  }
}

import ModelAdapter from "./model.adapter";
import { ServiceResponse } from "../interfaces/ServiceResponse";

const notFound = 'No results found';

export default abstract class ServiceAdapter<T> {
  protected model: ModelAdapter<T>;
  constructor(model: ModelAdapter<T>) {
    this.model = model;
  }

  async create(
    data: Partial<T>
  ): Promise<ServiceResponse<Partial<{ message: string }>>> {
    const newUser = await this.model.create(data);
    if (!newUser) {
      return {
        status: "INTERNAL_ERROR",
        data: { message: "error creating, try again later" },
      };
    }
    return {
      status: "CREATED",
      data: { message: "Created successfully" },
    };
  }

  async update(
    id: string,
    data: Partial<T>
  ): Promise<ServiceResponse<Partial<T | null>>> {
    const result = await this.model.update(id, data);
    if (!result) {
      return {
        status: "NOT_FOUND",
        data: { message: notFound },
      };
    }
    return {
      status: "SUCCESSFUL",
      data: result,
    };
  }

  async delete(
    id: string
  ): Promise<ServiceResponse<Partial<{ message: string }>>> {
    const result = await this.model.delete(id);
    if (!result) {
      return {
        status: "NOT_FOUND",
        data: { message: notFound },
      };
    }
    return {
      status: "SUCCESSFUL",
      data: { message: "Deleted successfully" },
    };
  }

  async getById(id: string): Promise<ServiceResponse<Partial<T>>> {
    const result = await this.model.getById(id);
    if (!result) {
      return {
        status: "NOT_FOUND",
        data: { message: notFound },
      };
    }
    return {
      status: "SUCCESSFUL",
      data: result,
    };
  }
  async getAll(): Promise<ServiceResponse<Partial<T>[]>> {
    const result = await this.model.getAll();
    return {
      status: "SUCCESSFUL",
      data: result,
    };
  }
}

import ModelAdapter from "./model.adapter";
import { ServiceResponse } from "../interfaces/ServiceResponse";

export default abstract class ServiceAdapter<T> {
  protected model: ModelAdapter<T>;
  constructor(model: ModelAdapter<T>) {
    this.model = model;
  }

  async update(
    id: string,
    data: Partial<T>
  ): Promise<ServiceResponse<Partial<T | null>>> {
    const result = await this.model.update(id, data);
    if (!result) {
      return {
        status: "NOT_FOUND",
        data: { message: "User not found" },
      };
    }
    return {
      status: "SUCCESSFUL",
      data: result,
    };
  }

  async create(
    data: Partial<T>
  ): Promise<ServiceResponse<Partial<{ message: string }>>> {
    const newUser = await this.model.create(data);
    if (!newUser) {
      return {
        status: "INTERNAL_ERROR",
        data: { message: "error creating user, try again later" },
      };
    }
    return {
      status: "CREATED",
      data: { message: "User created successfully" },
    };
  }

  async getById(id: string): Promise<ServiceResponse<Partial<T>>> {
    const user = await this.model.getById(id);
    if (!user) {
      return {
        status: "NOT_FOUND",
        data: { message: "User not found" },
      };
    }
    return {
      status: "SUCCESSFUL",
      data: user,
    };
  }
  async getAll(): Promise<ServiceResponse<Partial<T>[]>> {
    const users = await this.model.getAll();
    return {
      status: "SUCCESSFUL",
      data: users,
    };
  }
}

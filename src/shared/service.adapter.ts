import ModelAdapter from "./model.adapter"
import { ServiceResponse } from "../interfaces/ServiceResponse";

export default abstract class ServiceAdapter<T> {
  protected model: ModelAdapter<T>;
  constructor(
    model: ModelAdapter<T>,
  ) {
    this.model = model;
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
}
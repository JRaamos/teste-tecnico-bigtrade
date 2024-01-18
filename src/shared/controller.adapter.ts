import ServiceAdapter from "./service.adapter";
import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";

export default abstract class ControllerAdapter<T> {
  protected service: ServiceAdapter<T>;
  constructor(
    service: ServiceAdapter<T>,
  ) {
    this.service = service;
  }
  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await this.service.getById(id);
    res.status(mapStatusHTTP(status)).json(data)
  }
}
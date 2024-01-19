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
  
  public async create(req: Request, res: Response): Promise<void> {
    const { status, data } = await this.service.create(req.body);
    res.status(mapStatusHTTP(status)).json(data);
  }
  
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await this.service.update(id, req.body);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await this.service.delete(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
  
  public async getById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status, data } = await this.service.getById(id);
    res.status(mapStatusHTTP(status)).json(data)
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const { status, data } = await this.service.getAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}

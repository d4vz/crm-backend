import { LeadsController } from "@/application/controllers/leads.controller";
import { createLeadSchema, updateLeadSchema } from "@/application/dtos/leads.dto";
import { Routes } from "@/domain/interfaces/routes.interface";
import { authMiddleware } from "@/infra/middlewares/auth.middleware";
import { validationMiddleware } from "@/infra/middlewares/validation.middleware";
import { Router } from "express";

export class LeadsRoute implements Routes {
  public path = "/leads";
  public router = Router();
  public controller = new LeadsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.path}`, this.controller.getLeads);
    this.router.get(`${this.path}/:id`, this.controller.getLeadById);
    this.router.post(
      `${this.path}`,
      validationMiddleware({
        body: createLeadSchema,
      }),
      this.controller.createLead,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware({
        body: updateLeadSchema,
      }),
      this.controller.updateLead,
    );
    this.router.delete(`${this.path}/:id`, this.controller.deleteLead);
  }
}

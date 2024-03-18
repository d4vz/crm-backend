import { LeadsController } from "@/controllers/leads.controller";
import { createLeadSchema, updateLeadSchema } from "@/dtos/leads.dto";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { Routes } from "@interfaces/routes.interface";
import { validationMiddleware } from "@middlewares/validation.middleware";
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

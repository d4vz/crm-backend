import { CompanyController } from "@/application/controllers/company.controller";
import { createCompanySchema, updateCompanySchema } from "@/application/dtos/company.dto";
import { Routes } from "@/domain/interfaces/routes.interface";
import { authMiddleware } from "@/infra/middlewares/auth.middleware";
import { validationMiddleware } from "@/infra/middlewares/validation.middleware";
import { Router } from "express";

export class CompaniesRoute implements Routes {
  public path = "/companies";
  public router = Router();
  public userController = new CompanyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.path}`, this.userController.getCompanies);
    this.router.get(`${this.path}/:id`, this.userController.getCompanyById);
    this.router.post(
      this.path,
      validationMiddleware({
        body: createCompanySchema,
      }),
      this.userController.createCompany,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware({
        body: updateCompanySchema,
      }),
      this.userController.updateCompany,
    );
    this.router.delete(`${this.path}/:id`, this.userController.deleteCompany);
  }
}

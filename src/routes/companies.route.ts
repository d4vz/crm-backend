import { createCompanySchema, updateCompanySchema } from "@/dtos/company.dto";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { CompanyController } from "@controllers/company.controller";
import { Routes } from "@interfaces/routes.interface";
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

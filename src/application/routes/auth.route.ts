import { AuthController } from "@/application/controllers/auth.controller";
import { loginSchema, signUpSchema } from "@/application/dtos/auth.dto";
import { Routes } from "@/domain/interfaces/routes.interface";
import { authMiddleware } from "@/infra/middlewares/auth.middleware";
import { validationMiddleware } from "@/infra/middlewares/validation.middleware";
import { Router } from "express";

export class AuthRoute implements Routes {
  public router = Router();
  public path = "/auth";
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/signup`,
      validationMiddleware({
        body: signUpSchema,
      }),
      this.auth.signUp,
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware({
        body: loginSchema,
      }),
      this.auth.logIn,
    );
    this.router.use(authMiddleware);
    this.router.get(`${this.path}/me`, authMiddleware, this.auth.me);
  }
}

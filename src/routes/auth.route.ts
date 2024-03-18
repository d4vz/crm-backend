import { loginSchema, signUpSchema } from "@/dtos/auth.dto";
import { AuthController } from "@controllers/auth.controller";
import { Routes } from "@interfaces/routes.interface";
import { authMiddleware } from "@middlewares/auth.middleware";
import { validationMiddleware } from "@middlewares/validation.middleware";
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
    this.router.post(`${this.path}/logout`, authMiddleware, this.auth.logOut);
    this.router.use(authMiddleware);
    this.router.get(`${this.path}/me`, authMiddleware, this.auth.me);
  }
}

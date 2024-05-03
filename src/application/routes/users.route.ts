import { UserController } from "@/application/controllers/users.controller";
import { createUserSchema, updateUserSchema } from "@/application/dtos/users.dto";
import { Routes } from "@/domain/interfaces/routes.interface";
import { authMiddleware } from "@/infra/middlewares/auth.middleware";
import { validationMiddleware } from "@/infra/middlewares/validation.middleware";
import { Router } from "express";

export class UserRoute implements Routes {
  public path = "/users";
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authMiddleware);
    this.router.get(`${this.path}`, this.userController.getUsers);
    this.router.get(`${this.path}/:id`, this.userController.getUserById);
    this.router.post(
      `${this.path}`,
      validationMiddleware({
        body: createUserSchema,
      }),
      this.userController.createUser,
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware({
        body: updateUserSchema,
      }),
      this.userController.updateUser,
    );
    this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
  }
}

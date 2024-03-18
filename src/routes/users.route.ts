import { authMiddleware } from "@/middlewares/auth.middleware";
import { UserController } from "@controllers/users.controller";
import { createUserSchema, updateUserSchema } from "@dtos/users.dto";
import { Routes } from "@interfaces/routes.interface";
import { validationMiddleware } from "@middlewares/validation.middleware";
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

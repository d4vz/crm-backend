import { RequestWithUser } from "@/domain/interfaces/auth.interface";

import { Request, Response } from "express";

import { SignUpDto } from "@/application/dtos/auth.dto";
import { LoginUseCase } from "@/application/usecases/auth/login.usecase";
import { SignUpUseCase } from "@/application/usecases/auth/signup.usecase";
import { User } from "@/domain/entities/user.entity";
import { MongoUsersRepository } from "@/infra/repositories/mongo/mongo-users.repository";
import { asyncHandler } from "@/utils/async-handler";

export class AuthController {
  private signUpUseCase = new SignUpUseCase(new MongoUsersRepository());
  private logInUseCase = new LoginUseCase(new MongoUsersRepository());

  public signUp = asyncHandler(async (req: Request, res: Response) => {
    const userData: SignUpDto = req.body;
    const signUpUserData: User = await this.signUpUseCase.execute(userData);
    res.status(201).json(signUpUserData);
  });

  public logIn = asyncHandler(async (req: Request, res: Response) => {
    const userData: User = req.body;
    const { cookie, token } = await this.logInUseCase.execute(userData);
    res.set("Set-Cookie", [cookie]);
    res.status(200).json({ token, message: "login" });
  });

  public me = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const meData = req.user;
    res.status(200).json(meData);
  });
}

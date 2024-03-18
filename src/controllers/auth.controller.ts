import { RequestWithUser } from "@interfaces/auth.interface";
import { User } from "@interfaces/users.interface";
import { Request, Response } from "express";
import { Container } from "typedi";

import { SignUpDto } from "@/dtos/auth.dto";
import { LoginUseCase } from "@/usecases/auth/login.usecase";
import { LogoutUseCase } from "@/usecases/auth/logout.usecase";
import { SignUpUseCase } from "@/usecases/auth/signup.usecase";
import { asyncHandler } from "@/utils/async-handler";

export class AuthController {
  private signUpUseCase = Container.get(SignUpUseCase);
  private logInUseCase = Container.get(LoginUseCase);
  private logOutUseCase = Container.get(LogoutUseCase);

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

  public logOut = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userData: User = req.user;
    const logOutUserData: User = await this.logOutUseCase.execute(userData);
    res.status(200).json(logOutUserData);
  });

  public me = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const meData = req.user;
    res.status(200).json(meData);
  });
}

import { User } from "@interfaces/users.interface";
import { Request, Response } from "express";
import { Container } from "typedi";
import { CreateUserUseCase } from "../usecases/users/create-user.usecase";

import { CreateUserDto, UpdateUserDto } from "@/dtos/users.dto";
import { DeleteUserUseCase } from "@/usecases/users/delete-user.usecase";
import { FindAllUsersUseCase } from "@/usecases/users/find-all-users.usecase";
import { FindUserByIdUseCase } from "@/usecases/users/find-user-by-id.usecase";
import { UpdateUserUseCase } from "@/usecases/users/update-user.usecase";
import { asyncHandler } from "@/utils/async-handler";

export class UserController {
  public createUserUseCase = Container.get(CreateUserUseCase);
  public updateUserUseCase = Container.get(UpdateUserUseCase);
  public deleteUserUseCase = Container.get(DeleteUserUseCase);
  public findUserByIdUseCase = Container.get(FindUserByIdUseCase);
  public findAllUsersUseCase = Container.get(FindAllUsersUseCase);

  public getUsers = asyncHandler(async (req: Request, res: Response) => {
    const findAllUsersData: User[] = await this.findAllUsersUseCase.execute();
    res.status(200).json(findAllUsersData);
  });

  public getUserById = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const findOneUserData: User = await this.findUserByIdUseCase.execute(userId);
    res.status(200).json(findOneUserData);
  });

  public createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const createUserData: User = await this.createUserUseCase.execute(userData);
    res.status(201).json(createUserData);
  });

  public updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData: UpdateUserDto = req.body;
    const updateUserData: User = await this.updateUserUseCase.execute(userId, userData);
    res.status(200).json(updateUserData);
  });

  public deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const deleteUserData: User = await this.deleteUserUseCase.execute(userId);
    res.status(200).json(deleteUserData);
  });
}

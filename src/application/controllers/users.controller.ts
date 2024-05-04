import { Request, Response } from "express";
import { Container } from "typedi";
import { CreateUserUseCase } from "../usecases/users/create-user.usecase";

import { CreateUserDto, UpdateUserDto } from "@/application/dtos/users.dto";
import { DeleteUserUseCase } from "@/application/usecases/users/delete-user.usecase";
import { FindAllUsersUseCase } from "@/application/usecases/users/find-all-users.usecase";
import { FindUserByIdUseCase } from "@/application/usecases/users/find-user-by-id.usecase";
import { UpdateUserUseCase } from "@/application/usecases/users/update-user.usecase";
import { RequestWithUser } from "@/domain/interfaces/auth.interface";
import { MongoUsersRepository } from "@/infra/repositories/mongo/mongo-users.repository";
import { asyncHandler } from "@/utils/async-handler";

export class UserController {
  public createUserUseCase = new CreateUserUseCase(new MongoUsersRepository());
  public updateUserUseCase = Container.get(UpdateUserUseCase);
  public deleteUserUseCase = Container.get(DeleteUserUseCase);
  public findUserByIdUseCase = new FindUserByIdUseCase(new MongoUsersRepository());
  public findAllUsersUseCase = Container.get(FindAllUsersUseCase);

  public getUsers = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const logged = req.user;
    const findAllUsersData = await this.findAllUsersUseCase.execute(logged);
    res.status(200).json(findAllUsersData);
  });

  public getUserById = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const findOneUserData = await this.findUserByIdUseCase.execute(userId);
    res.status(200).json(findOneUserData);
  });

  public createUser = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userData: CreateUserDto = req.body;
    const createUserData = await this.createUserUseCase.execute(userData, req.user);
    res.status(201).json(createUserData);
  });

  public updateUser = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const userData: UpdateUserDto = req.body;
    const updateUserData = await this.updateUserUseCase.execute(userId, userData);
    res.status(200).json(updateUserData);
  });

  public deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const userId: string = req.params.id;
    const deleteUserData = await this.deleteUserUseCase.execute(userId);
    res.status(200).json(deleteUserData);
  });
}

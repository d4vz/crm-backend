import { User } from "@/domain/interfaces/users.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
import { Service } from "typedi";

@Service()
export class FindUserByIdUseCase {
  async execute(userId: string): Promise<User> {
    const findUser = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}

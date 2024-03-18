import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import { Service } from "typedi";

@Service()
export class FindUserByIdUseCase {
  async execute(userId: string): Promise<User> {
    const findUser = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}

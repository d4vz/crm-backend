import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import { Service } from "typedi";

@Service()
export class LogoutUseCase {
  public async execute(userData: User): Promise<User> {
    const findUser = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}

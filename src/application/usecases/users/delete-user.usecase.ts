import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
import { Service } from "typedi";

@Service()
export class DeleteUserUseCase {
  async execute(userId: string) {
    const deleteUserById = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");
    return deleteUserById;
  }
}

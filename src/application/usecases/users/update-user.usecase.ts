import { UpdateUserDto } from "@/application/dtos/users.dto";
import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class UpdateUserUseCase {
  async execute(userId: string, userData: UpdateUserDto) {
    if (userData.email) {
      const findedUser = await UserModel.findOne({ email: userData.email });

      const idIsEqual = findedUser?._id.equals(userId);

      if (findedUser && !idIsEqual) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById = await UserModel.findByIdAndUpdate(userId, { userData }, { new: true });

    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }
}

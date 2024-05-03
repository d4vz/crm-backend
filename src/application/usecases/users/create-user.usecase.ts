import { CreateUserDto } from "@/application/dtos/users.dto";
import defineAbilityFor from "@/application/permissions/user.permissions";
import { User } from "@/domain/interfaces/users.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class CreateUserUseCase {
  async execute(userData: CreateUserDto, logged: User) {
    const userAbility = defineAbilityFor(logged);

    if (userAbility.cannot("create", userData)) {
      throw new HttpException(403, "You don't have permission to create a user");
    }

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);

    userData = { ...userData, password: hashedPassword };

    const createdUser = await UserModel.create(userData);
    return createdUser;
  }
}

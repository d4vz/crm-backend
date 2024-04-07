import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import defineAbilityFor from "@/permissions/user.permissions";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class CreateUserUseCase {
  async execute(userData: CreateUserDto, logged: User) {
    const userAbility = defineAbilityFor(logged);

    if (userAbility.cannot("create", "User")) {
      throw new HttpException(403, "You don't have permission to create a user");
    }

    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.company && !logged?.company?.includes(userData.company)) {
      throw new HttpException(403, `You can't create a user for ${userData.company}`);
    }

    const hashedPassword = await hash(userData.password, 10);

    userData = { ...userData, password: hashedPassword };

    const createdUser = await UserModel.create(userData);
    return createdUser;
  }
}

import { CreateUserDto } from "@/dtos/users.dto";
import { HttpException } from "@/exceptions/HttpException";
import { UserModel } from "@/models/user.model";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class CreateUserUseCase {
  async execute(userData: CreateUserDto) {
    const existingUser = await UserModel.findOne({ email: userData.email });

    if (existingUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);

    userData = { ...userData, password: hashedPassword };

    const createdUser = await UserModel.create(userData);
    return createdUser;
  }
}

import { SignUpDto } from "@/dtos/auth.dto";
import { HttpException } from "@/exceptions/HttpException";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class SignUpUseCase {
  public async execute(userData: SignUpDto): Promise<User> {
    const findedUser = await UserModel.findOne({ email: userData.email });

    if (findedUser) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const hashedPassword = await hash(userData.password, 10);

    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }
}

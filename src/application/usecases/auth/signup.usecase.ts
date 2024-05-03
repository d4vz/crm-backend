import { SignUpDto } from "@/application/dtos/auth.dto";
import { User } from "@/domain/interfaces/users.interface";
import { HttpException } from "@/infra/exceptions/HttpException";
import { UserModel } from "@/infra/models/user.model";
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

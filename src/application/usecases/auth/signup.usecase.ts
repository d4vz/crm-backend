import { SignUpDto } from "@/application/dtos/auth.dto";
import { UsersRepository } from "@/domain/repositories/users.repository";

import { HttpException } from "@/infra/exceptions/HttpException";
import { Service } from "typedi";

@Service()
export class SignUpUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(userData: SignUpDto) {
    const user = await this.usersRepository.findByEmail(userData.email);

    if (!user) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    await user.hashPassword();

    const createdUser = await this.usersRepository.create(user);
    return createdUser;
  }
}

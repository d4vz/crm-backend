import { CreateUserDto } from "@/application/dtos/users.dto";
import defineAbilityFor from "@/application/permissions/user.permissions";
import { User } from "@/domain/entities/user.entity";

import { UsersRepository } from "@/domain/repositories/users.repository";
import { HttpException } from "@/infra/exceptions/HttpException";
import { Service } from "typedi";

@Service()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userData: CreateUserDto, logged: User) {
    const userAbility = defineAbilityFor(logged);

    if (userAbility.cannot("create", userData)) {
      throw new HttpException(403, "You don't have permission to create a user");
    }

    const existingUser = await this.usersRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const user = new User(userData.name, userData.email, userData.password, userData.roles, userData.company);

    await user.hashPassword();

    const createdUser = await this.usersRepository.create(user);

    return createdUser;
  }
}

import { UpdateUserDto } from "@/application/dtos/users.dto";
import { User } from "@/domain/entities/user.entity";
import { UsersRepository } from "@/domain/repositories/users.repository";
import { HttpException } from "@/infra/exceptions/HttpException";
import { hash } from "bcrypt";
import { Service } from "typedi";

@Service()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string, userData: UpdateUserDto) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new HttpException(404, `User not found`);
    }

    if (userData.email) {
      const userWithEmail = await this.usersRepository.findByEmail(userData.email);

      if (userWithEmail && userWithEmail.id !== userId) {
        throw new HttpException(409, `This email ${userData.email} already exists`);
      }
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const userToUpdate: Partial<User> = {
      ...user,
      ...userData,
      companyId: userData.company,
    };

    const updateUserById = await this.usersRepository.updateById(userId, userToUpdate);

    if (!updateUserById) {
      throw new HttpException(400, `User could not be updated`);
    }

    return updateUserById;
  }
}

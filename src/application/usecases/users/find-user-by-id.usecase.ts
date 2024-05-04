import { UsersRepository } from "@/domain/repositories/users.repository";
import { HttpException } from "@/infra/exceptions/HttpException";
import { Service } from "typedi";

@Service()
export class FindUserByIdUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new HttpException(409, "User doesn't exist");
    }

    return user;
  }
}

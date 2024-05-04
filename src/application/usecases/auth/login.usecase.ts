import { LoginDto } from "@/application/dtos/auth.dto";
import { User } from "@/domain/entities/user.entity";
import { DataStoredInToken, TokenData } from "@/domain/interfaces/auth.interface";
import { UsersRepository } from "@/domain/repositories/users.repository";

import { env } from "@/infra/config";
import { HttpException } from "@/infra/exceptions/HttpException";
import { sign } from "jsonwebtoken";

import { Service } from "typedi";

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    _id: user.id as string,
    company: user?.companyId,
  };

  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, env.SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class LoginUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute(userData: LoginDto): Promise<{ cookie: string; user: User; token: string }> {
    const user = await this.usersRepository.findByEmail(userData.email);

    if (!user) {
      throw new HttpException(404, `This email ${userData.email} was not found`);
    }

    const isPasswordMatching = await user.comparePassword(userData.password);

    if (!isPasswordMatching) {
      throw new HttpException(401, "Invalid credentials");
    }

    const tokenData = createToken(user);
    const cookie = createCookie(tokenData);

    return { cookie, user, token: tokenData.token };
  }
}

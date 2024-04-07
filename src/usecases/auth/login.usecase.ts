import { env } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/users.interface";
import { UserModel } from "@/models/user.model";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { Service } from "typedi";

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    _id: user._id?.toString(),
    company: user?.company,
  };

  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, env.SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class LoginUseCase {
  public async execute(userData: User): Promise<{ cookie: string; findUser: User; token: string }> {
    const findUser = await UserModel.findOne({ email: userData.email });

    if (!findUser) throw new HttpException(404, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(401, "Password is not matching");

    const tokenData = createToken(findUser);
    const token = tokenData.token;

    const cookie = createCookie(tokenData);

    return { cookie, findUser, token };
  }
}

import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

import { env } from "@/config";
import { HttpException } from "@/exceptions/HttpException";
import { UserModel } from "@/models/user.model";
import { DataStoredInToken, RequestWithUser } from "@interfaces/auth.interface";

const getAuthorization = req => {
  const coockie = req.cookies["Authorization"];
  if (coockie) return coockie;

  const header = req.header("Authorization");
  if (header) return header.split("Bearer ")[1];

  return null;
};

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { _id } = verify(Authorization, env.SECRET_KEY) as DataStoredInToken;

      const findUser = await UserModel.findById(_id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, "Wrong authentication token"));
      }
    } else {
      next(new HttpException(404, "Authentication token missing"));
    }
  } catch (error) {
    next(new HttpException(401, "Wrong authentication token"));
  }
};

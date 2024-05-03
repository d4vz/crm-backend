import { User } from "@/domain/interfaces/users.interface";
import { Request } from "express";

export interface DataStoredInToken {
  _id: string;
  company: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

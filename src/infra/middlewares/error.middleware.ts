import { NextFunction, Request, Response } from "express";

import { HttpException } from "@/infra/exceptions/HttpException";

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.headersSent) return next(error);
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";
    console.error(`[ErrorMiddleware]`, error);
    res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

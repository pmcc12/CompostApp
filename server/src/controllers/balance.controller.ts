import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.userId) {
      throw new createError.NotFound("Need to provide userId in body");
    }
    const user = await prisma.user.findUnique({
      where: {
        userId: req.body.userId
      }
    });

    if (!user) {
      throw new createError.NotFound("User doesn't exist");
    }
    
    res.status(200).json({
      status: true,
      message: "Get Balance succesful",
      data: {
        balance: user.balance,
      },
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};


export { getBalance };

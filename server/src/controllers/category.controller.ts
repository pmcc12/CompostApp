import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postCategory = async(req:Request,res:Response,next:NextFunction) => {
    try {
      const newCategory = await prisma.category.create({
        data: req.body,
      });
      res.status(201).json({
          status: true,
          message: 'Create category successfully',
          data: newCategory
      })
    } catch (e: any) {
      next(createError(e.statusCode, e.message));
    }
}




const getAllCategories = async(req:Request, res: Response, next: NextFunction) => {
    try {
      const categories = await prisma.category.findMany();
      res.status(200).json({
          status: true,
          message: 'All categories',
          data: categories
      })
    }
    catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}

export {getAllCategories,postCategory}

import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getBuyProducts = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        if (!req.body.userId) {
          throw new createError.NotFound("Need to provide userId in body");
        }
        const products = await prisma.product.findMany({
         where: {
           sellerId: {
               not: req.body.userId,
           }
         },
       });
       res.status(200).json({
         status: true,
         message: 'All buy products',
         data: products,
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}

export { getBuyProducts }
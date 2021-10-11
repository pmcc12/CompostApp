import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postSellProduct = async(req:Request, res:Response, next: NextFunction) => {
    try {
        const userId = req.body.userId
        delete req.body.userId
    
        const product = await prisma.product.create({
            data: {
             seller : {
                  connect : {
                    userId: userId
                  } 
              } , 
              ...req.body
            }
        })
        res.status(201).json({
            status: true,
            message: "Sell product created successful",
            data: product
            }
        );
    } catch(e:any) {
        next(createError(e.statusCode,e.message))
    }

}


const getSellProducts = async(req:Request,res:Response, next:NextFunction) => {
     try {
        if (!req.body.userId) {
          throw new createError.NotFound("Need to provide userId in body");
        }
        const products = await prisma.product.findMany({
         where: {
           sellerId: req.body.userId,
         },
       });
       res.status(200).json({
         status: true,
         message: 'All sell products',
         data: products,
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
    
}



export { postSellProduct, getSellProducts }
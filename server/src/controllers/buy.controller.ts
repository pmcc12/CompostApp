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
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
                seller:{
                  select : {
                    username:true,
                    userId:true,
                    location : true
                  }
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

const getBuyProductsByCategory = async(req:Request, res:Response, next:NextFunction) => {
    try {
        if (!req.body.userId) {
          throw new createError.NotFound("Need to provide userId in body");
        }
        if (!req.body.categoryId) {
          throw new createError.NotFound("Need to provide category in body");
        }
        const products = await prisma.product.findMany({
            where: {
              sellerId: {
                not: req.body.userId,
              },
              categories: {
                some: {
                  category: {
                    categoryId: req.body.categoryId
                  }
                }
              },
            },
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
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


const postAddToCart = async(req:Request, res:Response, next:NextFunction) => {
  // we need userId and product id 
  // create orderitem inside where 
    try {
      const { buyerId, productId, orderQuantity } = req.body;
      
      const product = await prisma.product.findUnique({
          where: {
            productId: productId,
          }
      })

      // Handle price
      let orderPrice;
      if (product) {
        orderPrice = product.retailPrice * orderQuantity
      } else {
        throw new createError.NotFound("Product doesn't exist");
      }

      // Handle User
      if (product.sellerId === buyerId) {
        throw new createError.NotFound("Buyer can't be the seller");
      }

      // Handle quantity
      if (product.availableQuantity < orderQuantity) {
        throw new createError.NotFound("Available product is not enough");
      }

       const orderItem = await prisma.orderItem.create({
            data: {
                buyer : {
                    connect : {
                        userId: buyerId
                    } 
                }, 
                product : {
                    connect : {
                        productId: productId
                    } 
                }, 
                orderQuantity: orderQuantity,
                orderPrice : orderPrice,
            },
        })
       res.status(201).json({
         status: true,
         message: 'Add To Cart Successfully',
         data: orderItem,
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}



export { getBuyProducts, getBuyProductsByCategory, postAddToCart }
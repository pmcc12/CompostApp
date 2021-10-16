import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// LEGACY
const buyAllItems = async(req:Request, res:Response, next:NextFunction) => {
    try {
        if (!req.body.buyerId) {
          throw new createError.NotFound("Need to provide buyerId in body");
        }
        const resolvedCart = await prisma.orderItem.updateMany({
            where: {
              buyerId: req.body.buyerId,
              resolved: false
            },
            data: {
                resolved: true
            }
            //   Showing categories in the return statement
       });
       res.status(201).json({
         status: true,
         message: 'Buy all item in Cart (resolved is true)',
         data: resolvedCart
       });
      } catch (e: any) {
        next(createError(e.statusCode, e.message));
      }
}
// LEGACY
const deleteCartItem = async(req:Request, res:Response, next:NextFunction) => {
    try {
        if (!req.body.orderId) {
          throw new createError.NotFound("Need to provide orderId in body");
        }
        const product = await prisma.orderItem.delete({
          where: {
            orderId : req.body.orderId
          }
        })
      
        res.status(202).json({
          status: true,
          message: 'Delete buy-product successful',
          data: product,
        });

      } catch (e: any) {
        next(createError(e.statusCode, e.message));
      }
}
// LEGACY
const getCartOrder = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        if (!req.body.buyerId) {
          throw new createError.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = await prisma.orderItem.findMany({
            where: {
              buyerId: req.body.buyerId,
              resolved: false
            },
            //   Showing categories in the return statement
        });
        res.status(200).json({
          status: true,
          message: 'All Order in Cart',
          data: getCartProducts
        });
      } catch (e: any) {
        next(createError(e.statusCode, e.message));
      }
}   

// CORE FEATURE
const buyItem = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { orderId, buyerId } = req.body
        if (!buyerId) {
          throw new createError.NotFound("Need to provide buyerId in body");
        }
        if (!orderId) {
          throw new createError.NotFound("Need to provide orderId in body");
        }
        // RESOLVE ORDER
        const resolvedOrder = await prisma.orderItem.updateMany({
            where: {
              buyerId: buyerId,
              orderId: orderId,
              resolved: false
            },
            data: {
                resolved: true
            }
       });
      //  SUBTRACT USER BALANCE & PRODUCT QUANTITY
       const userOrder = await prisma.orderItem.findUnique({
         where: {
           orderId: orderId
         }
       })
       let orderPrice: any;
       let orderQuantity: any;
       let productId: any;
        if (userOrder) {
            orderQuantity = userOrder.orderQuantity
            orderPrice = userOrder.orderPrice
            productId = userOrder.productId;
        }
       const updatedUser = await prisma.user.update({
         where: {
           userId: buyerId
         },
         data: {
           balance: {
             decrement: orderPrice
           }
         },
         select: {
           balance: true
         }
       })
       const updatedProduct = await prisma.product.update({
         where: {
           productId: productId
         },
         data: {
           availableQuantity: {
             decrement: orderQuantity
           }
         },
         select: {
           availableQuantity: true
         }
       })

       res.status(201).json({
         status: true,
         message: 'Resolved orderItem + Subtract money and quantity',
         data: {
           userBalance: updatedUser.balance,
           productQuantity: updatedProduct.availableQuantity,
           orderResolved: true
         }
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}

// OPTIONAL
const getOrderHistory = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        if (!req.body.buyerId) {
          throw new createError.NotFound("Need to provide buyerId in body");
        }
        const getCartProducts = await prisma.orderItem.findMany({
            where: {
              buyerId: req.body.buyerId,
              resolved: true
            },
            //   Showing categories in the return statement
       });
       res.status(200).json({
         status: true,
         message: 'All Order History',
         data: getCartProducts
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}  


export { buyAllItems, buyItem, deleteCartItem, getCartOrder, getOrderHistory };
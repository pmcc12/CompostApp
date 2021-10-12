import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

const buyItem = async(req:Request, res:Response, next:NextFunction) => {
    try {
        if (!req.body.buyerId) {
          throw new createError.NotFound("Need to provide buyerId in body");
        }
        if (!req.body.orderId) {
          throw new createError.NotFound("Need to provide orderId in body");
        }
        const resolvedCart = await prisma.orderItem.updateMany({
            where: {
              buyerId: req.body.buyerId,
              orderId: req.body.orderId,
              resolved: false
            },
            data: {
                resolved: true
            }
            //   Showing categories in the return statement
       });
       res.status(201).json({
         status: true,
         message: 'Buy an item in Cart (resolved is true)',
         data: resolvedCart
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}

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

export { buyAllItems, buyItem, deleteCartItem, getCartOrder, getOrderHistory };
import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';
import s3UploadImg from '../utils/aws';


const prisma = new PrismaClient();

const postSellProduct = async (req: Request, res: Response, next: NextFunction) => {

    
    try {
        const { userId, categoryId } = req.body
        delete req.body.categoryId
        delete req.body.userId
        // img
        const s3ImgLocation = await s3UploadImg(req);

        const product = await prisma.product.create({
            data: {
                seller: {
                    connect: {
                        userId: parseInt(userId)
                    }
                },
                categories: {
                    create: [
                        { category: { connect: { categoryId: parseInt(categoryId) } } },
                    ]
                },
                ...req.body,
                // retailPrice: parseInt(req.body.retailPrice),
                // negotiable: (req.body.negotiable === true),
                // availableQuantity: parseInt(req.body.availableQuantity)
                images: s3ImgLocation,
                
            },
            //   Showing categories in the return statement
            include: {
                categories: {
                    select: {
                        category: true,
                    },
                },
            },
        })
        res.status(201).json({
            status: true,
            message: "Sell product created successful",
            data: product
        }
        );
    } catch (e: any) {
        next(createError(e.statusCode, e.message))
    }

}


const getSellProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.userId) {
            throw new createError.NotFound("Need to provide userId in body");
        }
        const products = await prisma.product.findMany({
            where: {
                sellerId: req.body.userId,
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
            message: 'All sell products',
            data: products,
        });
    } catch (e: any) {
        next(createError(e.statusCode, e.message));
    }

}



export { postSellProduct, getSellProducts }
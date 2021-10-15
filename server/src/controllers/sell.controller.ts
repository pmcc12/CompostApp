import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';
import s3UploadImg from '../utils/aws';


const prisma = new PrismaClient();

const postProductImg = async (req: Request, res: Response, next: NextFunction) => {

    try {
        // img
        const s3ImgLocation = await s3UploadImg(req);
        res.status(201).json({
            status: true,
            message: "Image Upload successful",
            data: {
                imgLocation: s3ImgLocation
            }
        }
        );
    } catch (e: any) {
        next(createError(e.statusCode, e.message))
    }

}

const postSellProduct = async (req: any, res: Response, next: NextFunction) => {

    
    try {
        // // console.log(req)
        // console.log(req.body); 
        // console.log(req.files);
        
        // Img File
        const s3ImgLocation = await s3UploadImg(req);
        console.log("HEY",s3ImgLocation)
        // Document
        const productInfo = JSON.parse(req.files.userDocument.data) ;
        const { userId, categoryId } = productInfo
        delete productInfo.categoryId
        delete productInfo.userId

        const product = await prisma.product.create({
            data: {
                seller: {
                    connect: {
                        userId: userId
                    }
                },
                categories: {
                    create: [
                        { category: { connect: { categoryId: categoryId } } },
                    ]
                },
                ...productInfo,
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



export { postSellProduct, getSellProducts, postProductImg }
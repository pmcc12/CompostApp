import { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sendMessage = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {content,receiverId,senderId} = req.body

        if (!receiverId) {
            throw new createError.NotFound("Need to provide receiverId in body");
        } 
        
        if (!senderId) {
            throw new createError.NotFound("Need to provide senderId in body");
        } 
        
        if (!content) {
            throw new createError.NotFound("Need to provide content in body");
        } 

        const Message = await prisma.message.create({
        data: {content,receiverId,senderId},
        });
        res.status(201).json({
          status: true,
          message: 'Create message successfully',
          data: Message
        })
       } catch (e: any) {
       next(createError(e.statusCode, e.message));
    }
}

const getMessages = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {receiverId} = req.body
        const getMessages = await prisma.message.findMany({
            where : {
                receiverId : receiverId
            },
            include: {
                receiver: {
                    select:{
                        username:true
                    }
                },
                sender: {
                    select :{
                        username:true
                    }
                }
            }
        });
       res.status(200).json({
         status: true,
         message: 'All messages received',
         data: getMessages,
       });
     } catch (e: any) {
       next(createError(e.statusCode, e.message));
     }
}

export {sendMessage,getMessages}
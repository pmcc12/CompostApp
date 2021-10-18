import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllInboxes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.params.userId);
    const inboxes = await prisma.messageInbox.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      select: {
        inboxId: true,
        lastUpdated: true,
        users: {
          select: {
            userId: true,
            username: true,
          },
        },
      },
      orderBy: [
        {
          lastUpdated: "asc",
        },
      ],

      // select: {
      //     Inboxes: {
      //         select: {
      //             users: {
      //                 select: {
      //                     username: true
      //                 }
      //             }
      //         }
      //     }
      // }
    });
    res.status(200).json({
      status: true,
      message: "All Inboxes from a user",
      data: inboxes,
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

const postInbox = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId1, userId2 } = req.body;
    const inbox = await prisma.messageInbox.create({
      data: {
        users: {
          connect: [{ userId: userId1 }, { userId: userId2 }],
        },
      },
    });
    res.status(201).json({
      status: true,
      message: "Inbox created successful",
      data: inbox,
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

const getAllMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inboxId = parseInt(req.params.inboxId);
    const inbox = await prisma.messageInbox.findUnique({
      where: { inboxId: inboxId },
      include: {
        Message: true,
      },
    });
    res.status(200).json({
      status: true,
      message: "Get inbox successful",
      data: inbox,
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

const postMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, inboxId, senderId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        userId: senderId,
      },
    });
    let username: any;
    if (user) {
      username = user.username;
    }
    const message = await prisma.message.create({
      data: {
        content: content,
        inbox: {
          connect: { inboxId },
        },
        senderName: username,
        senderId: senderId,
      },
    });
    const updatedInbox = await prisma.messageInbox.update({
      where: {
        inboxId: inboxId,
      },
      data: {
        lastUpdated: new Date().toISOString(),
      },
    });
    res.status(201).json({
      status: true,
      message: "Inbox created successful",
      data: message,
    });
  } catch (e: any) {
    next(createError(e.statusCode, e.message));
  }
};

export { getAllInboxes, postInbox, getAllMessage, postMessage };

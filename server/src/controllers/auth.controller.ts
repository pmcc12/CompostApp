import { Request, Response, NextFunction } from 'express';
import auth from '../services/auth.service';
import createError from 'http-errors';

class authController {
    static register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await auth.register(req.body);
            res.status(200).json({
                status: true,
                message: "User created successfully",
                data: user
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static login = async (req: Request, res: Response, next: NextFunction) => {
         try {
            const data = await auth.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        } catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static all = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }
}

export default authController;
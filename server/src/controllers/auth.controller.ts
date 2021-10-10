import { Request, Response, NextFunction } from 'express';
import * as auth from '../services/auth.service';
import createError from 'http-errors';

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await auth.register(req.body);
        res.status(201).json({
            status: true,
            message: "User created successful",
            data: user
        })
    }
    catch (e: any) {
        next(createError(e.statusCode, e.message))
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await auth.login(req.body)
        res.status(200).json({
            status: true,
            message: "User login successful",
            data
        })
    } catch (e: any) {
        next(createError(e.statusCode, e.message))
    }
}

const all = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await auth.all();
        res.status(200).json({
            status: true,
            message: 'get All users',
            data: users
        })
    }
    catch (e: any) {
        next(createError(e.statusCode, e.message))
    }
}

export { register, login, all };
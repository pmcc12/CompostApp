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

export { register, login, all };
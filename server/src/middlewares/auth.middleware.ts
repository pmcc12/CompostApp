import { Request, Response, NextFunction } from 'express';
// To make req.user silent
export interface IGetUserAuthInfoRequest extends Request {
  user?: any
}
import jwt from '../utils/jwt';
import createError from 'http-errors';

const auth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        return next(new createError.Unauthorized('Access token is required'))
    }

    // If headers exist
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(new createError.Unauthorized())
    }

    // If token exist
    await jwt.verifyAccessToken(token).then(user => {
        req.user = user
        next()
    }).catch (e => {
        next(new createError.Unauthorized(e.message))
    })

}

export default auth;

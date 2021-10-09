import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET


export default {

    signAccessToken(payload: any){
        return new Promise((resolve, reject) => {
            jwt.sign({ payload }, accessTokenSecret as string, {
            }, (err: any, token: any) => {
                if (err) {
                reject(new createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken(token: any){
        return new Promise((resolve, reject) => {
            jwt.verify(token, accessTokenSecret as string, (err: any, payload: any) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(new createError.Unauthorized(message))
                }
                resolve(payload)
            })
        })
    }
}

// From
// https://blog.logrocket.com/crafting-authentication-schemes-with-prisma-in-express/
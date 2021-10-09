import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';
import createError from 'http-errors';

dotenv.config();
const prisma = new PrismaClient();

class AuthService {
    static async register(data: any) {
        // TODO: Throw error if email is exist
        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
        if (userExist) {
            throw new createError.MethodNotAllowed('Email is already used')
        }

        // Encrypt password
        data.password = bcrypt.hashSync(data.password, 8);

        // Create User
        const user = prisma.user.create({data})
        delete user.password;

        // return jwt token
        // const accessToken = await jwt.sign({ payload }, accessTokenSecret as string)
        const accessToken = await jwt.signAccessToken(user);
        return {
            ...user,
            accessToken
        }
    }


    static async login(data: any) {
        const { email, password } = data;

        // Check email
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new createError.NotFound('User not registered')
        }

        // Check password
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            throw new createError.Unauthorized('Email address or password not valid')
        }
        delete user.password;

        // return jwt token
        const accessToken = await jwt.signAccessToken(user)
        return {
            ...user,
            accessToken
        }
    }

    // Just for admin & testing purposes
    static async all() {
        const allUsers = await prisma.user.findMany();
        return allUsers;
    }


}

export default AuthService;
// static vs public = static can be called and access without having to instantiate the class
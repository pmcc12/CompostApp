import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from '../utils/jwt';
import createError from 'http-errors';

dotenv.config();
const prisma = new PrismaClient();

const register = async (data: any) =>  {
    // TODO: Throw error if email is exist
    const userExist = await prisma.user.findUnique({
        where: {
            email: data.email
        },
    })
    if (userExist) {
        throw new createError.Unauthorized('Email is already used')
    }

    // Encrypt password
    data.password = bcrypt.hashSync(data.password, 8);

    // Create User
    const user = prisma.user.create({data})
    const deletePass = async (x: any) => {
        await delete x.password; // to silent ts for delete props
    }
    deletePass(user)

    // return jwt token
    // const accessToken = await jwt.sign({ payload }, accessTokenSecret as string)
    const accessToken = await jwt.signAccessToken(user);
    return {
        ...user,
        accessToken
    }
}


const login = async (data: any) => {
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


    const deletePass = async (x: any) => {
        await delete x.password; // to silent ts for delete props
    }
    deletePass(user)

    // return jwt token
    const accessToken = await jwt.signAccessToken(user)
    return {
        ...user,
        accessToken
    }
}

// Just for admin & testing purposes
const all = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers;
}

export { register, login, all };


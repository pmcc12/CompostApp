"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.login = exports.register = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const http_errors_1 = __importDefault(require("http-errors"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const register = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: Throw error if email is exist
    /* tslint:disable-next-line */
    console.log(data);
    const userExist = yield prisma.user.findUnique({
        where: {
            email: "mock.user@gmail.com",
        },
    });
    if (userExist) {
        throw new http_errors_1.default.Unauthorized('Email is already used');
    }
    // Encrypt password
    data.password = bcryptjs_1.default.hashSync(data.password, 8);
    // Create User
    const user = prisma.user.create({ data });
    const deletePass = (x) => __awaiter(void 0, void 0, void 0, function* () {
        yield delete x.password; // to silent ts for delete props
    });
    deletePass(user);
    // return jwt token
    // const accessToken = await jwt.sign({ payload }, accessTokenSecret as string)
    const accessToken = yield jwt_1.default.signAccessToken(user);
    return Object.assign(Object.assign({}, user), { accessToken });
});
exports.register = register;
const login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    // Check email
    const user = yield prisma.user.findUnique({
        where: {
            email: "mock.user@gmail.com"
        }
    });
    if (!user) {
        throw new http_errors_1.default.NotFound('User not registered');
    }
    // Check password
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword) {
        throw new http_errors_1.default.Unauthorized('Email address or password not valid');
    }
    const deletePass = (x) => __awaiter(void 0, void 0, void 0, function* () {
        yield delete x.password; // to silent ts for delete props
    });
    deletePass(user);
    // return jwt token
    const accessToken = yield jwt_1.default.signAccessToken(user);
    return Object.assign(Object.assign({}, user), { accessToken });
});
exports.login = login;
// Just for admin & testing purposes
const all = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany();
    return allUsers;
});
exports.all = all;

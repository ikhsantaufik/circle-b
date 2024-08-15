"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const config_1 = require("../configs/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const Hasher_1 = __importDefault(require("../utils/Hasher"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const validators_1 = require("../validators/validators");
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const mailer_1 = require("../libs/mailer");
const prisma = new client_1.PrismaClient();
class AuthServices {
    async register(registerDTO) {
        try {
            const { error } = validators_1.registerSchema.validate(registerDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const user = await prisma.user.create({
                data: Object.assign(Object.assign({}, registerDTO), { password: await Hasher_1.default.hashPassword(registerDTO.password) }),
            });
            delete user.password;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: user,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: (0, PrismaError_1.default)(error),
                });
            }
            return new ServiceResponseDTO_1.default({
                error: true,
                payload: error,
            });
        }
    }
    async login(loginDTO) {
        try {
            const { error } = validators_1.loginSchema.validate(loginDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const requestedUser = await prisma.user.findUnique({
                where: {
                    username: loginDTO.username,
                },
            });
            if (!requestedUser) {
                throw new CircleError_1.default({ error: 'The username/password was incorrect.' });
            }
            const isPasswordValid = await Hasher_1.default.comparePassword(loginDTO.password, requestedUser.password);
            if (!isPasswordValid) {
                throw new CircleError_1.default({ error: 'The username/password was incorrect.' });
            }
            delete requestedUser.password;
            const token = jsonwebtoken_1.default.sign(requestedUser, config_1.SECRET_SAUCE);
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: token,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: (0, PrismaError_1.default)(error),
                });
            }
            return new ServiceResponseDTO_1.default({
                error: true,
                payload: error,
            });
        }
    }
    async forgotPassword(forgotPasswordDTO) {
        try {
            const { error } = validators_1.forgotPasswordSchema.validate(forgotPasswordDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const requestedUser = await prisma.user.findUnique({
                where: {
                    email: forgotPasswordDTO.email,
                },
            });
            if (!requestedUser) {
                throw new CircleError_1.default({
                    error: `User with ${forgotPasswordDTO.email} does not exist.`,
                });
            }
            delete requestedUser.password;
            const token = jsonwebtoken_1.default.sign(requestedUser, config_1.SECRET_SAUCE);
            await (0, mailer_1.sendMail)({
                to: requestedUser.email,
                subject: '[Circle App] Reset Password',
                name: requestedUser.name,
                header: 'Plase click button below to reset your password and please do not share this email to anyone, including people claiming from Circle App.',
                footer: 'This email message was auto-generated. Please do not respond. If you need additional help, please visit Circle App Support.',
                CTA: 'Reset Password',
                link: `${config_1.CLIENT}/help/reset/${token}`,
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: token,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: (0, PrismaError_1.default)(error),
                });
            }
            return new ServiceResponseDTO_1.default({
                error: true,
                payload: error,
            });
        }
    }
    async resetPassword(resetPasswordDTO) {
        try {
            const { error } = validators_1.resetPasswordSchema.validate(resetPasswordDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const updatedUser = await prisma.user.update({
                where: {
                    email: resetPasswordDTO.email,
                },
                data: {
                    password: await Hasher_1.default.hashPassword(resetPasswordDTO.password),
                },
            });
            if (!updatedUser) {
                throw new CircleError_1.default({ error: 'Requested user does not exist.' });
            }
            delete updatedUser.password;
            const token = jsonwebtoken_1.default.sign(updatedUser, config_1.SECRET_SAUCE);
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: token,
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: (0, PrismaError_1.default)(error),
                });
            }
            return new ServiceResponseDTO_1.default({
                error: true,
                payload: error,
            });
        }
    }
}
exports.default = new AuthServices();
//# sourceMappingURL=AuthServices.js.map
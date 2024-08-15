"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const validators_1 = require("../validators/validators");
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class VibeServices {
    async getVibes(loggedUser) {
        try {
            const rawVibes = await prisma.vibe.findMany({
                include: {
                    replies: true,
                    likes: true,
                    author: true,
                },
            });
            const vibes = rawVibes.map((vibe) => {
                const { replies, likes, author } = vibe, rest = __rest(vibe, ["replies", "likes", "author"]);
                delete author.createdAt;
                delete author.updatedAt;
                delete author.password;
                delete rest.updatedAt;
                return Object.assign(Object.assign({}, rest), { author, totalReplies: replies.length, totalLikes: likes.length, isLiked: vibe.likes.some((like) => like.authorId === loggedUser.id) });
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: vibes.sort((x, y) => {
                    const xInMs = x.createdAt.getTime();
                    const yInMs = y.createdAt.getTime();
                    return yInMs - xInMs;
                }),
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
    async getVibe(id, loggedUser) {
        try {
            const rawVibe = await prisma.vibe.findUnique({
                where: {
                    id: id,
                },
                include: {
                    replies: true,
                    likes: true,
                    author: true,
                },
            });
            if (!rawVibe) {
                throw new CircleError_1.default({ error: 'Requested vibe does not exist.' });
            }
            const vibe = Object.assign(Object.assign({}, rawVibe), { likes: rawVibe.likes.map((like) => {
                    delete like.createdAt;
                    delete like.updatedAt;
                    return like;
                }), totalReplies: rawVibe.replies.length, totalLikes: rawVibe.likes.length, isLiked: rawVibe.likes.some((like) => like.authorId === loggedUser.id), replies: rawVibe.replies.sort((x, y) => {
                    const xInMs = x.createdAt.getTime();
                    const yInMs = y.createdAt.getTime();
                    return yInMs - xInMs;
                }) });
            delete vibe.updatedAt;
            delete vibe.author.createdAt;
            delete vibe.author.updatedAt;
            delete vibe.author.password;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: vibe,
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
    async getUserVibes(id) {
        try {
            const rawVibes = await prisma.vibe.findMany({
                where: {
                    authorId: id,
                },
                include: {
                    replies: true,
                    likes: true,
                },
            });
            if (!rawVibes.length) {
                throw new CircleError_1.default({ error: 'Requested user does not have any vibes.' });
            }
            const vibes = rawVibes.map((vibe) => {
                const { replies, likes } = vibe, rest = __rest(vibe, ["replies", "likes"]);
                return Object.assign(Object.assign({}, rest), { totalReplies: replies.length, totalLikes: likes.length });
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: vibes,
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
    async postVibe(vibeDTO) {
        try {
            const { error } = validators_1.vibeSchema.validate(vibeDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const postedVibe = await prisma.vibe.create({
                data: vibeDTO,
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: postedVibe,
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
    async deleteVibe(id) {
        try {
            const deletedVibes = await prisma.vibe.delete({
                where: {
                    id: id,
                },
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: deletedVibes,
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
exports.default = new VibeServices();
//# sourceMappingURL=VibeServices.js.map
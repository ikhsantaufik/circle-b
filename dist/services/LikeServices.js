"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class LikeServices {
    async likeMechanism(likeDTO) {
        try {
            // check if the vibe already liked
            const isLiked = await this.isLiked(likeDTO);
            if (isLiked) {
                // unlike the vibe
                const removedLike = await this.removeLike(isLiked);
                delete removedLike.createdAt;
                delete removedLike.updatedAt;
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: removedLike,
                });
            }
            // like the vibe
            const addedLike = await this.addLike(likeDTO);
            delete addedLike.createdAt;
            delete addedLike.updatedAt;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: addedLike,
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
    async isLiked(likeDTO) {
        return await prisma.like.findFirst({
            where: {
                AND: [{ authorId: likeDTO.authorId }, { targetId: likeDTO.targetId }],
            },
        });
    }
    async removeLike(likeData) {
        return await prisma.like.delete({
            where: {
                id: likeData.id,
            },
        });
    }
    async addLike(likeDTO) {
        return await prisma.like.create({
            data: likeDTO,
        });
    }
}
exports.default = new LikeServices();
//# sourceMappingURL=LikeServices.js.map
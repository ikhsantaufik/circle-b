"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class FollowServices {
    async follow(FollowDTO) {
        try {
            if (this.isTargetedItSelf(FollowDTO)) {
                throw new CircleError_1.default({ error: "Can't follow itself." });
            }
            if (await this.isFollowed(FollowDTO)) {
                throw new CircleError_1.default({ error: 'Target user is already followed.' });
            }
            const createdFollow = await prisma.follow.create({
                data: FollowDTO,
            });
            delete createdFollow.createdAt;
            delete createdFollow.updatedAt;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: createdFollow,
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
    async unfollow(FollowDTO) {
        try {
            if (this.isTargetedItSelf(FollowDTO)) {
                throw new CircleError_1.default({ error: "Can't unfollow itself." });
            }
            const isFollowed = await this.isFollowed(FollowDTO);
            if (!isFollowed) {
                throw new CircleError_1.default({ error: 'Target user is not followed yet.' });
            }
            const createdUnfollow = await prisma.follow.delete({
                where: {
                    id: isFollowed.id,
                },
            });
            delete createdUnfollow.createdAt;
            delete createdUnfollow.updatedAt;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: createdUnfollow,
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
    isTargetedItSelf(FollowDTO) {
        return FollowDTO.targetId === FollowDTO.ownerId;
    }
    async isFollowed(FollowDTO) {
        return await prisma.follow.findFirst({
            where: {
                AND: [{ targetId: FollowDTO.targetId }, { ownerId: FollowDTO.ownerId }],
            },
        });
    }
}
exports.default = new FollowServices();
//# sourceMappingURL=FollowServices.js.map
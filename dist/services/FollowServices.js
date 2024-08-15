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
const client_1 = require("@prisma/client");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class FollowServices {
    follow(FollowDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isTargetedItSelf(FollowDTO)) {
                    throw new CircleError_1.default({ error: "Can't follow itself." });
                }
                if (yield this.isFollowed(FollowDTO)) {
                    throw new CircleError_1.default({ error: 'Target user is already followed.' });
                }
                const createdFollow = yield prisma.follow.create({
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
        });
    }
    unfollow(FollowDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isTargetedItSelf(FollowDTO)) {
                    throw new CircleError_1.default({ error: "Can't unfollow itself." });
                }
                const isFollowed = yield this.isFollowed(FollowDTO);
                if (!isFollowed) {
                    throw new CircleError_1.default({ error: 'Target user is not followed yet.' });
                }
                const createdUnfollow = yield prisma.follow.delete({
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
        });
    }
    isTargetedItSelf(FollowDTO) {
        return FollowDTO.targetId === FollowDTO.ownerId;
    }
    isFollowed(FollowDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.follow.findFirst({
                where: {
                    AND: [{ targetId: FollowDTO.targetId }, { ownerId: FollowDTO.ownerId }],
                },
            });
        });
    }
}
exports.default = new FollowServices();

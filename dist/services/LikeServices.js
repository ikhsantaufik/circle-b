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
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class LikeServices {
    likeMechanism(likeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check if the vibe already liked
                const isLiked = yield this.isLiked(likeDTO);
                if (isLiked) {
                    // unlike the vibe
                    const removedLike = yield this.removeLike(isLiked);
                    delete removedLike.createdAt;
                    delete removedLike.updatedAt;
                    return new ServiceResponseDTO_1.default({
                        error: false,
                        payload: removedLike,
                    });
                }
                // like the vibe
                const addedLike = yield this.addLike(likeDTO);
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
        });
    }
    isLiked(likeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.like.findFirst({
                where: {
                    AND: [{ authorId: likeDTO.authorId }, { targetId: likeDTO.targetId }],
                },
            });
        });
    }
    removeLike(likeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.like.delete({
                where: {
                    id: likeData.id,
                },
            });
        });
    }
    addLike(likeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.like.create({
                data: likeDTO,
            });
        });
    }
}
exports.default = new LikeServices();

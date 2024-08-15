"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const validators_1 = require("../validators/validators");
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class ReplyServices {
    async postReply(replyDTO) {
        try {
            const { error } = validators_1.replySchema.validate(replyDTO);
            if (error) {
                throw new CircleError_1.default({ error: error.details[0].message });
            }
            const postedReply = await prisma.reply.create({
                data: replyDTO,
            });
            delete postedReply.updatedAt;
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: postedReply,
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
    async deleteReply(id) {
        try {
            const deletedReply = await prisma.reply.delete({
                where: {
                    id: id,
                },
            });
            return new ServiceResponseDTO_1.default({
                error: false,
                payload: deletedReply,
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
exports.default = new ReplyServices();
//# sourceMappingURL=ReplyServices.js.map
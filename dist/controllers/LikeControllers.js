"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikeServices_1 = __importDefault(require("../services/LikeServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const redis_1 = __importDefault(require("../middlewares/redis"));
class LikeControllers {
    async likeMechanism(req, res) {
        const loggedUser = res.locals.user;
        const { targetId } = req.body;
        const { error, payload } = await LikeServices_1.default.likeMechanism({
            targetId,
            authorId: loggedUser.id,
        });
        if (error) {
            return res.status(500).json(new ResponseDTO_1.default({
                error,
                message: payload,
                data: null,
            }));
        }
        // to make sure getAllVibes request gets the latest vibes data
        await redis_1.default.deleteVibes();
        return res.status(200).json(new ResponseDTO_1.default({
            error,
            message: {
                status: 'Ok!',
            },
            data: payload,
        }));
    }
}
exports.default = new LikeControllers();
//# sourceMappingURL=LikeControllers.js.map
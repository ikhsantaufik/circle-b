"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowServices_1 = __importDefault(require("../services/FollowServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
class FollowControllers {
    async follow(req, res) {
        const loggedUser = res.locals.user;
        const { id } = req.params;
        const { error, payload } = await FollowServices_1.default.follow({
            targetId: +id,
            ownerId: loggedUser.id,
        });
        if (error) {
            return res.status(500).json(new ResponseDTO_1.default({
                error,
                message: payload,
                data: null,
            }));
        }
        return res.status(200).json(new ResponseDTO_1.default({
            error,
            message: {
                status: 'User followed!',
            },
            data: payload,
        }));
    }
    async unfollow(req, res) {
        const loggedUser = res.locals.user;
        const { id } = req.params;
        const { error, payload } = await FollowServices_1.default.unfollow({
            targetId: +id,
            ownerId: loggedUser.id,
        });
        if (error) {
            return res.status(500).json(new ResponseDTO_1.default({
                error,
                message: payload,
                data: null,
            }));
        }
        return res.status(200).json(new ResponseDTO_1.default({
            error,
            message: {
                status: 'User unfollowed!',
            },
            data: payload,
        }));
    }
}
exports.default = new FollowControllers();
//# sourceMappingURL=FollowControllers.js.map
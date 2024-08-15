"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VibeServices_1 = __importDefault(require("../services/VibeServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const redis_1 = __importDefault(require("../middlewares/redis"));
class VibeControllers {
    async getVibes(req, res) {
        const loggedUser = res.locals.user;
        const { error, payload } = await VibeServices_1.default.getVibes(loggedUser);
        if (error) {
            return res.status(500).json(new ResponseDTO_1.default({
                error,
                message: payload,
                data: null,
            }));
        }
        // await Redis.setVibes(payload)
        return res.status(200).json(new ResponseDTO_1.default({
            error,
            message: {
                status: 'Vibes retrieved!',
            },
            data: payload,
        }));
    }
    async getVibe(req, res) {
        const loggedUser = res.locals.user;
        const { id } = req.params;
        const { error, payload } = await VibeServices_1.default.getVibe(+id, loggedUser);
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
                status: 'Vibe retrieved!',
            },
            data: payload,
        }));
    }
    async getUserVibes(req, res) {
        const { id } = req.params;
        const { error, payload } = await VibeServices_1.default.getUserVibes(+id);
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
                status: "User's vibes retrieved!",
            },
            data: payload,
        }));
    }
    async postVibes(req, res) {
        var _a;
        const loggedUser = res.locals.user;
        const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || null;
        const { content, badLabels } = req.body;
        const { error, payload } = await VibeServices_1.default.postVibe({
            content,
            image,
            badLabels: JSON.parse(badLabels),
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
                status: 'Vibe posted!',
            },
            data: payload,
        }));
    }
    async deleteVibe(req, res) {
        const { id } = req.params;
        const { error, payload } = await VibeServices_1.default.deleteVibe(+id);
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
                status: 'Vibe deleted!',
            },
            data: payload,
        }));
    }
}
exports.default = new VibeControllers();
//# sourceMappingURL=VibeControllers.js.map
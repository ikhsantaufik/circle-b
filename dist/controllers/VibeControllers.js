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
const VibeServices_1 = __importDefault(require("../services/VibeServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const redis_1 = __importDefault(require("../middlewares/redis"));
class VibeControllers {
    getVibes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const { error, payload } = yield VibeServices_1.default.getVibes(loggedUser);
            if (error) {
                return res.status(500).json(new ResponseDTO_1.default({
                    error,
                    message: payload,
                    data: null,
                }));
            }
            yield redis_1.default.setVibes(payload);
            return res.status(200).json(new ResponseDTO_1.default({
                error,
                message: {
                    status: 'Vibes retrieved!',
                },
                data: payload,
            }));
        });
    }
    getVibe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const { id } = req.params;
            const { error, payload } = yield VibeServices_1.default.getVibe(+id, loggedUser);
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
        });
    }
    getUserVibes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { error, payload } = yield VibeServices_1.default.getUserVibes(+id);
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
        });
    }
    postVibes(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const image = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || null;
            const { content, badLabels } = req.body;
            const { error, payload } = yield VibeServices_1.default.postVibe({
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
            yield redis_1.default.deleteVibes();
            return res.status(200).json(new ResponseDTO_1.default({
                error,
                message: {
                    status: 'Vibe posted!',
                },
                data: payload,
            }));
        });
    }
    deleteVibe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { error, payload } = yield VibeServices_1.default.deleteVibe(+id);
            if (error) {
                return res.status(500).json(new ResponseDTO_1.default({
                    error,
                    message: payload,
                    data: null,
                }));
            }
            // to make sure getAllVibes request gets the latest vibes data
            yield redis_1.default.deleteVibes();
            return res.status(200).json(new ResponseDTO_1.default({
                error,
                message: {
                    status: 'Vibe deleted!',
                },
                data: payload,
            }));
        });
    }
}
exports.default = new VibeControllers();

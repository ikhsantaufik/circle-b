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
const ReplyServices_1 = __importDefault(require("../services/ReplyServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const redis_1 = __importDefault(require("../middlewares/redis"));
class ReplyControllers {
    postReply(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
            const { content, badLabels, targetId } = req.body;
            const { error, payload } = yield ReplyServices_1.default.postReply({
                image,
                content,
                badLabels: JSON.parse(badLabels),
                targetId: +targetId,
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
                    status: 'Reply posted!',
                },
                data: payload,
            }));
        });
    }
    deleteReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { error, payload } = yield ReplyServices_1.default.deleteReply(+id);
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
                    status: 'Reply deleted!',
                },
                data: payload,
            }));
        });
    }
}
exports.default = new ReplyControllers();

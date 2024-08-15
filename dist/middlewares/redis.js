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
const redis_1 = require("../libs/redis");
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
class Redis {
    getVibes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const rawVibes = yield redis_1.redisClient.get('VIBES');
            const vibes = JSON.parse(rawVibes);
            if (vibes) {
                return res.status(200).json(new ResponseDTO_1.default({
                    error: false,
                    message: {
                        status: 'Vibes retrieved!',
                    },
                    data: vibes,
                }));
            }
            next();
        });
    }
    setVibes(vibes) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.redisClient.set('VIBES', JSON.stringify(vibes));
        });
    }
    deleteVibes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.redisClient.del('VIBES');
        });
    }
}
exports.default = new Redis();

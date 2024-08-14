"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../libs/redis");
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
class Redis {
    async getVibes(req, res, next) {
        const rawVibes = await redis_1.redisClient.get('VIBES');
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
    }
    async setVibes(vibes) {
        await redis_1.redisClient.set('VIBES', JSON.stringify(vibes));
    }
    async deleteVibes() {
        await redis_1.redisClient.del('VIBES');
    }
}
exports.default = new Redis();
//# sourceMappingURL=redis.js.map
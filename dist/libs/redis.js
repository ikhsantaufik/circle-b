"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = exports.redisClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const redis_1 = require("redis");
const config_1 = require("../configs/config");
const CircleError_1 = __importDefault(require("../utils/CircleError"));
async function initRedis() {
    exports.redisClient = await (0, redis_1.createClient)({
        url: `${config_1.REDIS_URL}`,
    })
        .on('error', (err) => {
        throw new CircleError_1.default({ error: `Redis client error: ${err}` });
    })
        .connect();
}
exports.initRedis = initRedis;
//# sourceMappingURL=redis.js.map
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
exports.initRedis = exports.redisClient = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const redis_1 = require("redis");
const config_1 = require("../configs/config");
const CircleError_1 = __importDefault(require("../utils/CircleError"));
function initRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.redisClient = yield (0, redis_1.createClient)({
            url: `${config_1.REDIS_URL}`,
        })
            .on('error', (err) => {
            throw new CircleError_1.default({ error: `Redis client error: ${err}` });
        })
            .connect();
    });
}
exports.initRedis = initRedis;

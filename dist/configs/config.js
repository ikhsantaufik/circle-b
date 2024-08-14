"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.MAILER_PASSWORD = exports.MAILER_USERNAME = exports.REDIS_URL = exports.SALT_ROUND = exports.SECRET_SAUCE = exports.PORT = exports.CLIENT = exports.LOCALHOST = exports.HOST = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
exports.HOST = process.env.HOST;
exports.LOCALHOST = process.env.LOCALHOST;
exports.CLIENT = process.env.CLIENT;
exports.PORT = process.env.PORT;
exports.SECRET_SAUCE = process.env.SECRET_SAUCE;
exports.SALT_ROUND = process.env.SALT_ROUND;
exports.REDIS_URL = process.env.REDIS_URL;
exports.MAILER_USERNAME = process.env.MAILER_USERNAME;
exports.MAILER_PASSWORD = process.env.MAILER_PASSWORD;
//# sourceMappingURL=config.js.map
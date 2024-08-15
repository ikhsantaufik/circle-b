"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.replySchema = exports.vibeSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    email: joi_1.default.string().email().required(),
    name: joi_1.default.string().min(4).required(),
    password: joi_1.default.string().min(4).required(),
    avatar: joi_1.default.string().uri().allow(null),
    banner: joi_1.default.string().uri().allow(null),
    bio: joi_1.default.string().max(255).allow(null),
});
exports.registerSchema = registerSchema;
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().min(4).max(255).required(),
    password: joi_1.default.string().min(4).required(),
});
exports.loginSchema = loginSchema;
const forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
exports.forgotPasswordSchema = forgotPasswordSchema;
const resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(4).required(),
});
exports.resetPasswordSchema = resetPasswordSchema;
const vibeSchema = joi_1.default.object({
    content: joi_1.default.string().max(255).required(),
    image: joi_1.default.string().uri().allow(null),
    badLabels: joi_1.default.array().items(joi_1.default.string()),
    authorId: joi_1.default.number().required(),
});
exports.vibeSchema = vibeSchema;
const replySchema = joi_1.default.object({
    content: joi_1.default.string().max(255).required(),
    image: joi_1.default.string().uri().allow(null),
    badLabels: joi_1.default.array().items(joi_1.default.string()),
    authorId: joi_1.default.number().required(),
    targetId: joi_1.default.number().required(),
});
exports.replySchema = replySchema;
const userSchema = joi_1.default.object({
    id: joi_1.default.number().required(),
    username: joi_1.default.string().min(4).max(255).required(),
    name: joi_1.default.string().min(4).required(),
    filterContent: joi_1.default.boolean(),
    avatar: joi_1.default.string().uri().allow(null),
    banner: joi_1.default.string().uri().allow(null),
    bio: joi_1.default.string().max(255).allow(null).optional().min(0),
});
exports.userSchema = userSchema;
//# sourceMappingURL=validators.js.map
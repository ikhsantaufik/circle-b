"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../configs/config");
class Hasher {
    hashPassword(password) {
        return bcrypt_1.default.hash(password, Number(config_1.SALT_ROUND));
    }
    comparePassword(password, hash) {
        return bcrypt_1.default.compare(password, hash);
    }
}
exports.default = new Hasher();
//# sourceMappingURL=Hasher.js.map
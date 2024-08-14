"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../configs/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticate(req, res, next) {
    const headers = req.headers.authorization;
    if (!headers || !headers.startsWith('Bearer')) {
        return res.sendStatus(401);
    }
    const token = headers && headers.split(' ')[1];
    jsonwebtoken_1.default.verify(token, config_1.SECRET_SAUCE, (error, user) => {
        if (error) {
            return res.sendStatus(401);
        }
        res.locals.user = user;
        next();
    });
}
exports.default = authenticate;
//# sourceMappingURL=authenticate.js.map
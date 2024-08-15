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
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const AuthServices_1 = __importDefault(require("../services/AuthServices"));
class AuthControllers {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const avatar = 'https://i.ytimg.com/vi/U-FcMQQQJT0/maxresdefault.jpg';
            const banner = 'https://img.freepik.com/free-vector/realistic-neon-lights-background_23-2148907367.jpg';
            const { username, email, name, password, bio } = req.body;
            const { error, payload } = yield AuthServices_1.default.register({
                username,
                email,
                name,
                password,
                avatar,
                banner,
                bio: bio ? bio : null,
            });
            if (error) {
                return res.status(500).json(new ResponseDTO_1.default({
                    error,
                    message: payload,
                    data: null,
                }));
            }
            delete payload.password;
            return res.status(200).json(new ResponseDTO_1.default({
                error,
                message: {
                    status: 'User created!',
                },
                data: payload,
            }));
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const { error, payload } = yield AuthServices_1.default.login({
                username,
                password,
            });
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
                    status: 'User logged in!',
                },
                data: {
                    token: payload,
                },
            }));
        });
    }
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const { error, payload } = yield AuthServices_1.default.forgotPassword({
                email,
            });
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
                    status: 'Ready to reset password!',
                },
                data: {
                    token: payload,
                },
            }));
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const requester = res.locals.user;
            const { password } = req.body;
            const { error, payload } = yield AuthServices_1.default.resetPassword({
                email: requester.email,
                password,
            });
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
                    status: 'Password changed!',
                },
                data: {
                    token: payload,
                },
            }));
        });
    }
}
exports.default = new AuthControllers();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
const AuthServices_1 = __importDefault(require("../services/AuthServices"));
class AuthControllers {
    async register(req, res) {
        const avatar = 'https://i.ytimg.com/vi/U-FcMQQQJT0/maxresdefault.jpg';
        const banner = 'https://img.freepik.com/free-vector/realistic-neon-lights-background_23-2148907367.jpg';
        const { username, email, name, password, bio } = req.body;
        const { error, payload } = await AuthServices_1.default.register({
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
    }
    async login(req, res) {
        const { username, password } = req.body;
        const { error, payload } = await AuthServices_1.default.login({
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
    }
    async forgotPassword(req, res) {
        const { email } = req.body;
        const { error, payload } = await AuthServices_1.default.forgotPassword({
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
    }
    async resetPassword(req, res) {
        const requester = res.locals.user;
        const { password } = req.body;
        const { error, payload } = await AuthServices_1.default.resetPassword({
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
    }
}
exports.default = new AuthControllers();
//# sourceMappingURL=AuthControllers.js.map
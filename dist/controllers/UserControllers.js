"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserServices_1 = __importDefault(require("../services/UserServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
class UserControllers {
    async getUser(req, res) {
        const loggedUser = res.locals.user;
        const { id } = req.params;
        const { error, payload } = await UserServices_1.default.getUser(+id, loggedUser);
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
                status: 'User retrieved!',
            },
            data: payload,
        }));
    }
    async getLoggedUser(req, res) {
        const loggedUser = res.locals.user;
        const { error, payload } = await UserServices_1.default.getLoggedUser(loggedUser);
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
                status: 'User retrieved!',
            },
            data: payload,
        }));
    }
    async getUsers(req, res) {
        const loggedUser = res.locals.user;
        const { error, payload } = await UserServices_1.default.getUsers(loggedUser);
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
                status: 'Users retrieved!',
            },
            data: payload,
        }));
    }
    async editUser(req, res) {
        const loggedUser = res.locals.user;
        const files = req.files;
        const avatar = files.avatar ? files.avatar[0].path : null;
        const banner = files.banner ? files.banner[0].path : null;
        const { username, name, filterContent, bio } = req.body;
        const { error, payload } = await UserServices_1.default.editUser({
            id: loggedUser.id,
            username,
            name,
            filterContent: JSON.parse(filterContent),
            avatar,
            banner,
            bio,
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
                status: 'User edited!',
            },
            data: payload,
        }));
    }
    async searchUser(req, res) {
        const loggedUser = res.locals.user;
        const keyword = req.query.keyword;
        if (typeof keyword !== 'string') {
            return res.status(400).json(new ResponseDTO_1.default({
                error: true,
                message: {
                    error: 'Keyword must be a string.',
                },
                data: null,
            }));
        }
        const { error, payload } = await UserServices_1.default.searchUser({ keyword }, loggedUser);
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
                status: 'User retrieved!',
            },
            data: payload,
        }));
    }
}
exports.default = new UserControllers();
//# sourceMappingURL=UserControllers.js.map
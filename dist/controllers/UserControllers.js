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
const UserServices_1 = __importDefault(require("../services/UserServices"));
const ResponseDTO_1 = __importDefault(require("../dtos/ResponseDTO"));
class UserControllers {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const { id } = req.params;
            const { error, payload } = yield UserServices_1.default.getUser(+id, loggedUser);
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
        });
    }
    getLoggedUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const { error, payload } = yield UserServices_1.default.getLoggedUser(loggedUser);
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
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const { error, payload } = yield UserServices_1.default.getUsers(loggedUser);
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
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = res.locals.user;
            const files = req.files;
            const avatar = files.avatar ? files.avatar[0].path : null;
            const banner = files.banner ? files.banner[0].path : null;
            const { username, name, filterContent, bio } = req.body;
            const { error, payload } = yield UserServices_1.default.editUser({
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
        });
    }
    searchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const { error, payload } = yield UserServices_1.default.searchUser({ keyword }, loggedUser);
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
        });
    }
}
exports.default = new UserControllers();

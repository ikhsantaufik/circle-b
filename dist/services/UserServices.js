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
const client_1 = require("@prisma/client");
const validators_1 = require("../validators/validators");
const ServiceResponseDTO_1 = __importDefault(require("../dtos/ServiceResponseDTO"));
const UserDTO_1 = __importDefault(require("../dtos/UserDTO"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const PrismaError_1 = __importDefault(require("../utils/PrismaError"));
const prisma = new client_1.PrismaClient();
class UserServices {
    getUser(id, loggedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawUser = yield prisma.user.findUnique({
                    where: {
                        id: id,
                    },
                    include: {
                        followers: true,
                        followings: true,
                        vibes: {
                            include: {
                                replies: true,
                                likes: true,
                            },
                        },
                    },
                });
                const user = Object.assign(Object.assign({}, rawUser), { totalFollower: rawUser.followers.length, totalFollowing: rawUser.followings.length, isFollowed: rawUser.followers.some((follower) => follower.ownerId === loggedUser.id), vibes: rawUser.vibes.map((vibe) => {
                        const replies = vibe.replies;
                        const likes = vibe.likes;
                        delete vibe.createdAt;
                        delete vibe.replies;
                        delete vibe.likes;
                        delete loggedUser.createdAt;
                        delete loggedUser.updatedAt;
                        return Object.assign(Object.assign({}, vibe), { author: rawUser, totalReplies: replies.length, totalLikes: likes.length, isLiked: likes.some((like) => like.authorId === loggedUser.id) });
                    }) });
                delete user.password;
                delete user.createdAt;
                delete user.updatedAt;
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: user,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return new ServiceResponseDTO_1.default({
                        error: true,
                        payload: (0, PrismaError_1.default)(error),
                    });
                }
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: error,
                });
            }
        });
    }
    getLoggedUser(loggedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawUser = yield prisma.user.findUnique({
                    where: {
                        id: loggedUser.id,
                    },
                    include: {
                        followers: true,
                        followings: true,
                        vibes: {
                            include: {
                                replies: true,
                                likes: true,
                            },
                        },
                    },
                });
                const user = Object.assign(Object.assign({}, rawUser), { totalFollower: rawUser.followers.length, totalFollowing: rawUser.followings.length, vibes: rawUser.vibes.map((vibe) => {
                        const replies = vibe.replies;
                        const likes = vibe.likes;
                        delete vibe.createdAt;
                        delete vibe.replies;
                        delete vibe.likes;
                        delete loggedUser.createdAt;
                        delete loggedUser.updatedAt;
                        return Object.assign(Object.assign({}, vibe), { author: loggedUser, totalReplies: replies.length, totalLikes: likes.length, isLiked: likes.some((like) => like.authorId === loggedUser.id) });
                    }) });
                delete user.password;
                delete user.createdAt;
                delete user.updatedAt;
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: user,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return new ServiceResponseDTO_1.default({
                        error: true,
                        payload: (0, PrismaError_1.default)(error),
                    });
                }
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: error,
                });
            }
        });
    }
    getUsers(loggedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawUsers = yield prisma.user.findMany({
                    include: {
                        followers: true,
                    },
                });
                const users = rawUsers.map((user) => {
                    const followers = user.followers;
                    delete user.password;
                    if (followers.length) {
                        return Object.assign(Object.assign({}, user), { isFollowed: followers.some((follower) => follower.ownerId === loggedUser.id) });
                    }
                    return Object.assign(Object.assign({}, user), { isFollowed: false });
                });
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: users,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return new ServiceResponseDTO_1.default({
                        error: true,
                        payload: (0, PrismaError_1.default)(error),
                    });
                }
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: error,
                });
            }
        });
    }
    editUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validators_1.userSchema.validate(userDTO);
                if (error) {
                    throw new CircleError_1.default({ error: error.details[0].message });
                }
                const requestedUser = yield prisma.user.findUnique({
                    where: {
                        id: userDTO.id,
                    },
                });
                const editedUser = yield prisma.user.update({
                    where: {
                        id: userDTO.id,
                    },
                    data: this.DTOEditor(userDTO, requestedUser),
                });
                delete editedUser.password;
                delete editedUser.updatedAt;
                delete editedUser.createdAt;
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: editedUser,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return new ServiceResponseDTO_1.default({
                        error: true,
                        payload: (0, PrismaError_1.default)(error),
                    });
                }
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: error,
                });
            }
        });
    }
    searchUser(searchDTO, loggedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!searchDTO.keyword) {
                    return new ServiceResponseDTO_1.default({
                        error: false,
                        payload: [],
                    });
                }
                const rawResult = yield prisma.user.findMany({
                    where: {
                        username: {
                            contains: searchDTO.keyword,
                            mode: 'insensitive',
                        },
                        id: {
                            not: loggedUser.id,
                        },
                    },
                    include: {
                        followers: true,
                    },
                });
                const result = rawResult.map((result) => {
                    delete result.password;
                    delete result.createdAt;
                    delete result.updatedAt;
                    result.isFollowed = result.followers.some((follower) => follower.ownerId === loggedUser.id);
                    return result;
                });
                return new ServiceResponseDTO_1.default({
                    error: false,
                    payload: result,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    return new ServiceResponseDTO_1.default({
                        error: true,
                        payload: (0, PrismaError_1.default)(error),
                    });
                }
                return new ServiceResponseDTO_1.default({
                    error: true,
                    payload: error,
                });
            }
        });
    }
    DTOEditor(newData, existingData) {
        return new UserDTO_1.default({
            id: newData.id,
            username: newData.username || existingData.username,
            name: newData.name || existingData.name,
            filterContent: newData.filterContent,
            avatar: newData.avatar || existingData.avatar,
            banner: newData.banner || existingData.banner,
            bio: newData.bio || existingData.bio,
        });
    }
}
exports.default = new UserServices();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterDTO {
    constructor({ username, email, name, password, avatar = null, banner = null, bio = null }) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
        this.avatar = avatar;
        this.banner = banner;
        this.bio = bio;
    }
}
exports.default = RegisterDTO;

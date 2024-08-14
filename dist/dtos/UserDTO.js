"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor({ id, username = null, name = null, filterContent, avatar = null, banner = null, bio = null, }) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.filterContent = filterContent;
        this.avatar = avatar;
        this.banner = banner;
        this.bio = bio;
    }
}
exports.default = UserDTO;
//# sourceMappingURL=UserDTO.js.map
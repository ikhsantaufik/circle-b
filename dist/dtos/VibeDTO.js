"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VibeDTO {
    constructor({ content, image = null, badLabels = [], authorId }) {
        this.content = content;
        this.image = image;
        this.badLabels = badLabels;
        this.authorId = authorId;
    }
}
exports.default = VibeDTO;

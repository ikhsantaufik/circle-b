"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReplyDTO {
    constructor({ image = null, content, badLabels = [], authorId, targetId }) {
        this.image = image;
        this.content = content;
        this.badLabels = badLabels;
        this.authorId = authorId;
        this.targetId = targetId;
    }
}
exports.default = ReplyDTO;

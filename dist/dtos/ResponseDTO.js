"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseDTO {
    constructor({ error, message, data }) {
        this.error = error;
        this.message = message;
        this.data = data;
    }
}
exports.default = ResponseDTO;

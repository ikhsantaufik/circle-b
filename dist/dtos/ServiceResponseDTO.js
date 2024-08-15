"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceResponseDTO {
    constructor({ error, payload }) {
        this.error = error;
        this.payload = payload;
    }
}
exports.default = ServiceResponseDTO;

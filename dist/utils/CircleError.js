"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CircleError extends Error {
    constructor({ error }) {
        super();
        this.error = error;
    }
}
exports.default = CircleError;

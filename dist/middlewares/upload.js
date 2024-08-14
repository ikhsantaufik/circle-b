"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const config_1 = require("../configs/config");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: config_1.cloudinary,
    params: (req, file) => {
        return {
            folder: 'circle-app',
            format: path_1.default.extname(file.originalname).substring(1),
            public_id: `circleapp-${+Date.now()}`,
        };
    },
});
const uploader = (0, multer_1.default)({ storage: storage });
exports.default = uploader;
//# sourceMappingURL=upload.js.map
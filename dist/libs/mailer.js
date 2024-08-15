"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const mustache_1 = __importDefault(require("mustache"));
const CircleError_1 = __importDefault(require("../utils/CircleError"));
const config_1 = require("../configs/config");
const path_1 = __importDefault(require("path"));
async function sendMail(payload) {
    const headerPath = path_1.default.join(__dirname, '../public/header.jpg');
    const header = fs_1.default.readFileSync(headerPath);
    const templatePath = path_1.default.join(__dirname, '../templates/mail-template.html');
    const template = fs_1.default.readFileSync(templatePath, 'utf8');
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: `${config_1.MAILER_USERNAME}`,
            pass: `${config_1.MAILER_PASSWORD}`,
        },
    });
    try {
        await transporter.sendMail({
            from: '"Circle App" <mail.ardix@gmail.com>',
            to: `${payload.to}`,
            subject: `${payload.subject}`,
            html: mustache_1.default.render(template, { payload }),
            attachments: [
                {
                    filename: 'header.png',
                    content: header,
                    encoding: 'base64',
                    cid: 'uniqueImageCID',
                },
            ],
        });
    }
    catch (error) {
        throw new CircleError_1.default({ error: error });
    }
}
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map
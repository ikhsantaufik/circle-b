"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const config_1 = require("../configs/config");
const doc = {
    openapi: '3.0.0',
    info: {
        title: 'CIRCLE APP API',
        description: 'An API made for Circle App.',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    host: config_1.HOST,
};
const outputFile = './swagger.json';
const routes = ['../index.ts'];
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
    console.log('Swagger doc generated.');
});
//# sourceMappingURL=swagger.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const config_1 = require("./configs/config");
const express_rate_limit_1 = require("express-rate-limit");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./libs/swagger.json"));
const VibeControllers_1 = __importDefault(require("./controllers/VibeControllers"));
const AuthControllers_1 = __importDefault(require("./controllers/AuthControllers"));
const ReplyControllers_1 = __importDefault(require("./controllers/ReplyControllers"));
const LikeControllers_1 = __importDefault(require("./controllers/LikeControllers"));
const UserControllers_1 = __importDefault(require("./controllers/UserControllers"));
const FollowControllers_1 = __importDefault(require("./controllers/FollowControllers"));
const authenticate_1 = __importDefault(require("./middlewares/authenticate"));
const upload_1 = __importDefault(require("./middlewares/upload"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const AppV1 = express_1.default.Router();
const port = config_1.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/v1", AppV1);
AppV1.use('/', swagger_ui_express_1.default.serve);
AppV1.get('/', swagger_ui_express_1.default.setup(swagger_json_1.default, {
    customSiteTitle: 'Circle App API',
    customfavIcon: 'NONE',
    customCss: `
                .swagger-ui .topbar { display: none }
                .information-container.wrapper { background: #8e3e63; padding: 2rem }
                .information-container .info { margin: 0 }
                .information-container .info .main { margin: 0 !important}
                .information-container .info .main .title { color: #ffffff}
                .renderedMarkdown p { margin: 0 !important; color: #ffffff !important }
                `,
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
async function main() {
    AppV1.use((0, express_rate_limit_1.rateLimit)({
        windowMs: 15 * 60 * 1000,
        limit: 499,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        // store: new RedisStore({
        //   sendCommand: (...args: string[]) => {
        //     return redisClient.sendCommand(args);
        //   },
        // }),
    }));
    AppV1.post("/register", AuthControllers_1.default.register);
    AppV1.post("/login", AuthControllers_1.default.login);
    AppV1.post("/auth/forgot", AuthControllers_1.default.forgotPassword);
    AppV1.patch("/auth/reset", authenticate_1.default, AuthControllers_1.default.resetPassword);
    AppV1.get("/vibes", authenticate_1.default, VibeControllers_1.default.getVibes);
    AppV1.get("/vibes/:id", authenticate_1.default, VibeControllers_1.default.getVibe);
    AppV1.get("/vibes/user/:id", authenticate_1.default, VibeControllers_1.default.getUserVibes);
    AppV1.post("/vibes", upload_1.default.single("image"), authenticate_1.default, VibeControllers_1.default.postVibes);
    AppV1.delete("/vibes/:id", authenticate_1.default, VibeControllers_1.default.deleteVibe);
    AppV1.get("/follow/:id", authenticate_1.default, FollowControllers_1.default.follow);
    AppV1.get("/unfollow/:id", authenticate_1.default, FollowControllers_1.default.unfollow);
    AppV1.get("/find", authenticate_1.default, UserControllers_1.default.searchUser);
    AppV1.post("/likes", authenticate_1.default, LikeControllers_1.default.likeMechanism);
    AppV1.get("/me", authenticate_1.default, UserControllers_1.default.getLoggedUser);
    AppV1.get("/users/:id", authenticate_1.default, UserControllers_1.default.getUser);
    AppV1.get("/users", authenticate_1.default, UserControllers_1.default.getUsers);
    AppV1.patch("/users/me", upload_1.default.fields([
        { name: "avatar", maxCount: 1 },
        { name: "banner", maxCount: 1 },
    ]), authenticate_1.default, UserControllers_1.default.editUser);
    AppV1.delete("/replies/:id", authenticate_1.default, ReplyControllers_1.default.deleteReply);
    AppV1.post("/replies", upload_1.default.single("image"), authenticate_1.default, ReplyControllers_1.default.postReply);
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
}
// initRedis().then(() => {
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
// });
//# sourceMappingURL=index.js.map
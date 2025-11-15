"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./config/env.config");
const db_config_1 = require("./config/db.config");
const index_route_1 = __importDefault(require("./routes/index.route"));
const app = (0, express_1.default)();
const PORT = env_config_1.ENV.port;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, db_config_1.connectMongoDB)();
app.use("/api", index_route_1.default);
app.get("/", (_req, res) => {
    res.json({ server: true });
});
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

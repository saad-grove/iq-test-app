"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
exports.ENV = {
    port: process.env.PORT || 5050,
    jwtSecret: process.env.JWT_SECRET || "sameoldtreva",
    mongoUrl: process.env.DATABASE_URL,
    pfpUrl: process.env.PFP_URL,
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_config_1 = require("../config/env.config");
const user_model_1 = __importDefault(require("../model/user.model"));
const generate_token_1 = require("../lib/generate-token");
class User {
    constructor(userModel = user_model_1.default) {
        this.userModel = userModel;
    }
    registerUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.userModel.findOne({ email });
            if (existing)
                throw new Error("User already exist");
            const username = email.split("@")[0].replace(" ", "").trim();
            const profilePicture = `${env_config_1.ENV.pfpUrl}${name}`;
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield this.userModel.create({
                name,
                email,
                password: hashedPassword,
                username,
                profilePicture,
            });
            return user;
        });
    }
    loginUser(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({
                $or: [{ email }, { username }],
            });
            if (!user)
                throw new Error("User do not exist");
            const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValidPassword)
                throw new Error("Password is incorrect");
            const token = (0, generate_token_1.generateToken)(user._id.toString());
            return { token, user };
        });
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userModel.findById(userId).select("-password");
        });
    }
}
exports.default = User;

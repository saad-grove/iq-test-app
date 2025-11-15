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
exports.getProfileController = exports.loginUserController = exports.registerUserController = void 0;
const User_1 = __importDefault(require("../services/User"));
const userService = new User_1.default();
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        console.log("Missing required fields");
        res.status(404).json({ message: "Missing required fields" });
        return;
    }
    if (password.length < 8) {
        console.log("Password should not be less than 8 characters");
        res
            .status(404)
            .json({ message: "Password should not be less than 8 characters" });
        return;
    }
    try {
        const user = yield userService.registerUser(name, email, password);
        res.status(201).json({ message: "User registered", data: user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!email || !password) {
        console.log("Missing required fields");
        res.status(404).json({ message: "Missing required fields" });
        return;
    }
    if (password.length < 8) {
        console.log("Password should not be less than 8 characters");
        res
            .status(404)
            .json({ message: "Password should not be less than 8 characters" });
        return;
    }
    try {
        const { token, user } = yield userService.loginUser(username, email, password);
        res
            .status(200)
            .json({ message: "User logged in", data: user, token: token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.loginUserController = loginUserController;
const getProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        const user = yield userService.getProfile(req.user._id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.getProfileController = getProfileController;

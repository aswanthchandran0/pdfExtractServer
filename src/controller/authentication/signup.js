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
exports.signup = void 0;
const user_1 = require("../../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs")); // Import bcryptjs
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10); // 10 is the salt rounds
        const user = new user_1.userModel({ name, email, password: hashedPassword });
        const savedUser = yield user.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        console.log("error", err);
        res.status(400).json({ error: err.message });
    }
});
exports.signup = signup;

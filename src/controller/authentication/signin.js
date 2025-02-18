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
exports.sigin = void 0;
const user_1 = require("../../model/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtTokenService_1 = require("./jwtTokenService");
const sigin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.userModel.findOne({ email });
        if (!user) {
            console.log("entering in user not exist");
            res.status(404).json({ error: "user not found" });
            return;
        }
        console.log("after the user not exist");
        const isMatch = yield bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
        if (!isMatch)
            res.status(400).json({ error: "Invalid credentials" });
        // Generate JWT token for the user
        const token = (0, jwtTokenService_1.generateToken)(user === null || user === void 0 ? void 0 : user.id);
        res.status(200).json({ token, user });
        return;
    }
    catch (err) {
        console.log("err", err);
        res.status(400).json({ error: err.message });
        return;
    }
});
exports.sigin = sigin;

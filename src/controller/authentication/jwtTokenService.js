"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// jwt token generation 
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET_KEY || '', { expiresIn: "1h" });
};
exports.generateToken = generateToken;
// jwt token verification 
const verifyToken = (token) => {
    try {
        const secret = process.env.JWT_SECRET_KEY;
        if (!secret) {
            return null;
        }
        const decode = jsonwebtoken_1.default.verify(token, secret);
        return decode;
    }
    catch (err) {
        return null;
    }
};
exports.verifyToken = verifyToken;

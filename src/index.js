"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_SIDE_URI,
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true // Allow cookies and authentication headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// mongose database connect
mongoose_1.default.connect(process.env.MONGO_URI || '', {})
    .then(() => console.log('mongodb is connected'))
    .catch((err) => console.log('failed to connect mongodb', err));
app.use("/api", userRoute_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: err.message || 'Internal server error'
    });
});
app.listen(PORT, () => {
    console.log(`surver is running PORT ${PORT}`);
});

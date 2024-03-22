"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authrouter = void 0;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("../controllers/auth.controller");
var authrouter = (0, express_1.default)();
exports.authrouter = authrouter;
authrouter.post("/register", auth_controller_1.registerAUser);
authrouter.post("/login", auth_controller_1.login);
authrouter.get("/get-id", auth_controller_1.accessPayload, function (req, res) {
    res.status(200).json({ id: req.body.auth });
});

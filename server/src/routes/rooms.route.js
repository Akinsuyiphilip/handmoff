"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRouter = void 0;
var express_1 = __importDefault(require("express"));
var room_controller_1 = require("../controllers/room.controller");
var roomRouter = (0, express_1.default)();
exports.roomRouter = roomRouter;
roomRouter.get("/", room_controller_1.GetRooms);
roomRouter.post("/add", room_controller_1.AddRoom);

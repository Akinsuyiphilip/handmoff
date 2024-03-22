"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var roomSchema = new mongoose_1.default.Schema({
    roomName: {
        type: String,
        unique: true,
        required: [true, "Room name is required"]
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    features: {
        type: [String]
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
var roomModel = mongoose_1.default.model("rooms", roomSchema);
exports.default = roomModel;

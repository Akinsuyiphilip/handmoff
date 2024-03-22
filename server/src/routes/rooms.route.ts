import express from "express";
import {
  AddRoom,
  GetARoomById,
  GetRooms
} from "../controllers/room.controller";
const roomRouter = express();

roomRouter.get("/", GetRooms);
roomRouter.post("/add", AddRoom);

export { roomRouter };

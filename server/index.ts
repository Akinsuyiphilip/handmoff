import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectToDb } from "./src/config/db.config";
import { authrouter } from "./src/routes/auth.route";
import { roomRouter } from "./src/routes/rooms.route";
import { GetARoomById } from "./src/controllers/room.controller";
import authModel from "./src/models/auth.model";
require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
connectToDb();

app.post("/auth/getcontactdetails/", async (req, res) => {
  try {
    const findUser = await authModel.findById(req.body.userId);
    findUser
      ? res.status(200).json({
          contactDetails: {
            username: findUser.username,
            email: findUser.email
          }
        })
      : res.status(404).json({ message: "User does not have an account" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
});
app.use("/auth", authrouter);
app.post("/rooms/getroom/", GetARoomById);
app.use("/rooms", roomRouter);
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});

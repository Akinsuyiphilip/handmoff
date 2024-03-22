import express from "express";
import {
  accessPayload,
  login,
  registerAUser
} from "../controllers/auth.controller";
const authrouter = express();

authrouter.post("/register", registerAUser);
authrouter.post("/login", login);
authrouter.get(
  "/get-id",
  accessPayload,
  (req: { body: { auth: string } }, res: any) => {
    res.status(200).json({ id: req.body.auth });
  }
);

export { authrouter };

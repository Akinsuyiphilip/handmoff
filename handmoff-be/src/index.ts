import mongoose from "mongoose"
import dotenv from "dotenv"
import http from "http"

import { Config } from "./common/constants"
import { createApp } from "./app"

dotenv.config()

const app = createApp()
const server = http.createServer(app)

mongoose.connect(String(Config.MONGO_URI))
mongoose.set("strictQuery", false)
const database = mongoose.connection
database.once("open", () => console.log("connected to MongoDB!"))
database.on("error", console.error.bind(console, "connection error: "))

const port = Config.PORT || 8080
server.listen(port, () => console.log(`app is now running on http://localhost:${port}`))

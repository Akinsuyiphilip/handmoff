import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  }
});

const authModel = mongoose.model("auth", authSchema);
export default authModel;

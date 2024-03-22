import mongoose from "mongoose";

export const connectToDb = async () => {
  const url = `mongodb+srv://webcraft570:${process.env.DB_PSWD}@cluster0.tw8k96o.mongodb.net/db`;
  try {
    const db = await mongoose.connect(url);
    console.log("connected to database at ", db.connection.host);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

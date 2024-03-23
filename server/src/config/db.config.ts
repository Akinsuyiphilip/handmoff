import mongoose from 'mongoose';

export const connectToDb = async () => {
  const url = process.env.DB_URL;
  try {
    const db = await mongoose.connect(url);
    console.log("connected to database at ", db.connection.host);
  } catch (error) {
    console.log(`Error connecting to database: ${error.message}`);
  }
};

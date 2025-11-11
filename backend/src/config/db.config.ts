import mongoose from "mongoose";
import { ENV } from "./env.config";

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.mongoUrl!);
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error: any) {
    console.log("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};

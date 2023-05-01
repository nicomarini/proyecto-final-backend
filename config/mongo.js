import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.js";

dotenv.config();

const MONGO_CONNECT = process.env.MONGO_CONNECT;

const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Mongoose successfully connected");
  } catch (error) {
    logger.error("Mongoose connection error", error);
  }
};

export default connectMongo;

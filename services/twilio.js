import twilioClient from "../config/twilio.js";
import logger from "../config/logger.js";
import dotenv from "dotenv";

dotenv.config();

const FROM = process.env.FROM;

const Whatsapp = async (to, body) => {
  const wps = {
    from: `whatsapp:${FROM}`,
    to: `whatsapp:+${to}`,
    body: body,
  };
  try {
    const message = await twilioClient.messages.create(wps);
    return message;
  } catch (error) {
    logger.error(error);
  }
};

export default Whatsapp;

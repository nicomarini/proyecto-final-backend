import { transporter } from "../config/nodemailer.js";
import logger from "../config/logger.js";

export const sendEmail = async (to, subject, html) => {
  const mail = {
    from: "Servidor Node.js",
    to: to,
    subject: subject,
    html: html,
  };
  try {
    const message = await transporter.sendMail(mail);
    return message;
  } catch (error) {
    logger.error(error);
  }
};

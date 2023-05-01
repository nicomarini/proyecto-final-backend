import ServicesCart from "../services/cart.js";
import afterShopping from "../services/buys.js";
import { sendEmail } from "../services/nodemailer.js";
import Whatsapp from "../services/twilio.js";

const afterPurchase = async (req, res) => {
  const emailUser = req.user.username;
  const cell = req.user.phoneNumber;
  const cart = await ServicesCart.getCart(emailUser);
  const buys = await afterShopping({ buys: cart });
  const successfully = `number of your purchase [${buys._id}]`;
  const copy = `Confirmation in your email inbox and WhatsApp`;
  const subjectInMail = `Number of your purchase [${buys._id}]`;
  const message = `<h3">${buys}</h3>`;
  await sendEmail(emailUser, subjectInMail, message);
  await Whatsapp(cell, subjectInMail);
  await ServicesCart.deleteCart(emailUser);
  res.render("userLogged/buy", { successfully, copy });
};

export default afterPurchase;

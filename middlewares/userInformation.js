import passport from "passport";
import bCrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import ServicesUser from "../services/user.js";
import { sendEmail } from "../services/nodemailer.js";
import dotenv from "dotenv";

dotenv.config();

const USER = process.env.USER;

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

export const whenLogin = new LocalStrategy(async (username, password, done) => {
  const user = await ServicesUser.getUser(username);
  if (!user) {
    return done("Incorrect User", false);
  }
  if (!isValidPassword(user, password)) {
    return done("Incorrect password", false);
  }
  return done(null, user);
});

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  const user = await ServicesUser.getUser(username);
  done(null, user);
});

export const whenSignUp = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    const data = req.body;
    const user = await ServicesUser.getUser(username);
    const url = req.file.path.slice(6);
    const affair = "New user on your platform";
    const message = `<p>User data: User:[${data.username}], Pass: [${data.password}] & Cell:[${data.phoneNumber}]</p>`;
    if (user) {
      return done("Existing user", false);
    }
    const createUser = await ServicesUser.postUser(data, url);
    const mail = await sendEmail(USER, affair, message);
    done(null, createUser);
  }
);

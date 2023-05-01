import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import logger from "./config/logger.js";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import { createServer } from "http";

import {
  redirectHome,
  dologin,
  products,
  dosignup,
  logout,
  home,
  cart,
  buy,
} from "./routes/routes.js";

import persistence from "./persistence/persistence.js";
import chatModel from "./models/chatModel.js";

import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const cantCPUs = os.cpus().length;
const PORT = process.env.PORT;

if (cluster.isPrimary) {
  logger.info(`ProcessID in: ${process.pid}`);
  for (let i = 0; i < cantCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    logger.info(`Worker: ${worker.process.pid} finished`);
    cluster.fork();
  });
} else {
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const MONGO_CONNECT = process.env.MONGO_CONNECT;
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_CONNECT,
        mongoOptions: advancedOptions,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 600000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //----------------------------------------------------//
  // Routes
  app.use("/", redirectHome);
  app.use("/signup", dosignup);
  app.use("/login", dologin);
  app.use("/home", home);
  app.use("/products", products);
  app.use("/logout", logout);
  app.use("/cart", cart);
  app.use("/buy", buy);
  app.get("/messages", (req, res) => {
    const user = req.user;
    if (user === undefined) {
      return res.redirect("/");
    }
    const photoProfile = req.user.photo;
    const countOf = `USER: ${user.username}`;
    res.render("userLogged/messages", { countOf, photoProfile });
  });
  //----------------------------------------------------//
  app.set("views", "./views");
  app.set("view engine", "pug");
  //----------------------------------------------------//

  io.on("connection", async (socket) => {
    const messagesDb = await persistence.get(chatModel);
    socket.emit("messages", messagesDb);
    socket.on("new-message", async (data) => {
      await persistence.add(chatModel, {
        ...data,
        id: messagesDb.length + 1,
        fyh: new Date().toLocaleString(),
      });
    });
  });

  httpServer.listen(PORT, () => {
    logger.info(`Server is running in ${PORT}`);
  });
}

export default app;

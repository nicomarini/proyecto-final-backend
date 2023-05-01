import mongoose from "mongoose";

const collectionChat = "chat";

const schemaChat = new mongoose.Schema({
  author: {
    name: String,
  },
  text: String,
  fyh: String,
});

const modelChat = mongoose.model(collectionChat, schemaChat);

export default modelChat;

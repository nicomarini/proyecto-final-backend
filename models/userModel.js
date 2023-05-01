import mongoose from "mongoose";

const collectionUser = "users";

const schemaUser = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  lastName: String,
  age: Number,
  address: String,
  phoneNumber: Number,
  photo: String,
});

const modelUser = mongoose.model(collectionUser, schemaUser);

export default modelUser;

import mongoose from "mongoose";

const collectionBuys = "buys";

const schemaBuys = new mongoose.Schema({
  buys: {
    author: {
      username: String,
      address: String,
      phoneNumber: Number,
    },
    products: [],
    timestamp: String,
  },
});

const modelBuys = mongoose.model(collectionBuys, schemaBuys);

export default modelBuys;

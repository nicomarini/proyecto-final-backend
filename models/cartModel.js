import mongoose from "mongoose";

const collectionCart = "cart";

const schemaCart = new mongoose.Schema({
  author: {
    username: String,
    name: String,
    lastName: String,
    address: String,
    phoneNumber: Number,
  },
  products: [],
  timestamp: String,
});

const modelCart = mongoose.model(collectionCart, schemaCart);

export default modelCart;

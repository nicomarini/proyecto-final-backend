import persistence from "../persistence/persistence.js";
import CartModel from "../models/cartModel.js";
// import productsDaoFactory from "../persistence/factory.js";

// const persistence = persistence.getDao();

async function getCart(email) {
  const obtainFind = await persistence.findEmail(CartModel, email);
  return obtainFind;
}

async function postCart(user) {
  const data = {
    author: {
      name: user.name,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      username: user.username,
    },
    productos: [],
    timestamp: Date.now(),
  };
  const add = await persistence.add(CartModel, data);
  return add;
}

async function postProductCart(email, Data) {
  const pushData = await persistence.updateEmail(CartModel, email, {
    $push: { products: Data },
  });
  return pushData;
}

async function deleteProductCart(email, Data) {
  const deleteProduct = await persistence.updateEmail(CartModel, email, {
    $pull: { products: Data },
  });
  return deleteProduct;
}

async function deleteCart(email) {
  const deleteProducts = await persistence.deleteOne(CartModel, email);
  return deleteProducts;
}

export default {
  getCart,
  postCart,
  postProductCart,
  deleteProductCart,
  deleteCart,
};

// import persistence from "../persistence/persistence.js";
import productsDaoFactory from "../persistence/factory.js";
import ProductModel from "../models/productModel.js";
const persistence = productsDaoFactory.getDao();

async function getProduct() {
  const find = await persistence.get(ProductModel);
  return find;
}

async function getProductId(id) {
  const findId = await persistence.getId(ProductModel, id);
  return findId;
}

async function postProduct(product) {
  const data = {
    timestamp: Date.now(),
    name:
      product.name.toLowerCase().charAt(0).toUpperCase() +
      product.name.slice(1),
    description: product.description,
    code: product.code,
    price: product.price,
    photo: product.photo,
    stock: product.stock,
  };
  const addOn = await persistence.add(ProductModel, data);
  return addOn;
}

async function updateProduct(id, product) {
  const data = {
    timestamp: Date.now(),
    name:
      product.name.toLowerCase().charAt(0).toUpperCase() +
      product.name.slice(1),
    description: product.description,
    code: product.code,
    price: product.price,
    photo: product.photo,
    stock: product.stock,
  };
  const updated = await persistence.updateId(ProductModel, id, data);
  return updated;
}

async function deleteProduct(id) {
  const deleted = await persistence.deleteId(ProductModel, id);
  return deleted;
}

export default {
  getProduct,
  getProductId,
  postProduct,
  updateProduct,
  deleteProduct,
};

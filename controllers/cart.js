import ServicesCart from "../services/cart.js";
import ServicesProduct from "../services/products.js";

export const getCart = async (req, res) => {
  const email = req.user.username;
  const photoProfile = req.user.photo;
  const countOf = `USER: ${email}`;
  const obtain = await ServicesCart.getCart(email);
  res.render("userLogged/cart", { obtain, photoProfile, countOf });
};

export const postProductCart = async (req, res) => {
  const user = req.user;
  const email = user.username;
  const id = req.body.id;
  const obtainInCart = await ServicesCart.getCart(email);
  if (obtainInCart === null) {
    ServicesCart.postCart(user);
  }

  const findProductId = await ServicesProduct.getProductId(id);
  await ServicesCart.postProductCart(email, findProductId);
  res.redirect("/products");
};

export const deleteProductCart = async (req, res) => {
  const email = req.user.username;
  const id = req.body.id;
  const obtainInProduct = await ServicesProduct.getProductId(id);
  await ServicesCart.deleteProductCart(email, obtainInProduct);
  res.redirect("/cart");
};

export const deleteAllCart = async (req, res) => {
  const email = req.user.username;
  await ServicesCart.deleteCart(email);
  res.redirect("/products");
};

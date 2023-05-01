import ServicesProducts from "../services/products.js";

export const getProduct = async (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.render("withoutUser/productsWithoutUser");
  }
  const countOf = `USER: ${user.username}`;
  const photoProfile = user.photo;
  const products = await ServicesProducts.getProduct();
  res.render("userLogged/productsUserLogged", {
    products,
    countOf,
    photoProfile,
  });
};

export const postProduct = async (req, res) => {
  const product = req.body;
  await ServicesProducts.postProduct(product);
  res.redirect("/products");
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  await ServicesProducts.updateProduct(id, product);
  res.redirect("/products");
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await ServicesProducts.deleteProduct(id);
  res.redirect("/products");
};

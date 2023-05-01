import ServicesCart from "../services/cart.js";

export const getSignUp = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  }
  res.render("withoutUser/signup");
};

export const getSignIn = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/products");
  }
  res.render("withoutUser/login");
};

export const getErrorLogin = async (req, res) => {
  res.render("withoutUser/login-error");
};

export const getErrorRegister = async (req, res) => {
  res.render("withoutUser/register-error");
};

export const signOff = async (req, res) => {
  const email = req.user.username;
  const logout = `Session closed successfully`;
  await ServicesCart.deleteCart(email);
  req.logout((error) => {
    res.render("signOff", { logout });
  });
};

export const forTheHome = async (req, res) => {
  res.redirect("/home");
};

export const findHome = async (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.render("withoutUser/homeUser");
  }
  const photoProfile = user.photo;
  const countOf = `USER: ${user.username}`;
  res.render("userLogged/homeUserLogged", { countOf, photoProfile });
};

// import persistence from "../persistence/persistence.js";
import productsDaoFactory from "../persistence/factory.js";
import UserModel from "../models/userModel.js";
import bCrypt from "bcrypt";

const persistence = productsDaoFactory.getDao();

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

async function getUser(mail) {
  const obtainUser = await persistence.getUsername(UserModel, mail);
  return obtainUser;
}

async function postUser(data, url) {
  const createUser = {
    username: data.username,
    password: createHash(data.password),
    name: data.name,
    lastName: data.lastName,
    age: data.age,
    address: data.address,
    phoneNumber: data.phoneNumber,
    photo: url,
  };
  const addUser = await persistence.add(UserModel, createUser);
  return addUser;
}

export default { getUser, postUser };

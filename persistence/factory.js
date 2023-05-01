import persistence from "./persistence.js";
import persistenceMem from "./persistenceMem.js";

const asset = process.argv[2] || "Mongo";

let dao;

switch (asset) {
  case "Mongo":
    dao = persistence;
    await dao.init();
    break;
  case "Mem":
    dao = persistenceMem;
    await dao.init();
    break;
  default:
    dao = persistence;
    dao.init();
}

export default class productsDaoFactory {
  static getDao() {
    return dao;
  }
}

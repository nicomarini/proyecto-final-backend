// import persistence from "../persistence/persistence.js";
import BuyModel from "../models/buyModel.js";
import productsDaoFactory from "../persistence/factory.js";
const persistence = productsDaoFactory.getDao();

async function afterShopping(buy) {
  const add = await persistence.add(BuyModel, buy);
  return add;
}

export default afterShopping;

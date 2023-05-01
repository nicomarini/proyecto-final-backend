import connectMongo from "../config/mongo.js";
import logger from "../config/logger.js";

connectMongo();

class persistence {
  async init() {
    console.log("Products dao in Mongodb");
  }

  async get(model) {
    try {
      const find = await model.find({});
      return find;
    } catch (error) {
      logger.error(`In Mongoose find failed: ${error}`);
    }
  }

  async getUsername(model, username) {
    try {
      const getUser = await model.findOne({ username: username });
      return getUser;
    } catch (error) {
      logger.error(`In Mongoose findOne failed: ${error}`);
    }
  }

  async findEmail(model, email) {
    try {
      const findUser = await model.findOne({ "author.username": email });
      return findUser;
    } catch (error) {
      logger.error(`In Mongoose findOne failed: ${error}`);
    }
  }

  async getId(model, id) {
    try {
      const obtainId = await model.findById(id);
      return obtainId;
    } catch (error) {
      logger.error(`In Mongoose findById failed: ${error}`);
    }
  }

  async add(model, data) {
    try {
      const addData = new model(data);
      const save = await addData.save();
      return save;
    } catch (error) {
      logger.error(`In Mongoose failed to save: ${error}`);
    }
  }

  async updateId(model, id, data) {
    try {
      const findUpdate = await model.findByIdAndUpdate(id, data);
      return findUpdate;
    } catch (error) {
      logger.error(`In Mongoose findByIdAndUpdate failed: ${error}`);
    }
  }

  async updateEmail(model, email, data) {
    try {
      const updateOne = await model.updateOne(
        { "author.username": email },
        data
      );
      return updateOne;
    } catch (error) {
      logger.error(`In Mongoose updateOne failed: ${error}`);
    }
  }

  async deleteId(model, id) {
    try {
      const deleteOne = await model.deleteOne({ _id: id });
      return deleteOne;
    } catch (error) {
      logger.error(`In Mongoose deleteOne failed: ${error}`);
    }
  }

  async deleteOne(model, email) {
    try {
      const deleteOne = await model.deleteOne({ "author.username": email });
      return deleteOne;
    } catch (error) {
      logger.error(`In Mongoose deleteOne failed: ${error}`);
    }
  }
}

export default new persistence();

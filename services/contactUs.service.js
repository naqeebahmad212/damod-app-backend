const { contactUsModel } = require("../model");

/**
 * * Note Replace the modelName with the Your Model
 */

const create = async (payload) => {
  const newRecord = new contactUsModel(payload);
  return await newRecord.save();
};

const find = async (id) => {
  return await contactUsModel.findById(id);
};

const findAll = async (query) => {
  return await contactUsModel.find();
};

const update = async (id, payload) => {
  return await contactUsModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
};

const remove = async (id) => {
  return await contactUsModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
};

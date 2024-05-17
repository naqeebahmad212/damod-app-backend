const { diamondModel } = require("../model");
const {
  queryFilterPipeline,
  stockFilterPipeline,
} = require("../utils/pipeline/filter.pipeline");

const create = async (payload) => {
  if (Array.isArray(payload)) {
    return await diamondModel.insertMany(payload);
  }
  const newRecord = new diamondModel(payload);
  return await newRecord.save();
};

const find = async (id) => {
  return await diamondModel.findById(id);
};

const findAll = async (query) => {
  const pipeLine = queryFilterPipeline(query);
  return await diamondModel.aggregate(pipeLine);
};

const findAllDiamondsByShape = async () => {
  const pipeline = stockFilterPipeline();
  return await diamondModel.aggregate(pipeline);
};

const update = async (id, payload) => {
  return await diamondModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
};

const remove = async (id) => {
  return await diamondModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  find,
  findAll,
  findAllDiamondsByShape,
  update,
  remove,
};

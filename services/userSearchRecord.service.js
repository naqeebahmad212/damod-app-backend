const { userSearchRecordModel } = require("../model");
const {
  userSearchRecordFilterPipeline,
  mostSearchedShapeFilterPipeline,
} = require("../utils/pipeline/filter.pipeline");

const create = async (payload) => {
  const userSearchRecordExists = await userSearchRecordModel.findOne({
    user: payload.user,
  });
  if (userSearchRecordExists) {
    return await update(userSearchRecordExists._id, {
      diamond: payload.diamond[0],
    });
  }
  const newRecord = new userSearchRecordModel(payload);
  return await newRecord.save();
};

const find = async (id) => {
  return await userSearchRecordModel
    .findById(id)
    .populate("user")
    .populate("diamond");
};

const findAll = async (query) => {
  const pipeline = await userSearchRecordFilterPipeline();
  return await userSearchRecordModel.aggregate(pipeline);
};

const searchedShape = async (query) => {
  const pipeline = await mostSearchedShapeFilterPipeline();
  return await userSearchRecordModel.aggregate(pipeline);
};

const update = async (id, payload) => {
  return await userSearchRecordModel.findByIdAndUpdate(
    id,
    { $addToSet: payload },
    { new: true }
  );
};

const remove = async (id) => {
  return await userSearchRecordModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
  searchedShape,
};

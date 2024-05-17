const { userModel } = require("../model");
const { getHashedPassword, getPassword } = require("./auth.service");

const create = async (payload) => {
  payload["password"] = getHashedPassword(payload.password);
  const newUser = new userModel(payload);
  return await newUser.save();
};

const find = async (email) => {
  const userExists = await userModel.findOne({ email: email });
  if (userExists) {
    const userPassword = getPassword(userExists.password);
    return userPassword;
  }
  return null;
};

const findAll = async () => {
  return await userModel.find();
};

const usersCount = async () => {
  return await userModel.countDocuments();
};

const update = async (id, payload) => {
  const updatedData = await userModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );
  console.log(updatedData);
  return updatedData;
};

const remove = async (id) => {
  return await userModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
  usersCount,
};

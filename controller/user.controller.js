const { StatusCodes } = require("http-status-codes");
const { userService } = require("../services");
const { catchAsync } = require("../utils/catchAsync");
const ApiError = require("../config/error");

const create = catchAsync(async (req, res) => {
  await userService.create(req.body);
  return res.status(StatusCodes.CREATED).json({
    error: false,
    message: "New User Added SuccessFully!!",
  });
});

const find = catchAsync(async (req, res) => {
  const userExits = await userService.find(req.body.email);

  if (!userExits)
    throw new ApiError(StatusCodes.NOT_FOUND, "customer Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "User Details Found!",
    result: userExits,
  });
});

const usersCount = catchAsync(async (req, res) => {
  const count = await userService.usersCount();
  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Users Count Fetched Successfully",
    result: count,
  });
});

const findAll = catchAsync(async (req, res) => {
  const userList = await userService.findAll();

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "User Records Found!!",
    result: userList,
  });
});

const update = catchAsync(async (req, res) => {
  const userInfo = await userService.update(req.params.id, req.body);

  if (!userInfo)
    throw new ApiError(StatusCodes.NOT_FOUND, "User Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "User Record Updated!!",
  });
});

const remove = catchAsync(async (req, res) => {
  const userRecord = await userService.remove(req.params.id);

  if (!userRecord)
    throw new ApiError(StatusCodes.NOT_FOUND, "User Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "User Record Deleted!!",
  });
});

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
  usersCount,
};

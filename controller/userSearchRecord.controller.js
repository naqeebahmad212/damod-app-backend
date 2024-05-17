const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("../utils/catchAsync");
const { userSearchRecordService } = require("../services");
const ApiError = require("../config/error");

/**
 *  *Note Replace serviceName with the service you want to Name
 */

const create = catchAsync(async (req, res) => {
  let payload = { ...req.body };
  const newRecord = await userSearchRecordService.create(payload);
  return res.status(StatusCodes.CREATED).json({
    error: false,
    message: "New Record Added SuccessFully!!",
  });
});

const find = catchAsync(async (req, res) => {
  const id = req.params.id;

  const record = await userSearchRecordService.find(id);

  if (!record) throw new ApiError(StatusCodes.NOT_FOUND, "Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: record,
  });
});

const findAll = catchAsync(async (req, res) => {
  const records = await userSearchRecordService.findAll(req.query);

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: records,
  });
});

const searchedShape = catchAsync(async (req, res) => {
  const records = await userSearchRecordService.searchedShape(req.query);

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: records,
  });
});

const update = catchAsync(async (req, res) => {
  const updatedRecord = await userSearchRecordService.update(
    req.params.id,
    req.body
  );

  if (!updatedRecord)
    throw new ApiError(StatusCodes.NOT_FOUND, "Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Updated!!",
  });
});

const remove = catchAsync(async (req, res) => {
  const deletedRecord = await userSearchRecordService.remove(req.params.id);

  if (!deletedRecord)
    throw new ApiError(StatusCodes.NOT_FOUND, "Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Deleted!!",
  });
});

module.exports = {
  create,
  find,
  findAll,
  update,
  remove,
  searchedShape,
};

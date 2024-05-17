const { StatusCodes } = require("http-status-codes");
const { catchAsync } = require("../utils/catchAsync");
const { diamondService } = require("../services");
const ApiError = require("../config/error");

/**
 *  *Note Replace serviceName with the service you want to Name
 */

const create = catchAsync(async (req, res) => {
  const newRecord = await diamondService.create(req.body);

  return res.status(StatusCodes.CREATED).json({
    error: false,
    message: "New Record Added SuccessFully!!",
  });
});

const find = catchAsync(async (req, res) => {
  const id = req.params.id;

  const record = await diamondService.find(id);

  if (!record) throw new ApiError(StatusCodes.NOT_FOUND, "Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: record,
  });
});

const findAll = catchAsync(async (req, res) => {
  const records = await diamondService.findAll(req.query);

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: records,
  });
});

const findAllDiamondsByShape = catchAsync(async (req, res) => {
  const records = await diamondService.findAllDiamondsByShape();

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Details Found!",
    result: records,
  });
});

const update = catchAsync(async (req, res) => {
  const updatedRecord = await diamondService.update(req.params.id, req.body);

  if (!updatedRecord)
    throw new ApiError(StatusCodes.NOT_FOUND, "Record Not Found!!");

  return res.status(StatusCodes.OK).json({
    error: false,
    message: "Record Updated!!",
  });
});

const remove = catchAsync(async (req, res) => {
  const deletedRecord = await diamondService.remove(req.params.id);

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
  findAllDiamondsByShape,
  update,
  remove,
};

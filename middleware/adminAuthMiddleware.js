const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../services/token.service");
const { userModel } = require("../model");
const ApiError = require("../config/error");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    // *Check if Token is present or not
    if (
      !req.headers.authorization ||
      req?.headers?.authorization?.split(" ")?.length == 0
    ) {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "User is not Authenticated!!")
      );
    }

    // *Extract token
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "User is not Authenticated Token!!"
        )
      );
    }

    //* Verify Token
    const isVerified = verifyToken(token);
    if (!isVerified) {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "User is Authenticated is Verified!!"
        )
      );
    }
    const userDetails = await userModel.findById(isVerified.id);
    // *Extract User details
    if (userDetails.role != "admin") {
      return next(
        new ApiError(StatusCodes.UNAUTHORIZED, "User does not exits!!")
      );
    }

    //* Append user details in req object
    req.user = userDetails;

    next();
  } catch (error) {
    console.log(error.message);
    if (error.message == "Token Expired") {
      return next(
        new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Session Expired Please Login Again!"
        )
      );
    }
    console.log(`Auth Middle Ware Error: ${error.message}`);
    next(new ApiError(StatusCodes.BAD_REQUEST, "Something went wrong"));
  }
};

module.exports = {
  adminAuthMiddleware,
};

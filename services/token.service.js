const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const ApiError = require("../config/error");

function getJwtAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SCERET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
}
const getJwtRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SCERET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_TIME,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SCERET_KEY);
  } catch (err) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Token Expired");
  }
};

module.exports = {
  getJwtAccessToken,
  getJwtRefreshToken,
  verifyToken,
};

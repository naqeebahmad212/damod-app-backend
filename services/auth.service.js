const { userModel } = require("../model");
const bcrypt = require("bcryptjs");
const { getJwtAccessToken, getJwtRefreshToken } = require("./token.service");
const ApiError = require("../config/error");
const { StatusCodes } = require("http-status-codes");
var CryptoJS = require("crypto-js");

/**
 * *Login a new User
 * @param {object} payload => {email:String, password:String}
 */
const login = async (payload) => {
  console.log(payload);
  const userExists = await userModel.findOne({ email: payload.email });
  if (!userExists) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No User Register with this email id exists"
    );
  }

  if (!comparePassword(payload.password, userExists.password)) {
    throw new ApiError(400, "Invalid Credentials!!");
  }

  const accessToken = getJwtAccessToken({
    id: userExists._id,
    email: userExists.email,
    role: userExists.role,
  });

  const refreshToken = getJwtRefreshToken({
    id: userExists._id,
    email: userExists.email,
    role: userExists.role,
  });

  return {
    accessToken,
    refreshToken,
    role: userExists.role,
    userDetails: {
      userId: userExists._id,
      email: userExists.email,
      userName: userExists.name,
      phoneNumber: userExists.phoneNumber,
    },
    email: userExists.email,
  };
};

/**
 * *Create a New User
 * @param {Object} payload = >{firstName:String, lastName:String, email:String, password:String }
 * @returns {Object} New User
 */
const register = async (payload) => {
  
  // *Check if the user Already exits
  const userExists = await userModel.findOne({ email: payload.email });

  if (userExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User Already Exists!!");
  }

  payload["password"] = getHashedPassword(payload.password); // *Generate Hashed Password

  const newUser = new userModel(payload); // *Add new User

  return await newUser.save();
};

/**
 * * Returns Encrypted Password
 * @param {String} password
 */
const getHashedPassword = (password) => {
  return CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY_CRYPTOJS
  ).toString();
  // const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
  // return bcrypt.hashSync(password, salt);
};

/**
 * * Compare the encrypted password and the normal string password
 * @param {String} password
 * @param {String} hashedPassword
 * @returns Boolean
 */
const comparePassword = (password, hashedPassword) => {
  const originalPass = getPassword(hashedPassword);
  if (originalPass == password) {
    return true;
  }
  return false;
  // return bcrypt.compareSync(password, hashedPassword);
};

const getPassword = (hashedPassword) => {
  var bytes = CryptoJS.AES.decrypt(
    hashedPassword,
    process.env.SECRET_KEY_CRYPTOJS
  );
  var originalPass = bytes.toString(CryptoJS.enc.Utf8);
  return originalPass;
};

module.exports = {
  login,
  register,
  getHashedPassword,
  getPassword,
};

const { authService } = require("../services");
const { catchAsync } = require("../utils/catchAsync");

/**
 * *Login a new User
 * @returns {accessToken, refreshToken}
 */
const login = catchAsync(async (req, res) => {
  const token = await authService.login(req.body);

  return res.status(200).json({
    error: false,
    message: "Login SuccessFully!!",
    result: token,
  });
});

/**
 * * Register a New user
 * @returns
 */
const register = catchAsync(async (req, res) => {
  console.log(req.body,'req body')
  const user = await authService.register(req.body);

  return res.status(202).json({
    error: false,
    message: "User Registered SuccessFully!!",
  });
});

const forgetPassword = (req, res) => {
  try {
  } catch (error) {}
};

const resetPassword = (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  login,
  register,
};

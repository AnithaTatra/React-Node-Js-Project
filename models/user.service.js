"use strict";

const bcrypt = require("bcrypt");
const userSchema = require("./user.model");
const constants = require("../constants/constants");
const mailsending = require("../middleware/email");

async function userSignUp(req, res) {
  let userDetails = new userSchema(req.body);
  let salt = await bcrypt.genSalt(8);
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  userDetails.password = bcrypt.hashSync(password, salt);
  userDetails.confirmPassword = bcrypt.hashSync(confirmPassword, salt);
  let result = await userDetails.save();
  mailsending.mailSending(req.body.email);
  return res.status(200).json({
    status: constants.USER_STATUS.SUCCESS_STATUS,
    message: constants.USER_STATUS.CREATED_SUCCESS,
    result: result,
  });
}

async function userLogin(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let userData;
  let isMatch;
  if (email) {
    userData = await userSchema.findOne({ email: email }).exec();
    if (userData) {
      isMatch = await bcrypt.compare(password, userData.password);
      await userSchema
        .findOneAndUpdate(
          { uuid: userData.uuid },
          { loginStatus: true },
          { new: true }
        )
        .exec();
      if (!userData) {
        return res.status(400).json({
          status: constants.USER_STATUS.SUCCESS_STATUS,
          message: constants.USER_STATUS.PLEASE_SIGNUP,
        });
      }
    } else {
      return res.status(400).json({
        status: constants.USER_STATUS.FAILURE_STATUS,
        message: constants.USER_STATUS.CORRECT_USERNAME,
      });
    }

    if (isMatch == true) {
      let userInfo = userData.toObject();
      return res.status(200).json({
        status: constants.USER_STATUS.SUCCESS_STATUS,
        message: constants.USER_STATUS.LOGIN_SUCCESS,
        result: userData,
      });
    } else {
      return res.status(201).json({
        status: constants.USER_STATUS.FAILURE_STATUS,
        message: constants.USER_STATUS.LOGIN_FAILED,
      });
    }
  }
}

module.exports = { userSignUp, userLogin };

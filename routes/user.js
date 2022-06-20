"use strict";

const router = require("express").Router();
const serviceI = require("../models/user.service");
const userSchema = require("../models/user.model");
const constants = require("../constants/constants");

//user signup api
router.post("/signUp", async (req, res) => {
  try {
    console.log("Register.....")
    const username = req.body.username;
    const email = req.body.email;
    const mobilenumber = req.body.mobilenumber;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    var result = serviceI.userSignUp(req, res);
  } catch (error) {
    return res.status(400).json({
      status: constants.USER_STATUS.FAILURE_STATUS,
      message: constants.USER_STATUS.NO_DATA,
    });
  }
});

//user login api
router.post("/login", async (req, res) => {
  try {
    console.log("Hi...")
    serviceI.userLogin(req, res);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: constants.USER_STATUS.FAILURE_STATUS,
      message: constants.USER_STATUS.NO_DATA,
    });
  }
});
module.exports = router;

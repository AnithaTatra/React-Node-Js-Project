"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/user");
require("dotenv").config();

app.use(cors());
const port = process.env.PORT || 4000;

//connection to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit[1];
  });

app.use(express.json());

//user management api url
app.use("/api/v1/user", userRoute);

//listening to port
app.listen(port, () => {
  console.log(`Server Started at ${port} Port`);
});

import { mongo } from "mongoose";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  registeredAt: {
    type: Date.now(),
    require: true,
  },
  portfolio_info: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "portfolio_info",
  },
});

module.exports = mongoose.model("user_info", userSchema);

import { mongo } from "mongoose";

const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updateAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("template_info", templateSchema);

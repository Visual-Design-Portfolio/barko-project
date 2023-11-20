import { mongo } from "mongoose";

const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  logo_url: {
    type: String,
    require: true,
  },
});

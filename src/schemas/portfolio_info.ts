import { mongo } from "mongoose";

const mongoose = require("mongoose");

const portfolioSchma = new mongoose.Schema({
  portfolio: {
    portfolioName: { type: String },
    titleName: { type: String },
    profilePicture: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    require: true,
  },
  education: {
    school: { type: String },
    degree: { type: String },
    major: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    require: true,
  },
  workExperience: {
    position: { type: String },
    employeeType: { type: String },
    companyName: { type: String },
    companyLocation: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    require: true,
  },
  project: {
    title: { type: String },
    detail: { type: String },
    picture: { type: String },
    category: { type: String },
    tag: { type: String },
    linkProject: { type: String },
    linkGitRepo: { type: String },
    require: true,
  },
  skill: {
    skill1: { type: String },
    require: true,
  },
  template: {
    name: { type: String },
    url: { type: String },
    createdAt: { type: Date },
    updateAt: { type: Date },
  },
  user_info: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },
});

module.exports = mongoose.model("portfolio_info", portfolioSchma);

import mongoose from "mongoose";

export interface IPortfolio {}

export interface IEducation {
  school: string;
  degree: string;
  major: string;
  startDate: Date;
  endDate: Date;
}

export interface IWorkExperience {
  startDate: Date;
  endDate: Date;
  position: string;
  employeeType: string;
  companyName: string;
  companyLocation: string;
}

export interface IProject {
  picture: string;
  title: string;
  detail: string;
  category: string;
  tag: string;
  linkProject: string;
  linkGitRepo: string;
}

export interface ISkill {
  name: string;
}

export interface ITemplate {
  name: string;
  url: string;
  createdAt: Date;
  updateAt: Date;
}

const portfolioSchma = new mongoose.Schema({
  name: String,
  ownerName: String,
  picture: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      major: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],

  workExperience: [
    {
      position: { type: String, required: true },
      employeeType: { type: String, required: true },
      companyName: { type: String, required: true },
      companyLocation: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      required: true,
    },
  ],
  project: [
    {
      title: { type: String, required: true },
      detail: { type: String, required: true },
      picture: { type: String, required: true },
      category: { type: String, required: true },
      tag: { type: String, required: true },
      linkProject: { type: String, required: true },
      linkGitRepo: { type: String, required: true },
      required: true,
    },
  ],
  skill: [
    {
      name: String,
      required: true,
    },
  ],
  template: {
    name: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  user_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchma);

export default Portfolio;
export type IPortfolioModel = typeof Portfolio;

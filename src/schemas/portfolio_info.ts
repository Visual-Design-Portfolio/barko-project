import mongoose from "mongoose";
import User from "./user_info";
export interface IPortfolio {
  _id: mongoose.Types.ObjectId;
  name: string;
  ownerName: string;
  picture?: string;
  createdAt: Date;
  updatedAt: Date;
  education: IEducation[];
  workExperience: IWorkExperience[];
  project: IProject[];
  skill: ISkill[];
  userId: mongoose.Types.ObjectId;
}

export interface IEducation {
  school: string;
  degree: string;
  major: string;
  startDate: Date;
  endDate: Date;
}

export interface IWorkExperience {
  position: string;
  employeeType: string;
  companyName: string;
  companyLocation: string;
  startDate: Date;
  endDate: Date;
}

export interface IProject {
  title: string;
  detail: string;
  picture?: string;
  category: string;
  tag: string;
  linkProject: string;
  linkGitRepo: string;
}

export interface ISkill {
  name: string[];
}

const portfolioSchma = new mongoose.Schema<IPortfolio>({
  name: String,
  ownerName: String,
  picture: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  education: [
    {
      school: { type: String, required: false },
      degree: { type: String, required: false },
      major: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
    },
  ],

  workExperience: [
    {
      position: { type: String, required: false },
      employeeType: { type: String, required: false },
      companyName: { type: String, required: false },
      companyLocation: { type: String, required: false },
      startDate: { type: Date, required: false },
      endDate: { type: Date, required: false },
    },
  ],
  project: [
    {
      title: { type: String, required: false },
      detail: { type: String, required: false },
      picture: { type: String, required: false },
      category: [String],
      tag: [String],
      linkProject: { type: String, required: false },
      linkGitRepo: { type: String, required: false },
    },
  ],
  skill: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Portfolio = mongoose.model("Portfolio", portfolioSchma);

export default Portfolio;
export type IPortfolioModel = typeof Portfolio;

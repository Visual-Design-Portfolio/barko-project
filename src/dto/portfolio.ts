import mongoose from "mongoose";
import {
  IEducation,
  IPortfolio,
  IProject,
  ISkill,
  IWorkExperience,
} from "../schemas/portfolio_info";
import { IUpdatePortfolio, IUserInfo } from "../repositories";

export interface IPortfolioDTO extends IPortfolio {}

export interface IGetPortfolioDTO extends Pick<IPortfolio, "_id"> {}

export interface ICreatePortfolioDTO {
  name: string;
  ownerName: string;
  picture?: string;
  education: IEducation;
  workExperience: IWorkExperience;
  project: IProject;
  skill: ISkill;
}

export interface IUpdatePortfolioDTO {
  name: string;
  ownerName: string;
  picture?: string;
  education: IEducation;
  workExperience: IWorkExperience;
  project: IProject;
  skill: ISkill;
}
